/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/**
 * @description copy, parsing shortcodes, render html body, etc from src-posts to source_dir
 * @summary copy from src-posts to source/_posts
 */

import chalk from 'chalk';
import gulp from 'gulp';
import through2 from 'through2';
import { buildPost } from '../../parser/post';
import { parsePost } from '../../parser/post/parsePost';
import config, { post_public_dir, post_source_dir } from '../../types/_config';
import { determineDirname } from '../utils';
import './copy/assets';

const logname = chalk.cyan('[copy][post]');

/**
 * copy posts from `src-posts` to config.source_dir {@link config.source_dir}
 * @param cpath custom path
 * @returns
 */
export const copyPosts = (_any: any, cpath?: string) => {
  const exclude = config.exclude.map(
    (ePattern) => '!' + ePattern.replace(/^!+/, '')
  );
  const run = gulp
    .src(['**/*.md', '!**/.git*', ...exclude], { cwd: post_source_dir })
    .pipe(
      through2.obj(function (file, _encoding, next) {
        const path = file.path;
        if (cpath) {
          // copy specific post path
          if (!path.includes(cpath)) return next(null, file);
        }
        const log = [logname, String(path)];
        const parse = parsePost(String(path), String(file.contents));

        //write(tmp(parse.metadata.uuid, 'article.html'), bodyHtml);
        const build = buildPost(parse);
        //write(tmp(parse.metadata.uuid, 'article.md'), build);
        log.push(chalk.green('success'));
        file.contents = Buffer.from(build);
        if (this) this.push(file);
        next(null, file);
      })
    );
  return determineDirname(run).pipe(gulp.dest(post_public_dir));
};
