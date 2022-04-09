/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/**
 * @description copy, parsing shortcodes, render html body, etc from src-posts to source_dir
 * @summary copy from src-posts to source/_posts
 */

import 'js-prototypes';
import { statSync, cwd, dirname, removeMultiSlashes } from '../../node/filemanager';
import moment from 'moment';
import { buildPost, parsePost, parsePostReturn } from '../../markdown/transformPosts';
import replaceMD2HTML from '../fix/hyperlinks';
import { shortcodeCss } from '../shortcode/css';
import extractText from '../shortcode/extract-text';
import { shortcodeScript } from '../shortcode/script';
import { shortcodeNow } from '../shortcode/time';
import parseShortCodeInclude from '../shortcode/include';
import config, { post_public_dir, post_source_dir } from '../../types/_config';
import gulp from 'gulp';
import gulpRename from '../modules/rename';
import { toUnix } from 'upath';
import { renderBodyMarkdown } from '../../markdown/toHtml';
import { parse as parseHTML } from 'node-html-parser';
import chalk from 'chalk';
import { shortcodeYoutube } from '../shortcode/youtube';
import CacheFile from '../../node/cache';
import through2 from 'through2';
import ErrorMarkdown from '../../markdown/error-markdown';
import yargs from 'yargs';
const argv = yargs(process.argv.slice(2)).argv;
const nocache = argv['nocache'];

function cleanString(text: string) {
  if (typeof text == 'string') return text.replace(/[^a-zA-Z0-9.,-_ ]/gm, '');
  return text;
}

function removeMultipleWhiteSpaces(text: string) {
  if (typeof text == 'string') return text.replace(/\s+/gm, ' ');
  return text;
}

const modCache = new CacheFile('modifyPost');
const postCache = new CacheFile('posts');
const homepage = new URL(config.url);

/**
 * Modify Post With Defined Conditions
 * @param parse result of {@link parsePost}
 * @returns
 */
function modifyPostOri(parse: parsePostReturn) {
  const sourceFile = parse.fileTree.source;
  const publicFile = parse.fileTree.public;
  if (parse.metadata) {
    // fix date
    if (!parse.metadata.date) {
      parse.metadata.date = moment(new Date()).format('YYYY-MM-DDTHH:mm:ssZ');
    }

    if (parse.metadata.modified && !parse.metadata.updated) {
      parse.metadata.updated = moment(parse.metadata.modified).format('YYYY-MM-DDTHH:mm:ssZ');
    }

    const stats = statSync(sourceFile);
    if (!parse.metadata.updated) {
      const mtime = stats.mtime;
      parse.metadata.updated = moment(mtime).format('YYYY-MM-DDTHH:mm:ssZ');
    }

    if (parse.metadata.date && !parse.metadata.date.includes('+')) {
      try {
        parse.metadata.date = moment(parse.metadata.date).format('YYYY-MM-DDTHH:mm:ssZ');
      } catch (e) {
        console.log(parse.metadata.date, 'invalid moment date format');
      }
    }

    // permalink
    homepage.pathname = removeMultiSlashes(publicFile.replaceArr([cwd(), 'source/_posts/', 'src-posts/'], '/')).replace(/.md$/, '.html');
    parse.metadata.url = homepage.toString();
    parse.metadata.permalink = homepage.pathname;

    // fix lang
    if (!parse.metadata.lang) parse.metadata.lang = 'en';

    // fix post description
    if (parse.metadata.subtitle) {
      if (!parse.metadata.description) parse.metadata.description = parse.metadata.subtitle;
      if (!parse.metadata.excerpt) parse.metadata.excerpt = parse.metadata.subtitle;
    } else if (parse.metadata.excerpt) {
      if (!parse.metadata.description) parse.metadata.description = parse.metadata.excerpt;
      if (!parse.metadata.subtitle) parse.metadata.subtitle = parse.metadata.excerpt;
    } else if (parse.metadata.description) {
      if (!parse.metadata.excerpt) parse.metadata.excerpt = parse.metadata.description;
      if (!parse.metadata.subtitle) parse.metadata.subtitle = parse.metadata.description;
    } else {
      parse.metadata.description = parse.metadata.title;
      parse.metadata.subtitle = parse.metadata.title;
      parse.metadata.excerpt = parse.metadata.title;
    }

    // fix special char in metadata
    parse.metadata.title = cleanString(parse.metadata.title);
    parse.metadata.subtitle = removeMultipleWhiteSpaces(cleanString(parse.metadata.subtitle));
    parse.metadata.excerpt = removeMultipleWhiteSpaces(cleanString(parse.metadata.excerpt));
    parse.metadata.description = removeMultipleWhiteSpaces(cleanString(parse.metadata.description));

    // fix thumbnail
    if (parse.metadata.cover) {
      if (!parse.metadata.thumbnail) parse.metadata.thumbnail = parse.metadata.cover;
      if (!parse.metadata.photos) {
        parse.metadata.photos = [];
      }
      parse.metadata.photos.push(parse.metadata.cover);
    }
    if (parse.metadata.photos) {
      const photos: string[] = parse.metadata.photos;
      parse.metadata.photos = photos.unique();
    }

    // merge php js css to programming
    if (Array.isArray(parse.metadata.tags)) {
      const programTags = ['php', 'css', 'js', 'kotlin', 'java', 'ts', 'typescript', 'javascript', 'html', 'mysql', 'database'];
      const containsTag = programTags.some((r) => {
        const matchTag = parse.metadata.tags.map((str) => str.trim().toLowerCase()).includes(r);
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
        return arr.map((item) => {
          if (item.toLowerCase() === 'programming') return 'Programming';
          if (item.toLowerCase() === 'github') return 'GitHub';
          if (item.toLowerCase() === 'mysql') return 'MySQL';
          // make child of programming tags uppercase
          if (programTags.includes(item.toLowerCase())) return item.toUpperCase();
          // fallback
          return item;
        });
      };
      parse.metadata.category = parse.metadata.category.uniqueStringArray();
      parse.metadata.tags = filterTagCat(parse.metadata.tags.uniqueStringArray());
      // move 'programming' to first index
      if (parse.metadata.category.includes('Programming'))
        parse.metadata.category.forEach((str, i) => {
          if (str.toLowerCase().trim() === 'programming') {
            parse.metadata.category = parse.metadata.category.move(i, 0);
          }
        });
      //if (parse.metadata.category.includes("Programming")) console.log(parse.metadata.category);
    }
  }

  if (parse.body) {
    parse.body = parseShortCodeInclude(publicFile, parse.body);
    parse.body = shortcodeNow(publicFile, parse.body);
    parse.body = shortcodeScript(publicFile, parse.body);
    parse.body = replaceMD2HTML(parse.body);
    parse.body = shortcodeCss(publicFile, parse.body);
    parse.body = extractText(publicFile, parse.body);
    parse.body = shortcodeYoutube(parse.body);
  }

  if (parse.metadata && parse.body) {
    // remove duplicated metadata photos
    if (parse.metadata.photos && parse.metadata.photos.length) {
      parse.metadata.photos = parse.metadata.photos.uniqueStringArray();
    }
  }
  return parse;
}

/**
 * Cacheable {@link modifyPostOri}
 * @see {@link modifyPostOri}
 * @param parse parsed post object
 * @param sourceFile source file path as cache key
 * @returns modified parsed post object
 */
export function modifyPost(parse: ReturnType<typeof modifyPostOri>, sourceFile?: string) {
  let result: ReturnType<typeof modifyPostOri>;
  const source = sourceFile || parse.fileTree.source;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const logname = chalk.cyanBright('[copy][modify][md]');

  if (modCache.isFileChanged(source) || nocache) {
    // file changed or no cache
    result = modifyPostOri(parse);
    postCache.set(source, result);
    modCache.set(source, result);
    //console.log(logname, 'no cache');
  } else {
    // cache hit
    result = modCache.get(source);
    //<ReturnType<typeof modifyPostOri>>
    if (typeof result === 'string') {
      try {
        result = JSON.parse(result);
      } catch (error) {
        const md = new ErrorMarkdown({ argument: parse });
        md.add('get', result);
        throw md;
      }
    }
  }

  /*if (result.fileTree.public.toLowerCase().includes('quiz.')) {
    const em = new ErrorMarkdown({}, result.fileTree.public);
    em.add('body', '```html\n' + result.body + '\n```');
    console.log('saved', em.getFileLog());
  }*/

  return result;
}

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

export const fixUrl = (s: string) => {
  if (!s) return s;
  if (s.startsWith('//')) return 'http:' + s;
  if (!s.match(/^https?:\/\//g)) return 'http://' + s;
  return s;
};

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
