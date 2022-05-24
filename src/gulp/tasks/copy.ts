/**
 * @description copy, parsing shortcodes, render html body, etc from src-posts to source_dir
 * @summary copy from src-posts to source/_posts
 */

import gulp from 'gulp';
import through2 from 'through2';
import { TaskCallback } from 'undertaker';
import color from '../../node/color';
import { parsePost } from '../../parser/post/parsePost';
import { buildPost } from '../../parser/transformPosts';
import config, { post_public_dir, post_source_dir } from '../../types/_config';
import { determineDirname } from '../utils';
import './copy/assets';

const logname = color.cyan('[copy][post]');

/**
 * copy posts from `src-posts` to config.source_dir {@link config.source_dir}
 * @param cpath custom post path
 * @returns
 */
export const copyPosts = (_done: TaskCallback = null, cpath?: string) => {
  const exclude = config.exclude.map(
    (ePattern) => '!' + ePattern.replace(/^!+/, '')
  );
  console.log(
    `${logname} cwd=${color.Mahogany(post_source_dir)} dest=${color[
      'Granny Smith Apple'
    ](post_public_dir)}`
  );
  const run = gulp
    .src(['**/*.md', '!**/.git*', ...exclude], { cwd: post_source_dir })
    .pipe(
      through2.obj(function (file, _encoding, next) {
        const path = file.path;
        if (typeof cpath == 'string' && cpath.length > 2) {
          // copy specific post path
          if (!path.includes(cpath)) return next(null, file);
        }
        const log = [logname, String(path)];
        const parse = parsePost(String(path), String(file.contents));

        //write(tmp(parse.metadata.uuid, 'article.html'), bodyHtml);
        const build = buildPost(parse);
        //write(tmp(parse.metadata.uuid, 'article.md'), build);
        log.push(color.green('success'));
        file.contents = Buffer.from(build);
        //if (this) this.push(file);
        return next(null, file);
      })
    );
  return determineDirname(run).pipe(gulp.dest(post_public_dir));
};
/**
 * @see {@link copyPosts}
 */
export const copy_posts = copyPosts;
