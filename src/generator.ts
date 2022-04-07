import scheduler from './node/scheduler';
import gulp from 'gulp';
import { join, mkdirSync, rmdirSync } from './node/filemanager';
import config, { root, tmp } from './types/_config';
import Bluebird from 'bluebird';
import { TaskCallback } from 'undertaker';
import { dbFolder } from './node/cache';
import './gulp/tasks/article-copy';
import './gulp/tasks/article-generate';
import './gulp/tasks/deploy';

// register scheduler
new scheduler();

// tasks

const clean = (done?: TaskCallback) =>
  Bluebird.all([join(root, config.public_dir), join(root, config.source_dir, '_posts'), dbFolder, tmp()])
    .map((s) => rmdirSync(s))
    .then(() => mkdirSync(tmp()))
    .finally(() => done());
gulp.task('clean', clean);
gulp.task('default', gulp.series('copy', 'generate'));
