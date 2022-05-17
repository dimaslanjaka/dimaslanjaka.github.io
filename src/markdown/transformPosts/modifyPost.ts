import chalk from 'chalk';
import { cwd, dirname, existsSync, join, removeMultiSlashes, statSync } from '../../node/filemanager';
import { cleanString, cleanWhiteSpace } from '../../node/utils';
import config, { post_generated_dir } from '../../types/_config';
import replaceMD2HTML from '../../gulp/fix/hyperlinks-md2html';
import { shortcodeCss } from '../../gulp/shortcode/css';
import extractText from '../../gulp/shortcode/extract-text';
import parseShortCodeInclude from '../../gulp/shortcode/include';
import { shortcodeScript } from '../../gulp/shortcode/script';
import { shortcodeNow } from '../../gulp/shortcode/time';
import { shortcodeYoutube } from '../../gulp/shortcode/youtube';
import yargs from 'yargs';
import CacheFile from '../../node/cache';
import ErrorMarkdown from '../error-markdown';
import moment from 'moment';
import { postMap } from './parsePost';
import { archiveMap, mergedPostMap } from './postMapper';
import { isValidHttpUrl } from '../../gulp/utils';
const argv = yargs(process.argv.slice(2)).argv;
const nocache = argv['nocache'];
const modCache = new CacheFile('modifyPost');
const postCache = new CacheFile('posts');
const homepage = new URL(config.url);

const _g = (typeof window != 'undefined' ? window : global) /* node */ as any;

type modifyPostType = postMap & mergedPostMap & archiveMap;

/**
 * Modify Post With Defined Conditions
 * @param parse result of {@link parsePost}
 * @returns
 */
export function originalModifyPost<T extends modifyPostType>(parse: T): T {
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

    if (existsSync(sourceFile)) {
      const stats = statSync(sourceFile);
      if (!parse.metadata.updated) {
        const mtime = stats.mtime;
        parse.metadata.updated = moment(mtime).format('YYYY-MM-DDTHH:mm:ssZ');
      }
    }

    if (parse.metadata.date && !parse.metadata.date.toString().includes('+')) {
      try {
        parse.metadata.date = moment(parse.metadata.date.toString()).format('YYYY-MM-DDTHH:mm:ssZ');
      } catch (e) {
        console.log(parse.metadata.date, 'invalid moment date format');
      }
    }

    // override permalink
    if (publicFile) {
      homepage.pathname = removeMultiSlashes(
        publicFile.replaceArr([cwd(), 'source/_posts/', 'src-posts/'], '/')
      ).replace(/.md$/, '.html');
      if (!parse.metadata.url || !parse.metadata.url.isMatch(new RegExp('^https?://')))
        parse.metadata.url = homepage.toString();
      if (!parse.metadata.permalink) parse.metadata.permalink = homepage.pathname;
    }

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
    parse.metadata.subtitle = cleanWhiteSpace(cleanString(parse.metadata.subtitle));
    parse.metadata.excerpt = cleanWhiteSpace(cleanString(parse.metadata.excerpt));
    parse.metadata.description = cleanWhiteSpace(cleanString(parse.metadata.description));

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

    // fix post_asset_folder
    const post_assets_fixer = (str: string) => {
      if (!publicFile) return str;
      // return base64 image
      if (str.startsWith('data:image')) return str;
      if (str.startsWith('//')) str = 'http:' + str;
      if (str.includes('%20')) str = decodeURIComponent(str);
      if (!isValidHttpUrl(str) && !str.startsWith('/')) {
        let result: string;
        /** search from same directory */
        const f1 = join(dirname(publicFile), str);
        /** search from parent directory */
        const f2 = join(dirname(dirname(publicFile)), str);
        /** search from root directory */
        const f3 = join(cwd(), str);
        const f4 = join(post_generated_dir, str);
        [f1, f2, f3, f4].forEach((src) => {
          if (existsSync(src) && !result) result = src;
        });
        if (!result) {
          console.log('[PAF][fail]', str);
        } else {
          result = result.replaceArr([cwd(), 'source/', '_posts'], '/').replace(/\/+/, '/');
          result = encodeURI(result);
          console.log('[PAF][success]', result);
          return result;
        }
      }
      return str;
    };
    if (parse.metadata.cover) {
      parse.metadata.cover = post_assets_fixer(parse.metadata.cover);
    }
    if (parse.metadata.thumbnail) {
      parse.metadata.thumbnail = post_assets_fixer(parse.metadata.thumbnail);
    }
    if (parse.metadata.photos) {
      parse.metadata.photos = parse.metadata.photos.map(post_assets_fixer);
    }

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
        'mysql',
        'database',
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
      parse.metadata.category = parse.metadata.category.removeEmpties().uniqueStringArray();
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
 * @param cache read cache? default true
 * @returns modified parsed post object
 */
export function cacheableModifyPost(
  parse: Parameters<typeof originalModifyPost>[0],
  sourceFile: string = null,
  cache = true
): ReturnType<typeof originalModifyPost> {
  let result: postMap;
  const source = sourceFile || parse.fileTree.source;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const logname = chalk.cyanBright('[copy][modify][md]');

  // if file changed, --nocache, or cache parameter is false
  // do write new cache
  if (modCache.isFileChanged(source) || nocache || !cache) {
    // file changed or no cache
    result = originalModifyPost(parse);
    postCache.set(source, result);
    modCache.set(source, result);
    //console.log(logname, 'no cache');
  } else {
    // cache hit
    result = modCache.get(source);
    //<postMap>
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

  return result;
}

let modifyPost: typeof cacheableModifyPost | typeof originalModifyPost;
if (config.generator.cache) {
  modifyPost = cacheableModifyPost;
} else {
  modifyPost = originalModifyPost;
}
export default modifyPost;
_g.modifyPost = modifyPost;
