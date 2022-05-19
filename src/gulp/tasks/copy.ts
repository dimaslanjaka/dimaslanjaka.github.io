/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/**
 * @description copy, parsing shortcodes, render html body, etc from src-posts to source_dir
 * @summary copy from src-posts to source/_posts
 */

import Bluebird from 'bluebird';
import chalk from 'chalk';
import gulp from 'gulp';
import { parse as parseHTML } from 'node-html-parser';
import through2 from 'through2';
import { toUnix } from 'upath';
import { renderBodyMarkdown } from '../../markdown/toHtml';
import { buildPost, validateParsed } from '../../markdown/transformPosts';
import { parsePost } from '../../markdown/transformPosts/parsePost';
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
export const copyPosts = (_any: any, cpath?: string) => {
  const exclude = config.exclude.map((ePattern) => '!' + ePattern.replace(/^!+/, ''));
  const run = gulp.src(['**/*.md', '!**/.git*', ...exclude], { cwd: post_source_dir }).pipe(
    through2.obj(function (file, _encoding, next) {
      const path = file.path;
      if (cpath) {
        // copy specific post path
        if (!path.includes(cpath)) return next(null, file);
      }
      const log = [logname, String(path)];
      const parse = parsePost(String(path)); //parsePost(String(file.contents), String(path));

      if (!validateParsed(parse)) {
        console.log(...log, chalk.red('[fail]'), 'at 1st parse');
        return next();
      }

      parse.fileTree = {
        source: replacePath(toUnix(path.toString()), '/source/_posts/', '/src-posts/'),
        public: replacePath(toUnix(path.toString()), '/src-posts/', '/source/_posts/')
      };

      const regexBoundary = /\b(xampp|php|css|javascript|typescript|guide|how to)\b/gim;

      if (!Array.isArray(parse.metadata.category)) parse.metadata.category = [];
      if (!Array.isArray(parse.metadata.tags)) parse.metadata.tags = [];

      // @todo add post category to cache
      parse.metadata.category.forEach((name: string) => {
        if (!name) return;
        // init
        if (!postCats[name]) postCats[name] = [];
        // prevent duplicate push
        if (!postCats[name].find(({ title }) => title === parse.metadata.title)) postCats[name].push(parse);
      });

      // @todo add post tag to cache
      parse.metadata.tags.forEach((name: string) => {
        if (!name) return;
        // init
        if (!postTags[name]) postTags[name] = [];
        // prevent duplicate push
        if (!postTags[name].find(({ title }) => title === parse.metadata.title)) postTags[name].push(parse);
      });

      // merge php js css to programming
      if (Array.isArray(parse.metadata.tags)) {
        const programTags = [
          'php',
          'css',
          'js',
          'kotlin',
          'java',
          'ts',
          'typescript',
          'javascript',
          'html',
          'database'
        ];
        const containsTag = programTags.some((r) => {
          const matchTag = parse.metadata.tags
            .removeEmpties()
            .map((str) => str.trim().toLowerCase())
            .includes(r);
          if (matchTag) {
            parse.metadata.category.push(r.toUpperCase());
          }
          return matchTag;
        });
        if (containsTag) {
          parse.metadata.category.push('Programming');
          // remove uncategorized if programming category pushed
          if (parse.metadata.category.includes('Uncategorized')) {
            parse.metadata.category = parse.metadata.category.filter((e) => e !== 'Uncategorized');
          }
        }
        // remove duplicated tags and categories
        const filterTagCat = function (arr: string[]) {
          arr = arr.map((item) => {
            const matcher = {
              programming: 'Programming',
              github: 'GitHub',
              mysql: 'MySQL',
              sql: 'SQL',
              xampp: 'XAMPP'
            };
            if (matcher[item.toLowerCase()]) return matcher[item.toLowerCase()];
            // make child of programming tags uppercase
            if (programTags.includes(item.toLowerCase())) return item.toUpperCase();
            // fallback
            return item;
          });
          // @todo remove default tag and categorie when more than 1 items
          if (arr.length > 1) {
            if (arr.includes(config.default_category)) arr = arr.filter((x) => x !== config.default_category);
            if (arr.includes(config.default_tag)) arr = arr.filter((x) => x !== config.default_tag);
          }
          return arr;
        };
        parse.metadata.category = filterTagCat(parse.metadata.category.removeEmpties().uniqueStringArray());
        parse.metadata.tags = filterTagCat(parse.metadata.tags.removeEmpties().uniqueStringArray());
        // move 'programming' to first index
        if (parse.metadata.category.includes('Programming'))
          parse.metadata.category.forEach((str, i) => {
            if (str.toLowerCase().trim() === 'programming') {
              parse.metadata.category = parse.metadata.category.move(i, 0);
            }
          });
        //if (parse.metadata.category.includes("Programming")) console.log(parse.metadata.category);
      }

      // set type post
      if (!parse.metadata.type) parse.metadata.type = 'post';
      // render post for some properties
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
      const words = html
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
