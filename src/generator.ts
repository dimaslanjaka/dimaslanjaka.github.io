import scheduler from './node/scheduler';
import gulp from 'gulp';
import afterGenerate from './gulp/tasks/after-generate';
import { join, rmdirSync } from './node/filemanager';
import config, { root, tmp } from './types/_config';
import Bluebird from 'bluebird';
import { TaskCallback } from 'undertaker';
import './gulp/tasks/article-copy';
import './gulp/tasks/article-generate';
import './gulp/tasks/deploy';

// register scheduler
new scheduler();

// tasks
gulp.task('after-generate', afterGenerate);

const clean = (done?: TaskCallback) =>
  Bluebird.all([join(root, config.public_dir), tmp()])
    .map((s) => rmdirSync(s))
    .then(() => done);
gulp.task('clean', clean);
gulp.task('default', gulp.series('clean', 'copy', 'generate'));
