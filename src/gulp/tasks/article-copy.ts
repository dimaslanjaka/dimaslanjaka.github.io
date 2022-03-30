/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
//** copy from src-posts to source/_posts **//
import 'js-prototypes';
import { existsSync, mkdirSync, statSync, join, cwd, write, dirname } from '../../node/filemanager';
import moment from 'moment';
import { buildPost, parsePost, parsePostReturn, saveParsedPost } from '../../markdown/transformPosts';
import replaceMD2HTML from '../fix/hyperlinks';
import { shortcodeCss } from '../shortcode/css';
import extractText from '../shortcode/extract-text';
import { shortcodeScript } from '../shortcode/script';
import { shortcodeNow } from '../shortcode/time';
import { copyDir, loopDir, slash } from '../utils';
import { TaskCallback } from 'undertaker';
import parseShortCodeInclude from '../shortcode/include';
import { ProjectConfig, post_public_dir, post_source_dir } from '../../types/_config';
import modifyFile from '../modules/modify-file';
import gulp from 'gulp';
import gulpRename from '../modules/rename';
import Bluebird from 'bluebird';

let tryCount = 0;

function cleanString(text: string) {
  if (typeof text == 'string') return text.replace(/[^a-zA-Z0-9.,-_ ]/gm, '');
  return text;
}

function removeMultipleWhiteSpaces(text: string) {
  if (typeof text == 'string') return text.replace(/\s+/gm, ' ');
  return text;
}

/**
 * Copy source post directly into production posts without transform to multiple languages
 * @param done Callback
 */
export function articleCopy(config: ProjectConfig, done?: TaskCallback) {
  //if (process.env.NODE_ENV == "development") emptyDir(prodPostDir);
  const srcPostDir = join(cwd(), 'src-posts');
  // path source_dir from _config.yml
  const prodPostDir = join(cwd(), config.source_dir, '/_posts');
  const srcDir = slash(srcPostDir);
  const destDir = slash(prodPostDir);
  if (!existsSync(destDir)) mkdirSync(destDir, { recursive: true });

  // To copy a folder
  copyDir(srcDir, destDir, function (err) {
    if (err) {
      console.error(err);
      console.error('error');
      if (tryCount == 0) {
        tryCount++;
        return articleCopy(config, done);
      }
    } else {
      console.log('copied successful!');
      console.log('starting process article shortcodes...');

      // process
      const loop = loopDir(destDir);
      loop.forEach(function (file) {
        //const sourceFile = file.replace(prodPostDir, srcPostDir);
        //const publicAssetDir = join(dirname(file), basename(file, '.md'));
        //const sourceAssetDir = join(dirname(sourceFile), basename(sourceFile, '.md'));
        if (statSync(file).isFile() && file.endsWith('.md')) {
          const parse = parsePost(file);
          if (parse) {
            modifyPost(parse);
            // save parsed post to public _config.yml
            saveParsedPost(parse, parse.fileTree.public);
          }
        }
      });

      // notify gulp process has done
      if (typeof done == 'function') done(null);
    }
  });
}

/**
 * Modify Post With Defined Conditions
 * @param parse result of {@link parsePost}
 * @returns
 */
export function modifyPost(parse: parsePostReturn) {
  const result = {
    content: '',
    error: false,
  };
  if (parse) {
    const sourceFile = parse.fileTree.source;
    const publicFile = parse.fileTree.public;
    if (parse.metadata) {
      // fix special char in metadata
      parse.metadata.title = cleanString(parse.metadata.title);
      parse.metadata.subtitle = removeMultipleWhiteSpaces(cleanString(parse.metadata.subtitle));
      parse.metadata.excerpt = removeMultipleWhiteSpaces(cleanString(parse.metadata.excerpt));
      parse.metadata.description = removeMultipleWhiteSpaces(cleanString(parse.metadata.description));
      // fix post time
      if (parse.metadata.modified) {
        if (!parse.metadata.updated) {
          parse.metadata.updated = moment(parse.metadata.modified).format('YYYY-MM-DDTHH:mm:ssZ');
        } else {
          const updated = moment(parse.metadata.updated);
          const modified = moment(parse.metadata.modified);
          const same = updated.isSame(modified, 'date');
          // if meta.modified != meta.updated apply meta.modified to meta.updated
          if (!same) {
            // java format yyyy-MM-dd'T'HH:mm:ssZ
            parse.metadata.updated = moment(parse.metadata.modified).format('YYYY-MM-DDTHH:mm:ssZ');
          }
        }
      }
      const stats = statSync(sourceFile);
      if (!parse.metadata.updated) {
        const mtime = stats.mtime;
        parse.metadata.updated = moment(mtime).format('YYYY-MM-DDTHH:mm:ssZ');
      }
      if (!parse.metadata.date) {
        parse.metadata.date = moment(new Date()).format('YYYY-MM-DDTHH:mm:ssZ');
      }
      if (!parse.metadata.date.includes('+')) {
        parse.metadata.date = moment(parse.metadata.date).format('YYYY-MM-DDTHH:mm:ssZ');
      }
      // fix lang
      if (!parse.metadata.lang) parse.metadata.lang = 'en';
      // fix post description
      if (parse.metadata.subtitle) {
        if (!parse.metadata.description) parse.metadata.description = parse.metadata.subtitle;
        if (!parse.metadata.excerpt) parse.metadata.excerpt = parse.metadata.subtitle;
      }
      if (parse.metadata.excerpt) {
        if (!parse.metadata.description) parse.metadata.description = parse.metadata.excerpt;
        if (!parse.metadata.subtitle) parse.metadata.subtitle = parse.metadata.excerpt;
      }
      if (parse.metadata.description) {
        if (!parse.metadata.excerpt) parse.metadata.excerpt = parse.metadata.description;
        if (!parse.metadata.subtitle) parse.metadata.subtitle = parse.metadata.description;
      }
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
    }

    if (parse.metadata && parse.body) {
      // remove duplicated metadata photos
      if (parse.metadata.photos && parse.metadata.photos.length) {
        parse.metadata.photos = parse.metadata.photos.unique();
      }
    }
    result.content = buildPost(parse);
  } else {
    result.error = true;
  }
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
 * copy, parsing shortcodes, render html body, etc from src-posts to source_dir
 * @returns
 */
export default function taskCopy() {
  function determineDirname(pipe: NodeJS.ReadWriteStream) {
    return pipe.pipe(
      gulpRename((file) => {
        const dname = dirname(replacePath(file.fullpath, post_source_dir, '')).replace(/\//g, '/');
        file.dirname = dname;
        console.log(file);
      })
    );
  }
  const copyAssets = () => {
    const src = join(post_source_dir, '**/**');
    const run = gulp.src([src, `!${src}.md`]);
    return Bluebird.resolve(determineDirname(run).pipe(gulp.dest(post_public_dir)));
  };
  const copyPosts = () => {
    const src = join(post_source_dir, 'Chimeraland/Recipes.md');
    const run = gulp.src(src).pipe(
      modifyFile(function (content, path, _file) {
        const parse = parsePost(Buffer.isBuffer(content) ? content.toString() : content);
        if (parse) {
          parse.fileTree = {
            source: replacePath(path.toString(), '/source/_posts/', '/src-posts/'),
            public: replacePath(path.toString(), '/src-posts/', '/source/_posts/'),
          };
          write(join(cwd(), 'tmp/parsed.json'), JSON.stringify(parse, null, 4));
        }
        const modify = modifyPost(parse);
        if (!modify.error) {
          content = modify.content;
        }
        return content;
      })
    );
    return Bluebird.resolve(determineDirname(run).pipe(gulp.dest(post_public_dir)));
  };

  return copyAssets().then(copyPosts);
}
