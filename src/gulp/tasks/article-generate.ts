/* eslint-disable @typescript-eslint/no-unused-vars */
import gulp from 'gulp';
import { toUnix } from 'upath';
import { cwd, dirname, existsSync, globSrc, join, mkdirSync, removeMultiSlashes, resolve, statSync, write } from '../../node/filemanager';
import config, { root, sitemaps, theme_config, theme_dir } from '../../types/_config';
import 'js-prototypes';
import ejs_object, { DynamicObject } from '../../ejs';
import { parsePost } from '../../markdown/transformPosts';
import chalk from 'chalk';
import { renderBodyMarkdown } from '../../markdown/toHtml';
import CacheFile from '../../node/cache';
import logger from '../../node/logger';
import { copyFileSync } from 'fs';
import { modifyPost } from './article-copy';

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
const global_exclude = ['**/_drafts/**', '**/_data/**'];

const renderAssets = () => {
  logger.log(logname + chalk.magentaBright('[assets]'), 'copy ->', generated_dir);
  const exclude = config.exclude.map((ePattern) => ePattern.replace(/^!+/, ''));
  const ignore = ['**/*.md', ...exclude, ...global_exclude];
  return globSrc('**/*.*', { cwd: source_dir, ignore: ignore, dot: true, stat: true })
    .then((s) => {
      if (config.verbose) {
        logger.log(logname + '[total]', s.length);
        logger.log(ignore);
      }
      return s;
    })
    .each((file, i) => {
      const src = join(source_dir, file);
      const stat = statSync(src);
      const dest = join(generated_dir, file.replace('_posts/', '/'));
      if (!existsSync(dirname(dest))) mkdirSync(dirname(dest));
      if (!stat.isDirectory()) {
        copyFileSync(src, dest);
        if (config.verbose) logger.log(logname + chalk.greenBright(`[${i}]`), src, '->', dest);
      }
    });
};

gulp.task('generate:assets', renderAssets);

const renderTemplate = () => {
  logger.log(logname + chalk.magentaBright('[template]'), 'start');
  return gulp
    .src(join(theme_dir, 'source/**/**'), { cwd: root })
    .pipe(gulp.dest(generated_dir))
    .on('end', () => logger.log(logname + chalk.magentaBright('[template]'), chalk.green('finish')));
};

gulp.task('generate:template', renderTemplate);

const renderCache = new CacheFile('renderArticle');
export const renderArticle = function () {
  return new Promise((resolve) => {
    logger.log(logname, 'generating to', generated_dir);
    const exclude = config.exclude.map((ePattern) => ePattern.replace(/^!+/, ''));
    const ignore = ['_drafts/', '_data/', ...exclude];
    globSrc('**/*.md', { ignore: ignore, cwd: source_dir })
      // validate excluded
      .filter((file) => {
        if (file.match(/_(drafts|data)\//)) return false;
        return true;
      })
      // validate sources
      .then((data) => {
        if (!data.length) {
          logger.log(ignore);
        } else {
          logger.log(logname, 'markdown sources total', data.length);
        }
        return data;
      })
      // transform path and others
      .map((file) => {
        const result = {
          /** Full path (also cache key) */
          path: join(source_dir, file),
          /** Permalink path */
          permalink: removeMultiSlashes(file.replaceArr([cwd(), '_posts/'], '/')).replace(/.md$/, '.html'),
          /** Is Cached */
          cached: false,
        };
        result.cached = renderCache.has(result.path);

        return result;
      })
      .map((result) => {
        const parse = Object.assign(result, parsePost(result.path));
        if (!parse) {
          logger.log(logname, chalk.red('[fail]'), result.path);
          return;
        }
        return parse;
      })
      // remove unparsed markdowns
      .filter((parsed) => typeof parsed.metadata != 'undefined')
      .then(function (result) {
        function push(array: typeof sitemaps, item: typeof sitemaps[0]) {
          if (!array.some((el) => el.title === item.title)) array.push(item);
        }
        /**
         * Queue for process first item
         * @returns
         */
        const runner = () => {
          if (!result.length) return resolve(result.length);
          // get first item
          const parsed = result[0];
          push(sitemaps, parsed.metadata);
          /**
           * remove first item, skip
           * @returns
           */
          const skip = () => result.shift();
          /**
           * Save rendered ejs to `config.public_dir`
           * @param rendered
           * @returns
           */
          const save = (rendered: string) => {
            const saveto = join(generated_dir, parsed.permalink);
            logger.log(logname, chalk.greenBright('generated'), saveto);
            write(saveto, rendered);
            parsed.generated = rendered;
            parsed.generated_path = saveto;
            renderCache.set(parsed.path, rendered);
            //write(tmp(parsed.permalink.replace(/.html$/, '.md')), JSON.stringify(parsed));
            logger.log(logname + chalk.cyanBright('[remaining]', result.length));
            return parsed;
          };
          if (parsed.cached) {
            if (renderCache.isFileChanged(parsed.path)) {
              logger.log(logname + chalk.blueBright('[cache]'), parsed.path, chalk.redBright('changed'));
            } else {
              skip();
            }
          }
          // render markdown to html
          parsed.body = renderBodyMarkdown(modifyPost(parsed));
          // ejs render preparation
          const ejs_opt: DynamicObject = Object.assign(parsed.metadata, parsed);
          ejs_opt.content = parsed.body; // html rendered markdown
          page_url.pathname = parsed.permalink;
          ejs_opt.url = page_url.toString(); // permalink
          ejs_object
            .renderFile(layout, { page: ejs_opt, config: config, root: theme_dir, theme: theme_config })
            .then(save)
            .then(skip)
            .catch((e) => {
              logger.log(logname, chalk.red('[error]'), parsed.path);
              logger.error(e);
            })
            .finally(() => {
              if (!result.length) {
                // generate sitemap
                write(join(generated_dir, 'sitemap.txt'), sitemaps.map((o) => o.url).join('\n'));
                ejs_opt.content = sitemaps.map((o) => `[${o.title}](${o.url})`).join('\n\n');
                ejs_opt.title = 'Sitemap';
                ejs_opt.category = ['Sitemap'];
                ejs_opt.tags = ['Sitemap'];
                ejs_opt.webtitle = 'WMI';
                ejs_object.renderFile(layout, { page: ejs_opt, config: config, root: theme_dir, theme: theme_config }).then((rendered) => {
                  write(join(generated_dir, 'sitemap.html'), rendered).then(() => {
                    return runner();
                  });
                });
              } else {
                return runner();
              }
            });
        };
        return runner();
      });
  });
};

gulp.task('generate:posts', renderArticle);

gulp.task('generate', gulp.series('generate:assets', 'generate:template', 'generate:posts'));

/*




          const self = this;


          // reparse

          const filepath = toUnix(file.path);


          if (file.dirname.match(/readme/gi)) logger.log(file.dirname);
          if (parse) {

            //delete parse.body;


              .finally(() => {

                logger.log(...log);
                cb(null, file);
              });
          } else {
            log.push(chalk.red('fail 2nd parse'));
          }
          logger.log(...log);
          cb(null, file);*/
