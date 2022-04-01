import scheduler from './node/scheduler';
import GulpClient from 'gulp';
import taskDeploy from './gulp/deploy';
import afterGenerate from './gulp/tasks/after-generate';
import { join, rmdirSync } from './node/filemanager';
import config, { root, tmp } from './types/_config';
import Bluebird from 'bluebird';
import { TaskCallback } from 'undertaker';
import './gulp/tasks/article-copy';
import './gulp/tasks/article-generate';

// register scheduler
new scheduler();

// tasks
GulpClient.task('after-generate', afterGenerate);
GulpClient.task('deploy', taskDeploy);
const clean = (done?: TaskCallback) =>
  Bluebird.all([join(root, config.public_dir), tmp()])
    .map((s) => rmdirSync(s))
    .then(() => done);
GulpClient.task('clean', clean);
GulpClient.task('default', GulpClient.series('clean', 'copy', 'generate'));

/*GulpClient.task('default', (done?: TaskCallback) => {
  return clean()
    .then(() => taskCopy())
    .then(() => taskGenerate())
    .then(() => done());
});*/
