/* eslint-disable @typescript-eslint/no-unused-vars */
import chalk from 'chalk';
import { spawn } from 'child_process';
import gulp from 'gulp';
import { existsSync, join, mkdirSync, resolve } from '../../node/filemanager';
import config, { post_generated_dir, root } from '../../types/_config';
import moment from 'moment';
import { TaskCallback } from 'undertaker';

const deployDir = resolve(join(root, '.deploy_git'));
const generatedDir = post_generated_dir;
function git(...args: string[]) {
  return new Promise((resolve: (args: { code: number; stdout: string; stderr: string }) => any, reject: (args: { args: string[]; err: Error }) => any) => {
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
  });
}
const logname = chalk.magentaBright('[deploy][git]');
const configDeploy = config.deploy;

const copyGenerated = () => {
  return gulp.src(['**/**', '!**/.git'], { cwd: generatedDir, dot: true }).pipe(gulp.dest(deployDir));
};

gulp.task('deploy', async (done?: TaskCallback) => {
  if (!existsSync(deployDir)) mkdirSync(deployDir);
  if (!existsSync(join(deployDir, '.git'))) {
    console.log(logname, 'init new git with current configuration', configDeploy);
    await git('init');
    if (configDeploy.name) await git('config', 'user.name', configDeploy.name);
    if (configDeploy.email) await git('config', 'user.email', configDeploy.email);
  }
  await git('remote', 'set-url', 'origin', configDeploy.repo);
  await git('pull', 'origin', configDeploy.branch);

  return copyGenerated().on('end', async () => {
    await git('add', '-A');
    await git('commit', '-m', 'Update site: ' + moment().format());
    //await git('push', '-u', configDeploy.repo, 'origin', configDeploy.branch, '--force');
    await git('push', '--set-upstream', 'origin', configDeploy.branch);
    console.log(logname, 'deploy merged with origin successful');
    done();
  });
});
