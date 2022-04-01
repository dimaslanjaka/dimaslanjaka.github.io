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
import sanitizeFilename from '../../node/sanitize-filename';

const source_dir = toUnix(resolve(join(root, config.source_dir)));
const generated_dir = toUnix(resolve(join(root, config.public_dir)));
const layout = toUnix(join(theme_dir, 'layout/layout.ejs'));
//console.log(existsSync(layout), layout);
//rmdirSync(generated_dir);

const logname = chalk.hex('#fcba03')('[render]');
let log = [logname];
interface extendedVinyl extends vinyl {
  url: string;
  encoding: BufferEncoding;
}
const articles: extendedVinyl[] = [];
const page_url = new URL(config.url);
const sitemap: string[] = [];

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
    return gulp
      .src(src)
      .pipe(
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
      )
      .pipe(gulp.dest(generated_dir));
  };

  const renderTemplate = () => {
    console.log(logname + chalk.bgMagenta.white('[template]'), 'start');
    return gulp.src(join(theme_dir, 'source/**/**')).pipe(gulp.dest(generated_dir));
  };

  const grabArticle = () => {
    // only markdown files
    src.length = 0;
    include(['**.md', '_posts/**/**.md']);
    //include(['_posts/Chimeraland/Recipes.md']);
    exclude(['_data/**', '_drafts/**', '**/guide/**', '**/test/**', '**/readme.md', '**/**.code-workspace', '**/guzzle/**', ...config.skip_render]);
    if (Array.isArray(config.exclude)) exclude(config.exclude);

    return (
      gulp
        .src(src, { nocase: true })
        .pipe(
          through.obj(async (file: extendedVinyl, encoding, cb) => {
            // exclude
            if (file.isNull() || file.isStream() || file.extname != '.md' || file.path.match(/(readme|changelog|contribute|404).md$/gi)) {
              log.push(chalk.red('excluded'));
              console.log(log.join(' '));
              return cb(null, file);
            }
            // set encoding
            file.encoding = encoding;
            // set permalink
            page_url.pathname = toUnix(file.path)
              .replaceArr([post_public_dir, join(cwd(), 'source')], '')
              .replace(/.md$/, '.html');
            file.url = page_url.toString();
            // push to queue
            articles.push(file);
            cb(null, file);
          })
        )
        //.pipe(gulp.dest(generated_dir));
        .pipe(gulp.dest(tmp('generated')))
    );
  };

  //return renderAssets().once('end', () => renderArticle().pipe(gulp.dest(generated_dir)));
  /*return Bluebird.resolve(renderTemplate())
    .then((template) => [template, renderAssets()])
    .then((arr) => [...arr, renderArticle()])
    .then((arr) => arr.map((s) => s.pipe(gulp.dest(generated_dir))));*/
  return gulp.series(renderTemplate, renderAssets, grabArticle, iterateArticles)(done);
}

function iterateArticles(done?: TaskCallback) {
  const skip = () => {
    articles.shift();
    return iterateArticles();
  };
  log = [logname];
  if (articles.length) {
    const file = articles[0];
    let parse = parsePost(file.contents.toString(file.encoding));
    if (parse) {
      parse.fileTree = {
        source: replacePath(toUnix(file.path.toString()), '/source/_posts/', '/src-posts/'),
        public: replacePath(toUnix(file.path.toString()), '/src-posts/', '/source/_posts/'),
      };
      const modify = modifyPost(parse);
      // skip error modification
      if (modify.error) {
        log.push(chalk.red('fail modify'));
        console.log(log.join(' '));
        return skip();
      }

      // push to sitemap
      sitemap.push(file.url);
      // reparse
      parse = parsePost(modify.content);
      if (parse) {
        // render markdown to html
        parse.body = renderBodyMarkdown(parse);
        // change extension to .html
        file.extname = '.html';
        // replace /_posts/ to / for permalink
        if (file.dirname.includes('/_posts')) file.dirname = file.dirname.replace('/_posts/', '/');
        // ejs render preparation
        const ejs_opt: DynamicObject = Object.assign(parse.metadata, parse);
        ejs_opt.content = parse.body; // html rendered markdown
        ejs_opt.url = file.url; // permalink
        // ejs render start
        return ejs_object
          .renderFile(layout, { page: ejs_opt, config: config, root: theme_dir, theme: theme_config })
          .then((rendered) => {
            file.contents = Buffer.from(rendered);
            if (self) self.push(rendered);
            log.push(chalk.green('success'));
            console.log(log.join(' '));
            return rendered;
          })
          .catch((e) => {
            writeFile(tmp(sanitizeFilename(parse.metadata.title) + '.log'), inspect(e));
          });
      }
    }
  } else if (typeof done == 'function') done();
}

/*
          log.push(file.path.replace(cwd(), ''));



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
                console.log(log.join(' '));
                cb(null, file);
              });
          } else {
            log.push(chalk.red('fail 2nd parse'));
          }
          console.log(log.join(' '));
          cb(null, file);*/
