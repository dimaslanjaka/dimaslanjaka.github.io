/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/**
 * @description copy, parsing shortcodes, render html body, etc from src-posts to source_dir
 * @summary copy from src-posts to source/_posts
 */

import 'js-prototypes';
import { cwd, dirname } from '../../node/filemanager';
import { buildPost, parsePost } from '../../markdown/transformPosts';
import config, { post_public_dir, post_source_dir } from '../../types/_config';
import gulp from 'gulp';
import gulpRename from '../modules/rename';
import { toUnix } from 'upath';
import { renderBodyMarkdown } from '../../markdown/toHtml';
import { parse as parseHTML } from 'node-html-parser';
import chalk from 'chalk';
import through2 from 'through2';
import { modifyPost } from './functions/modifyPost';

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
/**
 * validate {@link parsePost}
 * @param parse
 * @returns
 */
const validateParser = (parse: ReturnType<typeof parsePost>) => {
  if (!parse) return false;
  if (typeof parse === 'undefined') return false;
  if (parse && !parse.body) {
    console.log(chalk.red('body of null:'));
    return false;
  }
  return true;
};

const copyPosts = () => {
  const exclude = config.exclude.map((ePattern) => '!' + ePattern.replace(/^!+/, ''));
  const run = gulp.src(['**/*.md', '!**/.git*', ...exclude], { cwd: post_source_dir }).pipe(
    through2.obj(function (file, encoding, next) {
      const path = file.path;
      const log = [logname, String(path)];
      let parse = parsePost(String(file.contents), String(path));
      if (!validateParser(parse)) {
        //console.log(...log, chalk.red('[fail]'), 'at 1st parse');
        return next();
      }

      parse.fileTree = {
        source: replacePath(toUnix(path.toString()), '/source/_posts/', '/src-posts/'),
        public: replacePath(toUnix(path.toString()), '/src-posts/', '/source/_posts/'),
      };
      parse = modifyPost(parse);
      if (!validateParser(parse)) {
        console.log(...log, 'at 2nd parse');
        return next();
      }
      let html: ReturnType<typeof parseHTML>;
      try {
        html = parseHTML(renderBodyMarkdown(parse));
      } catch (error) {
        log.push('render markdown and html failed');
        //console.log(...log);
        console.log(typeof parse.body);
        return next();
      }
      // +article wordcount
      const extractTextHtml = html;
      const words = extractTextHtml
        .querySelectorAll('*:not(script,style,meta,link)')
        .map((e) => e.text)
        .join('\n');
      parse.metadata.wordcount = countWords(words);

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
