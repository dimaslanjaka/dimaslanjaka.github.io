import Promise from 'bluebird';
import chalk from 'chalk';
import { exec } from 'child_process';
import spawner from '../node/spawner';
import gulp from 'gulp';
import { TaskCallback } from 'undertaker';
import { existsSync, join, resolve } from '../node/filemanager';
import config, { post_generated_dir, root } from '../types/_config';
import moment from 'moment';

const spawn = spawner.spawn;

export function method1() {
  exec('git init', { cwd: config.public_dir }, (err, stdout, stderr) => {
    if (!err)
      exec('git remote set-url origin git@github.com:dimaslanjaka/dimaslanjaka.github.io.git', { cwd: config.public_dir }, (err, stdout, stderr) => {
        if (!err)
          exec('git add .', { cwd: config.public_dir }, (err, stdout, stderr) => {
            if (!err)
              exec("git commit -m 'update'", { cwd: config.public_dir }, (err, stdout, stderr) => {
                if (!err)
                  exec('git push -u origin master', { cwd: config.public_dir }, (err, stdout, stderr) => {
                    console.log(stderr);
                  });
              });
          });
      });
  });
}

export function method2() {
  exec(`git subtree push --prefix ${config.public_dir} origin master`);
}

const deployDir = resolve(join(root, '.deploy_git'));
const generatedDir = post_generated_dir;
function git(...args: string[]) {
  return new Promise((resolve: ({ code: number, stdout: any }) => any, reject: (err: Error) => any) => {
    const summon = spawn('git', args, {
      cwd: deployDir,
      stdio: 'inherit',
    });
    summon.on('close', function (code) {
      // Should probably be 'exit', not 'close'
      // *** Process completed
      resolve({ code: code, stdout: summon.stdout });
    });
    summon.on('error', function (err) {
      // *** Process creation failed
      reject(err);
    });
  });
}
const logname = chalk.magentaBright('[deploy][git]');
const configDeploy = config.deploy;
export default function taskDeploy(done?: TaskCallback) {
  //console.log(existsSync(deployDir), configDeploy, deployDir);
  const copyGenerated = () => {
    return gulp.src(join(generatedDir, '**/**')).pipe(gulp.dest(deployDir));
  };
  const setupGit = () => {
    if (existsSync(deployDir)) {
      if (!existsSync(join(deployDir, '.git'))) {
        console.log(logname, 'initialize git');
        return git('init')
          .then(() => git('config', 'user.name', configDeploy.name))
          .then(() => git('config', 'user.email', configDeploy.email))
          .then(setupGit);
      }
      console.log(logname, 'merge branch', configDeploy.branch);
      git('remote', 'set-url', 'origin', configDeploy.repo)
        .then(() => git('add', '-A'))
        .then(() => git('commit', '-m', (configDeploy.message || 'Site updated:').capitalize() + moment().format('"yyyy-MM-dd HH:mm:ss"')))
        .catch((e) => {
          throw new Error(e);
        });
    }
  };
  if (typeof done == 'function') done();
}
