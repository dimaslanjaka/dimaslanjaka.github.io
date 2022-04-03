/* eslint-disable @typescript-eslint/no-unused-vars */
import gulp from 'gulp';
import { toUnix } from 'upath';
import { cwd, globSrc, join, normalize, removeMultiSlashes, resolve, write } from '../../node/filemanager';
import config, { post_public_dir, root, theme_config, theme_dir, tmp } from '../../types/_config';
import vinyl from 'vinyl';
import 'js-prototypes';
import ejs_object, { DynamicObject } from '../../ejs';
import { parsePost } from '../../markdown/transformPosts';
import writeFile from '../compress/writeFile';
import chalk from 'chalk';
import { inspect } from 'util';
import { modifyPost, replacePath } from './article-copy';
import { renderBodyMarkdown } from '../../markdown/toHtml';
import sanitizeFilename from '../../node/sanitize-filename';

/**
 * @see {@link config.source_dir}
 */
const source_dir = toUnix(resolve(join(root, config.source_dir)));
/**
 * @see {@link config.public_dir}
 */
const generated_dir = toUnix(resolve(join(root, config.public_dir)));
/**
 * layout.ejs from theme_dir
 * @see {@link theme_dir}
 */
const layout = toUnix(join(theme_dir, 'layout/layout.ejs'));

const logname = chalk.hex('#fcba03')('[render]');
const page_url = new URL(config.url);

const globalExcludePatterns = ['!source/_data/**', '!source/_drafts/**'];

const renderAssets = () => {
  console.log(logname + chalk.magentaBright('[assets]'), 'start');
  const src = ['source/**/**', '!source/**/**.{md,php}', '!source/_posts/**/**.md', ...config.exclude];
  src.addAll(globalExcludePatterns);
  return gulp
    .src(src, { cwd: root })
    .pipe(gulp.dest(normalize(generated_dir)))
    .on('end', () => console.log(logname + chalk.magentaBright('[assets]'), chalk.green('finish')));
};

gulp.task('generate:assets', renderAssets);

const renderTemplate = () => {
  console.log(logname + chalk.magentaBright('[template]'), 'start');
  return gulp
    .src(join(theme_dir, 'source/**/**'), { cwd: root })
    .pipe(gulp.dest(generated_dir))
    .on('end', () => console.log(logname + chalk.magentaBright('[template]'), chalk.green('finish')));
};

gulp.task('generate:template', renderTemplate);

export const renderArticle = function () {
  console.log(logname, 'generating to', generated_dir);
  const exclude = config.exclude.map((ePattern) => ePattern.replace(/^!+/, ''));
  const ignore = ['_drafts/', '_data/', ...exclude];
  return (
    globSrc('**/*.md', { ignore: ignore, cwd: source_dir })
      .filter((file) => {
        if (file.match(/_(drafts|data)\//)) return false;
        return true;
      })
      // validate sources
      .then((data) => {
        if (!data.length) {
          console.log(ignore);
        } else {
          console.log(logname, 'markdown sources total', data.length);
        }
        return data;
      })
      .map((file) => {
        const result = {
          /** Full path */
          path: join(source_dir, file),
          /** Permalink path */
          permalink: removeMultiSlashes(file.replaceArr([cwd(), '_posts/'], '/')).replace(/.md$/, '.html'),
        };

        return result;
      })
      .map((result) => {
        const parse = Object.assign(result, parsePost(result.path));
        if (!parse) {
          console.log(logname, chalk.red('[fail]'), result.path);
          return;
        }
        return parse;
      })
      // remove unparsed markdowns
      .filter((parsed) => typeof parsed.metadata != 'undefined')
      .then(function (result) {
        const runner = () => {
          return new Promise<void>((resolve) => {
            if (!result.length) return resolve();
            const parsed = result[0];
            // render markdown to html
            parsed.body = renderBodyMarkdown(parsed);
            // ejs render preparation
            const ejs_opt: DynamicObject = Object.assign(parsed.metadata, parsed);
            ejs_opt.content = parsed.body; // html rendered markdown
            page_url.pathname = parsed.permalink;
            ejs_opt.url = page_url.toString(); // permalink
            ejs_object
              .renderFile(layout, { page: ejs_opt, config: config, root: theme_dir, theme: theme_config })
              .then((rendered) => {
                const saveto = join(generated_dir, parsed.permalink);
                console.log(logname, chalk.greenBright('generated'), saveto);
                write(saveto, rendered);
                parsed.generated = rendered;
                parsed.generated_path = saveto;
                //write(tmp(parsed.permalink.replace(/.html$/, '.md')), JSON.stringify(parsed));
                result.shift();
              })
              .catch((e) => {
                console.log(logname, chalk.red('[error]'), parsed.path);
                console.error(e);
              })
              .finally(runner);
          });
        };
        return runner();
      })
  );
};

gulp.task('generate:posts', renderArticle);

gulp.task('generate', gulp.series('generate:assets', 'generate:template', 'generate:posts'));

/*




          const self = this;


          // reparse

          const filepath = toUnix(file.path);


          if (file.dirname.match(/readme/gi)) console.log(file.dirname);
          if (parse) {

            //delete parse.body;


              .finally(() => {
                scheduler.add('sitemap', () => {
                  // generate sitemap
                  write(join(generated_dir, 'sitemap.txt'), sitemap.join('\n'));
                  ejs_opt.content = sitemap.map((s) => `<a href='${s}'>${s}</a>`).join('<br/>');
                  ejs_opt.title = 'Sitemap';
                  ejs_opt.category = ['Sitemap'];
                  ejs_opt.tags = ['Sitemap'];
                  ejs_opt.webtitle = 'WMI';
                  ejs_object.renderFile(layout, { page: ejs_opt, config: config, root: theme_dir, theme: theme_config }).then((rendered) => {
                    write(join(generated_dir, 'sitemap.html'), rendered);
                  });
                });
                console.log(...log);
                cb(null, file);
              });
          } else {
            log.push(chalk.red('fail 2nd parse'));
          }
          console.log(...log);
          cb(null, file);*/
