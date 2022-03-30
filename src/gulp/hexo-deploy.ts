import { exec } from 'child_process';
import config from '../types/_config.js';

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
