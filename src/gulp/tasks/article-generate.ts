/* eslint-disable @typescript-eslint/no-unused-vars */
import gulp from 'gulp';
import { toUnix } from 'upath';
import { cwd, existsSync, join, resolve, rmdirSync, write } from '../../node/filemanager';
import config, { post_public_dir, root, theme_config, theme_dir, tmp } from '../../types/_config';
import through from 'through2';
import vinyl from 'vinyl';
import 'js-prototypes';
import Bluebird from 'bluebird';
import ejs_object, { DynamicObject } from '../../ejs';
import { parsePost } from '../../markdown/transformPosts';
import writeFile from '../compress/writeFile';
import chalk from 'chalk';
import scheduler from '../../node/scheduler';
import { inspect } from 'util';
import { modifyPost, replacePath } from './article-copy';
import { TaskCallback } from 'undertaker';
import { renderBodyMarkdown } from '../../markdown/toHtml';

const source_dir = toUnix(resolve(join(root, config.source_dir)));
const generated_dir = toUnix(resolve(join(root, config.public_dir)));
const layout = toUnix(join(theme_dir, 'layout/layout.ejs'));
//console.log(existsSync(layout), layout);
//rmdirSync(generated_dir);

const logname = chalk.hex('#fcba03')('[render]');
let log = [logname];

export default function taskGenerate(done?: TaskCallback) {
  const src: string[] = [];
  const exclude = (arr: string[]) => {
    arr.map((s) => '!' + join(source_dir, '**', s)).forEach((s) => src.push(s));
  };
  const include = (arr: string[]) => {
    arr.map((s) => join(source_dir, '**', s)).forEach((s) => src.push(s));
  };

  const renderAssets = () => {
    include(['**/**']);
    // exclude markdown files
    exclude(['_data/**', '_drafts/**', '**/**.md', '_posts/**/**.md', '**/**.code-workspace']);
    return gulp.src(src).pipe(
      through.obj(function (file: vinyl, enc, cb) {
        if (file.path.includes('/_posts')) file.dirname = file.dirname.replace('/_posts/', '/');
        //const pathfile = toUnix(file.path);
        //const contents = fn(String(file.contents), toUnix(file.path), file) || file.contents;
        //file.contents = !Buffer.isBuffer(contents) ? Buffer.from(contents) : contents;
        /*if (!file.basename.toString().match(/\.min\.[js,css,html]/gi)) {
          switch (file.extname) {
            case '.js':
              // minify js
              console.log(file.basename);
              break;

            default:
              break;
          }
        }*/
        cb(null, file);
      })
    );
    //.pipe(gulp.dest(generated_dir));
  };

  const renderTemplate = () => {
    return gulp.src(join(theme_dir, 'source/**/**'));
  };

  const renderArticle = () => {
    // only markdown files
    src.length = 0;
    include(['**.md', '_posts/**/**.md']);
    //include(['_posts/Chimeraland/Recipes.md']);
    exclude(['_data/**', '_drafts/**', '**/readme.md', '**/**.code-workspace', '**/guzzle/**', ...config.skip_render]);
    if (Array.isArray(config.exclude)) exclude(config.exclude);

    const sitemap: string[] = [];
    return gulp.src(src, { nocase: true }).pipe(
      through.obj(async (file: vinyl, encoding, cb) => {
        log = [logname];
        log.push(file.path.replace(cwd(), ''));

        if (file.isNull() || file.isStream() || file.extname != '.md' || file.path.match(/(readme|changelog|contribute|404).md$/gi) || file.stat.size == 0) {
          log.push(chalk.red('excluded'));
          console.log(log.join(' '));
          return cb(null, file);
        }

        const self = this;
        let parse = parsePost(file.contents.toString(encoding));
        if (parse) {
          parse.fileTree = {
            source: replacePath(toUnix(file.path.toString()), '/source/_posts/', '/src-posts/'),
            public: replacePath(toUnix(file.path.toString()), '/src-posts/', '/source/_posts/'),
          };
        }
        const modify = modifyPost(parse);
        if (modify.error) {
          log.push(chalk.red('fail modify'));
          console.log(log.join(' '));
          return cb(null, file);
        }
        // reparse
        parse = parsePost(modify.content);
        parse.body = renderBodyMarkdown(parse);
        const filepath = toUnix(file.path);
        file.extname = '.html';
        if (file.dirname.includes('/_posts')) file.dirname = file.dirname.replace('/_posts/', '/');
        if (file.dirname.match(/readme/gi)) console.log(file.dirname);
        if (parse) {
          const ejs_opt: DynamicObject = Object.assign(parse.metadata, parse);
          ejs_opt.content = parse.body;
          //delete parse.body;
          const page_url = new URL(config.url);
          page_url.pathname = filepath.replaceArr([post_public_dir, join(cwd(), 'source')], '').replace(/.md$/, '.html');
          ejs_opt.url = page_url.toString();
          sitemap.push(ejs_opt.url);
          return ejs_object
            .renderFile(layout, { page: ejs_opt, config: config, root: theme_dir, theme: theme_config })
            .then((rendered) => {
              file.contents = Buffer.from(rendered);
              if (self) self.push(rendered);
              log.push(chalk.green('success'));
              return rendered;
            })
            .catch((e) => {
              writeFile(tmp(parse.metadata.uuid, 'error.log'), inspect(e));
            })
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
              console.log(log.join(' '));
              cb(null, file);
            });
        } else {
          log.push(chalk.red('fail 2nd parse'));
        }
        console.log(log.join(' '));
        cb(null, file);
      })
    );
  };

  //return renderAssets().once('end', () => renderArticle().pipe(gulp.dest(generated_dir)));
  /*return Bluebird.resolve(renderTemplate())
    .then((template) => [template, renderAssets()])
    .then((arr) => [...arr, renderArticle()])
    .then((arr) => arr.map((s) => s.pipe(gulp.dest(generated_dir))));*/
  return gulp.series(renderTemplate, renderAssets, renderArticle)(done);
}
