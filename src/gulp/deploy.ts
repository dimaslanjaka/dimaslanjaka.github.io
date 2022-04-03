import Promise from 'bluebird';
import chalk from 'chalk';
import { exec, spawn } from 'child_process';
import gulp from 'gulp';
import { TaskCallback } from 'undertaker';
import { appendFileSync, existsSync, join, resolve, write } from '../node/filemanager';
import config, { post_generated_dir, root, tmp } from '../types/_config';
import moment from 'moment';

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
  return new Promise((resolve: (args: { code: number; stdout: any }) => any, reject: (args: { args: string[]; err: Error }) => any) => {
    const summon = spawn('git', args, {
      cwd: deployDir,
      stdio: 'inherit',
    });
    summon.on('close', function (code) {
      // Should probably be 'exit', not 'close'
      // *** Process completed
      return resolve({ code: code, stdout: summon.stdout });
    });
    summon.on('error', function (err) {
      // *** Process creation failed
      return reject({ args: args, err: err });
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
      return git('remote', 'set-url', 'origin', configDeploy.repo).catch((e) => {
        appendFileSync(tmp('deploy.log'), JSON.stringify(e, null, 2));
        console.log(chalk.red('log:'), tmp('deploy.log'));
        if (e instanceof Error) throw e;
        if (e.err) throw e.err;
      });
    }
  };

  const pullGit = () => {
    console.log(logname + chalk.greenBright('[pull]'), 'merge branch', configDeploy.branch);
    return git('pull', 'origin', configDeploy.branch).catch((e) => {
      appendFileSync(tmp('deploy-pull.log'), JSON.stringify(e, null, 2) + '\n');
      console.log(chalk.red('log:'), tmp('deploy-pull.log'));
      if (e instanceof Error) throw e;
      if (e.err) throw e.err;
    });
  };

  const pushGit = () => {
    console.log(logname + chalk.greenBright('[push]'), 'merge branch', configDeploy.branch);
    return git('add', '-A')
      .then(() => git('commit', '-m', (configDeploy.message || 'Site updated: ').capitalize() + moment().format()))
      .then(() => git('push', '-u', configDeploy.repo, 'origin', configDeploy.branch, '--force'))
      .catch((e) => {
        appendFileSync(tmp('deploy-push.log'), JSON.stringify(e, null, 2) + '\n');
        console.log(chalk.red('log:'), tmp('deploy-push.log'));
        if (e instanceof Error) throw e;
        if (e.err) throw e.err;
      });
  };

  return gulp.series(copyGenerated, setupGit, pullGit, pushGit)(done);
}
