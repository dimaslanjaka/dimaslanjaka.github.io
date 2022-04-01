import { exec, spawn } from 'child_process';
import { TaskCallback } from 'undertaker';
import { existsSync, join } from '../node/filemanager';
import config, { root } from '../types/_config';

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

const deployDir = join(root, '.git_deploy');
function git(...args) {
  return spawn('git', args, {
    cwd: deployDir,
    stdio: 'inherit',
  });
}

const configDeploy = config.deploy;
export default function taskDeploy(done?: TaskCallback) {
  console.log(existsSync(deployDir), configDeploy);
  if (typeof done == 'function') done();
}
