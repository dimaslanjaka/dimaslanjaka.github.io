import Bluebird from 'bluebird';
import chalk from 'chalk';
import gulp from 'gulp';
import { buildPost, postMap } from 'hexo-post-parser';
import { toUnix } from 'upath';
import yargs from 'yargs';
import ejs_object from '../../ejs';
import CacheFile from '../../node/cache';
import {
  getAllPosts,
  getLatestPosts,
  getRandomPosts
} from '../../node/cache-post';
import Sitemap from '../../node/cache-sitemap';
import color from '../../node/color';
import {
  cwd,
  dirname,
  existsSync,
  globSrc,
  join,
  mkdirSync,
  readFileSync,
  removeMultiSlashes,
  resolve,
  write
} from '../../node/filemanager';
import { replaceArr } from '../../node/string-utils';
import { modifyPost } from '../../parser/post/modifyPost';
import parsePost from '../../parser/post/parsePost';
import { renderBodyMarkdown } from '../../parser/toHtml';
import { validateParsed } from '../../parser/transformPosts';
import { DynamicObject } from '../../types';
import config, {
  root,
  theme_config,
  theme_dir,
  tmp
} from '../../types/_config';

const argv = yargs(process.argv.slice(2)).argv;
const nocache = argv['nocache'];

/**
 * @see {@link config.source_dir}
 */
const source_dir = toUnix(resolve(join(root, config.source_dir)));
/**
 * @see {@link config.public_dir}
 */
const generated_dir = toUnix(resolve(join(root, config.public_dir)));
if (!existsSync(generated_dir)) mkdirSync(generated_dir);
/**
 * layout.ejs from theme_dir
 * @see {@link theme_dir}
 */
const layout = toUnix(join(theme_dir, 'layout/layout.ejs'));
const logname = chalk.hex('#fcba03')('[render]');
const page_url = new URL(config.url);

const renderCache = new CacheFile('renderArticle');
const sitemap = new Sitemap();

export const renderPost = function () {
  const log = logname + chalk.blue('[posts]');
  return new Bluebird((resolve) => {
    console.log(log, 'generating to', generated_dir);
    const exclude = config.exclude.map((ePattern) =>
      ePattern.replace(/^!+/, '')
    );
    const ignore = ['_drafts/', '_data/', ...exclude];
    globSrc('**/*.md', { ignore: ignore, cwd: source_dir })
      // validate excluded
      .filter((file) => {
        if (file.match(/_(drafts|data)\//)) return false;
        return true;
      })
      // transform path and others
      .map((file) => {
        const result = {
          /**
           * post type
           */
          type: file.includes('_posts/') ? 'post' : 'page',
          /** Full path (also cache key) */
          path: join(source_dir, file),
          /** Permalink path */
          permalink: removeMultiSlashes(
            replaceArr(
              file,
              [cwd(), 'source/_posts/', 'src-posts/', '_posts/'],
              '/'
            )
          ).replace(/.md$/, '.html'),
          /** Is Cached */
          cached: false
        };
        // set cache indicator, if cache not exist and argument nocache not set
        result.cached = renderCache.has(result.path) && !nocache;
        let parsed = parsePost(result.path);
        // try non-cache method
        if (!validateParsed(parsed)) parsed = parsePost(result.path);
        if (!validateParsed(parsed)) {
          console.log(
            log,
            color.redBright('[fail]'),
            'cannot parse',
            result.path
          );
          return;
        }
        const modify = modifyPost(<any>parsed);
        if (result.path.includes('Grid'))
          write(tmp('modify.md'), buildPost(modify)).then(console.log);
        const merge = Object.assign(result, modify, result.path);
        if (
          typeof merge.metadata == 'object' &&
          typeof merge.metadata.url == 'string'
        ) {
          const url = new URL(merge.metadata.url);
          url.pathname = url.pathname.replace(/\/+/, '/');
          merge.metadata.url = url.toString();
        }
        return merge;
      })
      // filter only non-empty object
      .filter((parsed) => typeof parsed == 'object')
      .then(function (result) {
        console.log(log, 'markdown sources total', result.length);
        let counter = 0;
        /**
         * Queue for process first item
         * @returns
         */
        const runner = () => {
          counter++;
          if (!result.length) return resolve(result.length);
          // get first item
          const parsed = result[0];
          console.log(`${counter} generate post ${parsed.metadata.title}`);

          /**
           * remove first item, skip
           * @returns
           */
          const skip = () => {
            result.shift();
            if (!result.length) return resolve();
            return runner();
          };

          /**
           * Save rendered ejs to `config.public_dir`
           * @param rendered
           * @returns
           */
          const save = (rendered: string) => {
            const saveto = join(generated_dir, parsed.permalink);
            //console.log(logname, chalk.greenBright('generated'), saveto);
            write(saveto, rendered);
            parsed.generated = rendered;
            parsed.generated_path = saveto;
            renderCache.set(parsed.path, rendered);
            //write(tmp(parsed.permalink.replace(/.html$/, '.md')), JSON.stringify(parsed));
            //console.log(logname + chalk.cyanBright('[remaining]', result.length));
            sitemap.add(parsed.metadata);
            return parsed;
          };

          if (parsed.cached) {
            if (renderCache.isFileChanged(parsed.path)) {
              console.log(
                log + chalk.blueBright('[cache]'),
                parsed.path,
                chalk.redBright('changed')
              );
            } else {
              // if cache hit, skip process
              return skip();
            }
          }

          renderer(parsed)
            .then(save)
            .then(skip)
            .catch((e) => {
              console.log(logname, chalk.red('[error]'), parsed.path);
              console.error(e);
            });
        };
        return runner();
      });
  });
};

gulp.task('generate:posts', renderPost);

const helpers: DynamicObject = {
  /**
   * get latest posts (non-cache)
   */
  getLatestPosts: getLatestPosts,
  /**
   * get random posts (non-cache)
   */
  getRandomPosts: getRandomPosts,
  /**
   * get all posts (non-cache)
   */
  getAllPosts: getAllPosts,
  /**
   * get all posts (cached)
   */
  getAllCachedPosts: (() => {
    try {
      return getAllPosts().map((parsed) =>
        Object.assign(parsed, parsed.metadata)
      );
    } catch (error) {
      return [];
    }
  })(),
  css: (path: string, attributes: DynamicObject = {}) => {
    const find = {
      cwdFile: join(cwd(), path),
      themeFile: join(theme_dir, path),
      layoutFile: join(dirname(layout), path)
    };
    let cssStr: string;
    for (const key in find) {
      if (Object.prototype.hasOwnProperty.call(find, key)) {
        const cssfile = find[key];
        if (existsSync(cssfile)) {
          cssStr = readFileSync(cssfile, 'utf-8');
          break;
        }
      }
    }
    const build = [];
    for (const key in attributes) {
      if (Object.prototype.hasOwnProperty.call(attributes, key)) {
        const v = attributes[key];
        build.push(`${key}="${v}"`);
      }
    }
    if (!cssStr) return `<!-- ${path} not found -->`;
    if (!build.length) return `<style>${cssStr}</style>`;
    return `<style ${build.join(' ')}>${cssStr}</style>`;
  }
};

interface Override extends ejs.Options {
  [key: string]: any;
}

/**
 * EJS Renderer Engine
 * @param parsed
 * @param override override {@link Override} object ejs options {@link ejs.Options}, page data {@link postMap} default empty object
 * @returns rendered promise (Promise\<string\>)
 * renderer injection
 * ```js
 * renderer(parsed, {
 *  // new helper available on ejs layout
 *  newhelper: function () {
 *    return 'new helper';
 *  }
 * })
 * ```
 * ejs
 * ```html
 * <%- newhelper() %>
 * ```
 */
export function renderer(parsed: Partial<postMap>, override: Override = {}) {
  return new Promise((resolve: (arg: string) => any) => {
    // render markdown to html
    const body = renderBodyMarkdown(parsed);

    const defaultOpt: ejs.Options = {
      //cache: true,
    };

    // assign body
    const pagedata = Object.assign(
      defaultOpt,
      parsed.metadata,
      parsed,
      override
    );

    page_url.pathname = parsed['permalink'];
    const ejs_data = Object.assign(
      parsed,
      {
        // page metadata
        page: pagedata,
        // site config
        config: config,
        // layout theme
        root: theme_dir,
        // theme config
        theme: theme_config,
        // permalink
        url: page_url.toString(),
        // content
        content: null
      },
      helpers
    );

    // render body html to ejs compiled
    ejs_data.page.content = ejs_object.render(body, ejs_data);
    ejs_data.page.body = ejs_data.page.content;
    //write(tmp('tests', 'parse-body.html'), parsed.body).then(console.log);
    //write(tmp('tests', 'generate.log'), inspect(ejs_data)).then(console.log);

    ejs_object.renderFile(layout, ejs_data).then(async (rendered) => {
      resolve(rendered);
    });
  });
}
