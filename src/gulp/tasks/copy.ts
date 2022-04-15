/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/**
 * @description copy, parsing shortcodes, render html body, etc from src-posts to source_dir
 * @summary copy from src-posts to source/_posts
 */

import 'js-prototypes';
import { cwd, dirname } from '../../node/filemanager';
import { buildPost, parsePost, validateParsed } from '../../markdown/transformPosts';
import config, { post_public_dir, post_source_dir } from '../../types/_config';
import gulp from 'gulp';
import gulpRename from '../modules/rename';
import { toUnix } from 'upath';
import { renderBodyMarkdown } from '../../markdown/toHtml';
import { parse as parseHTML } from 'node-html-parser';
import chalk from 'chalk';
import through2 from 'through2';
import { modifyPost } from '../../markdown/transformPosts/modifyPost';
import CachePost from '../../node/cache-post';
import './remove-inline-style';
import { isValidHttpUrl } from '../utils';

/**
 * Crossplatform path replacer
 * @param str
 * @param from
 * @param to
 * @returns
 */
export function replacePath(str: string, from: string, to: string) {
  const normalize = (x: string) => x.replace(/\\/gim, '/');
  str = normalize(str);
  from = normalize(from);
  to = normalize(to);
  return str.replace(from, to);
}

/**
 * Determine gulp.dest location
 * @param pipe
 * @returns
 */
export function determineDirname(pipe: NodeJS.ReadWriteStream) {
  return pipe.pipe(
    gulpRename((file) => {
      const dname = dirname(replacePath(toUnix(file.fullpath), toUnix(post_source_dir), ''))
        .replace(cwd(), '')
        .replace('/src-posts/', '');
      file.dirname = dname;
      //if (file.fullpath.includes('Recipes')) console.log(dname, post_public_dir, file);
    })
  );
}

function countWords(str: string) {
  str = str.replace(/(^\s*)|(\s*$)/gi, '');
  str = str.replace(/[ ]{2,}/gi, ' ');
  str = str.replace(/\n /, '\n');
  return str.split(' ').length;
}

const copyAssets = () => {
  const run = gulp.src(['**/*.*', `!**/*.md`], { cwd: post_source_dir });
  return determineDirname(run).pipe(gulp.dest(post_public_dir));
};

gulp.task('copy:assets', copyAssets);

const logname = chalk.cyan('[copy][md]');

const cachePost = new CachePost();
const copyPosts = () => {
  const exclude = config.exclude.map((ePattern) => '!' + ePattern.replace(/^!+/, ''));
  const run = gulp.src(['**/*.md', '!**/.git*', ...exclude], { cwd: post_source_dir }).pipe(
    through2.obj(function (file, _encoding, next) {
      const path = file.path;
      const log = [logname, String(path)];
      let parse = parsePost(String(file.contents), String(path));

      if (!validateParsed(parse)) {
        console.log(...log, chalk.red('[fail]'), 'at 1st parse');
        return next();
      }

      parse.fileTree = {
        source: replacePath(toUnix(path.toString()), '/source/_posts/', '/src-posts/'),
        public: replacePath(toUnix(path.toString()), '/src-posts/', '/source/_posts/'),
      };
      //// modify post
      let modify = modifyPost(parse);
      // if null, get fresh cache
      if (modify === null || typeof modify === 'undefined') modify = modifyPost(parse, null, false);
      if (!validateParsed(modify)) {
        console.log(...log, chalk.red('[fail]'), 'at 2nd parse');
        //console.log('result', modify);
        return next();
      }
      parse = modify;
      // set type post
      parse.metadata.type = 'post';
      let html: ReturnType<typeof parseHTML>;
      try {
        const renderbody = renderBodyMarkdown(parse);
        html = parseHTML(renderbody);
      } catch (error) {
        console.log(...log, '[fail]', 'renderBodyMarkdown', error);
        //console.log(...log);
        //console.log(typeof parse.body);
        return next();
      }
      // +article wordcount
      const extractTextHtml = html;
      const words = extractTextHtml
        .querySelectorAll('*:not(script,style,meta,link)')
        .map((e) => e.text)
        .join('\n');
      parse.metadata.wordcount = countWords(words);
      if (parse.metadata.canonical) {
        const canonical: string = parse.metadata.canonical;
        if (!isValidHttpUrl(canonical)) parse.metadata.canonical = config.url + parse.metadata.canonical;
      }
      // insert parsed to cache post
      cachePost.set(path, parse);

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

gulp.task('copy:posts', copyPosts);

gulp.task('copy', gulp.series('copy:assets', 'copy:posts'));
gulp.task('copy:blogger', gulp.series('copy', 'copy:remove-inline-style'));
