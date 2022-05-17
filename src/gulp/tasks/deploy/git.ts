import chalk from 'chalk';
import { spawn } from 'child_process';
import gulp from 'gulp';
import moment from 'moment';
import { TaskCallback } from 'undertaker';
import { existsSync, join, mkdirSync, resolve } from '../../../node/filemanager';
import config, { post_generated_dir, root } from '../../../types/_config';

const deployDir = resolve(join(root, '.deploy_git'));
if (!existsSync(deployDir)) mkdirSync(deployDir);
const generatedDir = post_generated_dir;
function git(...args: string[]) {
  return new Promise(
    (
      resolve: (args: { code: number; stdout: string; stderr: string }) => any,
      reject: (args: { args: string[]; err: Error }) => any
    ) => {
      const summon = spawn('git', args, {
        cwd: deployDir,
        stdio: 'inherit',
      });
      summon.on('close', function (code) {
        // Should probably be 'exit', not 'close'
        // *** Process completed
        return resolve({ code: code, stdout: String(summon.stdout), stderr: String(summon.stderr) });
      });
      summon.on('error', function (err) {
        // *** Process creation failed
        return reject({ args: args, err: err });
      });
    }
  );
}
const logname = chalk.magentaBright('[deploy][git]');
const configDeploy = config.deploy;
configDeploy['base'] = deployDir;
const copyGenerated = () => {
  return gulp.src(['**/**', '!**/.git*'], { cwd: generatedDir, dot: true }).pipe(gulp.dest(deployDir));
};

gulp.task('deploy-git', async (done?: TaskCallback) => {
  let init = false;
  if (!existsSync(deployDir)) mkdirSync(deployDir);
  if (!existsSync(join(deployDir, '.git'))) {
    init = true;
    console.log(logname, 'init new git with current configuration', configDeploy);
    await git('init');
    if (configDeploy.name) await git('config', 'user.name', configDeploy.name);
    if (configDeploy.email) await git('config', 'user.email', configDeploy.email);
  }

  /*
  // Do compress git object databases?
  const cache = new CacheFile('deploy');
  let compress = false;
  if (cache.has('compress')) {
    const lastCompress = moment(cache.get('compress'));
    const now = moment();
    // do compress 1 day once
    if (now.diff(lastCompress, 'days') >= 1) compress = true;
  }
  if (compress) {

    cache.set('compress', new Date().toString());
  }
  */

  if (!init) await git('gc'); // compress git databases
  await git('remote', 'add', 'origin', configDeploy.repo);
  await git('remote', 'set-url', 'origin', configDeploy.repo);
  await git('fetch', '--all');
  await git('pull', 'origin', configDeploy.branch);

  return copyGenerated().on('end', async () => {
    await git('add', '-A');
    await git('commit', '-m', 'Update site: ' + moment().format());
    if (Object.hasOwnProperty.call(configDeploy, 'force') && configDeploy['force'] === true) {
      await git('push', '-u', configDeploy.repo, 'origin', configDeploy.branch, '--force');
    } else {
      await git('push', '--set-upstream', 'origin', configDeploy.branch);
    }
    console.log(logname, 'deploy merged with origin successful');
    done();
  });
});
