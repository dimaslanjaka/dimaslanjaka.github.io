import 'core-js/actual';
import fs from 'fs-extra';
import path from 'upath';
import git from '../src';

const spawn = git.crossSpawn.spawnAsync;

/**
 * do clone when destination folder not exist
 */
async function clone(options: { cwd: string; remote: string; branch: string; token?: string }) {
  // if (existsSync(TestConfig.cwd)) await rm(TestConfig.cwd, { recursive: true, force: true });
  //const cfg = structuredClone(options);
  //delete cfg.token;

  let doClone = false;
  if (!fs.existsSync(options.cwd)) {
    doClone = true;
  } else if (fs.existsSync(options.cwd) && fs.readdirSync(options.cwd).length === 1) {
    doClone = true;
    await fs.rm(options.cwd, { recursive: true, force: true });
  }

  if (doClone) {
    // console.log('cloning', cfg);
    const processCwd = path.join(__dirname, '..');
    const relative = path.toUnix(options.cwd).replace(processCwd, '').replace(/^\/+/, '');
    console.log({ processCwd, relative });
    await spawn('git', ['clone', '-b', options.branch, options.remote, relative], {
      cwd: processCwd,
      stdio: git.isGithubCI ? 'pipe' : 'inherit'
    });
  }
}

export default clone;
