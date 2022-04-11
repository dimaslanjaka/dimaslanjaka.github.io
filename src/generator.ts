import scheduler from './node/scheduler';
import gulp from 'gulp';
import { join, mkdirSync, rmdirSync } from './node/filemanager';
import config, { root, tmp } from './types/_config';
import Bluebird from 'bluebird';
import { TaskCallback } from 'undertaker';
import { dbFolder } from './node/cache';
import './gulp/tasks/copy';
import './gulp/tasks/generate';
import './gulp/tasks/deploy';

// register scheduler
new scheduler();

// tasks
const clean_public = () => rmdirSync(join(root, config.public_dir));
/** clean posts from config.source_dir */
const clean_posts = () => rmdirSync(join(root, config.source_dir, '_posts'));
const clean_tmp = () => rmdirSync(tmp());
const clean_db = () => rmdirSync(dbFolder);
const clean = (done?: TaskCallback) => {
  Bluebird.all([dbFolder])
    .map((s) => rmdirSync(s))
    .then(() => mkdirSync(tmp()))
    .finally(() => done());
};

gulp.task('clean:public', clean_public);
gulp.task('clean:posts', clean_posts);
gulp.task('clean:db', clean_db);
gulp.task('clean:tmp', clean_tmp);
gulp.task('clean', clean);
gulp.task('default', gulp.series('copy', 'generate'));
