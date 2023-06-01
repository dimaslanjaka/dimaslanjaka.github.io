const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

let usingYarn = fs.existsSync(path.join(__dirname, 'yarn.lock'));
const argv = process.argv.slice('2');
if (argv.includes('--yarn') || argv.includes('-yarn')) {
  usingYarn = true;
}

let recursive = false;
if (argv.includes('--recursive') || argv.includes('-r')) {
  recursive = true;
}

async function main(cwd) {
  if (!cwd) cwd = __dirname;
  const pjson = parsePkgJson(cwd);

  await updatePkgJSON(pjson, cwd);
  if (pjson['workspaces'] && recursive) {
    let workspaces = Array.isArray(pjson['workspaces']) ? pjson['workspaces'] : null;
    if (!workspaces && Array.isArray(pjson['workspaces']['packages'])) {
      workspaces = pjson['workspaces']['packages'];
    }
    workspaces = [...new Set(workspaces)];
    for (let i = 0; i < workspaces.length; i++) {
      const workspace = path.join(cwd, workspaces[i]);
      await main(workspace);
    }
  }
}

/**
 * get and parse package.json from folder
 * @param {string} cwd
 */
function parsePkgJson(cwd) {
  return JSON.parse(fs.readFileSync(path.join(cwd, 'package.json')).toString());
}

main();

/**
 * update package.json
 * @param {{ dependencies?: Record<string, string>, devDependencies?: Record<string, string>, peerDependencies?: Record<string, string>, optionalDependencies?: Record<string, string> }} pkgJSON
 */
async function updatePkgJSON(pkgJSON, cwd = null) {
  if (!cwd) cwd = __dirname;
  if (pkgJSON.dependencies) await doUpdate(pkgJSON.dependencies, 'production', cwd);
  if (pkgJSON.devDependencies) await doUpdate(pkgJSON.devDependencies, 'development', cwd);
}

/**
 *
 * @param {Record<string,string>} packages
 * @param {'production'|'development'|'optional'|'peer'} mode
 */
async function doUpdate(packages, mode, cwd = null) {
  if (!cwd) cwd = __dirname;
  if (!packages) packages = {};

  const pkgnames = Object.keys(packages);
  if (pkgnames.length === 0) {
    return;
  }

  console.log('cwd', cwd);

  const pkg2update = [];
  for (let i = 0; i < pkgnames.length; i++) {
    const pkgname = pkgnames[i];
    const version = packages[pkgname];
    /**
     * is remote url package
     */
    let isTarballPkg = /^(https?)|.(tgz|zip|tar|tar.gz)$|\/tarball\//i.test(version);

    /**
     * is github package
     */
    let isGitPkg = /^(git+|github:|https?:\/\/github.com\/)/i.test(version);
    /**
     * is local package
     */
    const isLocalPkg = /^(file):/i.test(version);

    /**
     * is local tarball package
     */
    const isLocalTarballpkg = isLocalPkg && /.(tgz|zip|tar|tar.gz)$/i.test(version);

    if (isLocalPkg && fs.existsSync(path.join(cwd, 'node_modules', pkgname))) {
      fs.rmSync(path.join(cwd, 'node_modules', pkgname), { recursive: true, force: true });
    }
    if (isLocalTarballpkg || isGitPkg || isTarballPkg || isLocalPkg) {
      /*if (!usingYarn) {
        pkg2update.push(pkgname);
      } else {
        pkg2update.push(`${pkgname}@${version}`);
      }*/
      pkg2update.push(`${pkgname}@${version}`);
    }
  }
  const pkgm = usingYarn ? 'yarn' : 'npm';
  const installArg = usingYarn ? 'add' : 'i';
  let updateArg = 'update';
  if (usingYarn) {
    const yarnVersion = await summon('yarn', ['-v'], { cwd, shell: true });
    if (yarnVersion instanceof Error === false) {
      if (yarnVersion.output.startsWith('3')) {
        updateArg = 'up';
      } else {
        updateArg = 'upgrade';
      }
    }
  }
  // const updateArg = usingYarn ? 'up' : 'update';
  let saveAs = '';
  switch (mode) {
    case 'development':
      if (usingYarn) {
        saveAs = '--dev';
      } else {
        saveAs = '-D';
      }
      break;

    case 'optional':
      if (usingYarn) {
        saveAs = '--optional';
      } else {
        saveAs = '-O';
      }
      break;

    case 'peer':
      if (usingYarn) {
        saveAs = '--peer';
      }
      break;
  }
  const argsInstall = [installArg, saveAs, ...pkg2update];
  const argsUpdate = [updateArg, ...pkg2update];
  // do update
  pkg2update.forEach((pkg) => {
    // console.log(pkgm, 'updating', saveAs, pkg);
    if (pkg.includes('highli')) console.log(pkgm, 'updating', saveAs, pkg, cwd);
  });

  const method = 'update';

  if (method === 'update') {
    // update method
    await new Promise((resolve) => {
      spawn(pkgm, argsUpdate, { cwd, stdio: 'ignore', shell: true }).once('exit', function () {
        resolve(null);
      });
    });
  } else {
    // install method
    await new Promise((resolve) => {
      spawn(pkgm, argsInstall, { cwd, stdio: 'ignore', shell: true }).once('exit', function () {
        resolve(null);
      });
    });
  }
}

/**
 * spawn command prompt
 * @param {string} cmd
 * @param {string[]} args
 * @param {Parameters<typeof spawn>[2]} opt
 * @returns {Promise<{ stdout:string, stderr:string, output:string, error?: Error }>}
 */
function summon(cmd, args = [], opt = {}) {
  if (!opt) opt = {};
  if (!opt.cwd) opt.cwd = __dirname;
  const spawnopt = Object.assign(opt);
  // *** Return the promise
  return new Promise(function (resolve) {
    if (typeof cmd !== 'string' || cmd.trim().length === 0) return resolve(new Error('cmd empty'));
    let stdout = '';
    let stderr = '';
    let output = '';
    const child = spawn(cmd, args, spawnopt);
    // if (spawnopt.stdio === 'ignore') child.unref();

    if (child.stdout && 'on' in child.stdout) {
      child.stdout.setEncoding('utf8');
      child.stdout.on('data', (data) => {
        stdout += data;
        output += data;
      });
    }

    if (child.stderr && 'on' in child.stdout) {
      child.stderr.setEncoding('utf8');
      child.stderr.on('data', (data) => {
        stderr += data;
        output += data;
      });
    }

    child.on('close', function (code) {
      // Should probably be 'exit', not 'close'
      if (code !== 0) console.log('[ERROR]', cmd, ...args, 'dies with code', code);
      // *** Process completed
      resolve({ stdout, stderr, output });
    });
    child.on('error', function (error) {
      // *** Process creation failed
      console.log('got error', error);
      resolve({ stdout, stderr, output, error });
    });
  });
}
