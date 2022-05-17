/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/**
 * @description copy, parsing shortcodes, render html body, etc from src-posts to source_dir
 * @summary copy from src-posts to source/_posts
 */

import Bluebird from 'bluebird';
import chalk from 'chalk';
import gulp from 'gulp';
import { parsePost } from 'hexo-post-parser';
import { parse as parseHTML } from 'node-html-parser';
import through2 from 'through2';
import { toUnix } from 'upath';
import { renderBodyMarkdown } from '../../markdown/toHtml';
import { buildPost, validateParsed } from '../../markdown/transformPosts';
import modifyPost from '../../markdown/transformPosts/modifyPost';
import CacheFile from '../../node/cache';
import CachePost from '../../node/cache-post';
import config, { post_public_dir, post_source_dir } from '../../types/_config';
import { determineDirname, isValidHttpUrl, replacePath } from '../utils';
import './copy/assets';
import './copy/remove-inline-style';

function countWords(str: string) {
  str = str.replace(/(^\s*)|(\s*$)/gi, '');
  str = str.replace(/[ ]{2,}/gi, ' ');
  str = str.replace(/\n /, '\n');
  return str.split(' ').length;
}

const logname = chalk.cyan('[copy][md]');

const cachePost = new CachePost();
const cacheTags = new CacheFile('postTags');
const cacheCats = new CacheFile('postCats');
interface GroupLabel {
  [key: string]: ReturnType<typeof parsePost>[];
}
const postCats: GroupLabel = {};
const postTags: GroupLabel = {};

/**
 * copy posts from `src-posts` to config.source_dir {@link config.source_dir}
 * @param cpath custom path
 * @returns
 */
export const copyPosts = (_: any, cpath?: string) => {
  const exclude = config.exclude.map((ePattern) => '!' + ePattern.replace(/^!+/, ''));
  const run = gulp.src(['**/*.md', '!**/.git*', ...exclude], { cwd: post_source_dir }).pipe(
    through2.obj(function (file, _encoding, next) {
      const path = file.path;
      if (cpath) {
        // copy specific post path
        if (!path.includes(cpath)) return next(null, file);
      }
      const log = [logname, String(path)];
      let parse = parsePost(String(path)); //parsePost(String(file.contents), String(path));

      if (!validateParsed(parse)) {
        console.log(...log, chalk.red('[fail]'), 'at 1st parse');
        return next();
      }

      parse.fileTree = {
        source: replacePath(toUnix(path.toString()), '/source/_posts/', '/src-posts/'),
        public: replacePath(toUnix(path.toString()), '/src-posts/', '/source/_posts/')
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
      if (!parse.metadata.type) parse.metadata.type = 'post';
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
      // insert parsed to caches (only non-redirected post)
      if (!parse.metadata.redirect) cachePost.set(path, parse);

      if (!Array.isArray(parse.metadata.category)) parse.metadata.category = [];
      parse.metadata.category.forEach((name: string) => {
        if (!name) return;
        // init
        if (!postCats[name]) postCats[name] = [];
        // prevent duplicate push
        if (!postCats[name].find(({ title }) => title === parse.metadata.title)) postCats[name].push(parse);
      });
      if (!Array.isArray(parse.metadata.tags)) parse.metadata.tags = [];
      parse.metadata.tags.forEach((name: string) => {
        if (!name) return;
        // init
        if (!postTags[name]) postTags[name] = [];
        // prevent duplicate push
        if (!postTags[name].find(({ title }) => title === parse.metadata.title)) postTags[name].push(parse);
      });

      //write(tmp(parse.metadata.uuid, 'article.html'), bodyHtml);
      const build = buildPost(parse);
      //write(tmp(parse.metadata.uuid, 'article.md'), build);
      log.push(chalk.green('success'));
      file.contents = Buffer.from(build);
      if (this) this.push(file);
      next(null, file);
    })
  );
  return determineDirname(run)
    .pipe(gulp.dest(post_public_dir))
    .on('end', () => {
      Bluebird.all([postCats, postTags]).each((group, index) => {
        for (const name in group) {
          if (Object.prototype.hasOwnProperty.call(group, name)) {
            const posts = group[name];
            if (index === 1) {
              cacheTags.set(name, posts);
            } else {
              cacheCats.set(name, posts);
            }
          }
        }
      });
    });
};

gulp.task('copy:posts', copyPosts);

gulp.task('copy', gulp.series('copy:assets', 'copy:posts'));
gulp.task('copy:blogger', gulp.series('copy', 'copy:remove-inline-style'));
