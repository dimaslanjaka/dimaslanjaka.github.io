import { rm } from 'fs';
import gulp from 'gulp';
import { TaskCallback } from 'undertaker';
import { join, toUnix } from 'upath';
import { dbFolder } from '../../node/cache';
import config, { tmp } from '../../types/_config';

const root = toUnix(process.cwd());
/** clean generated folder */
const clean_public = (done?: TaskCallback) => rm(join(root, config.public_dir), { recursive: true }, done);
/** clean posts from config.source_dir */
const clean_posts = (done?: TaskCallback) => rm(join(root, config.source_dir, '_posts'), { recursive: true }, done);
/** clean temp folder */
const clean_tmp = (done?: TaskCallback) => rm(tmp(), { recursive: true }, done);
/** clean database folder */
const clean_db = (done?: TaskCallback) => rm(dbFolder, { recursive: true }, done);

gulp.task('clean:public', clean_public);
gulp.task('clean:posts', clean_posts);
gulp.task('clean:db', clean_db);
gulp.task('clean:tmp', clean_tmp);
gulp.task('clean', gulp.parallel('clean:db', 'clean:tmp', 'clean:posts', 'clean:public'));
