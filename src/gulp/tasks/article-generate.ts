/* eslint-disable @typescript-eslint/no-unused-vars */
import gulp from 'gulp';
import { toUnix } from 'upath';
import { cwd, getAllFiles, join, normalize, resolve, write } from '../../node/filemanager';
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
import micromatch from 'micromatch';
import minimatch from 'minimatch';
import glob from 'glob';
import Bluebird from 'bluebird';

const source_dir = toUnix(resolve(join(root, config.source_dir)));
const generated_dir = toUnix(resolve(join(root, config.public_dir)));
const layout = toUnix(join(theme_dir, 'layout/layout.ejs'));
//console.log(existsSync(layout), layout);
//rmdirSync(generated_dir);

const logname = chalk.hex('#fcba03')('[render]');
const log = [logname];
interface extendedVinyl extends vinyl {
  url: string;
  encoding: BufferEncoding;
}
const articles: extendedVinyl[] = [];
const page_url = new URL(config.url);
const sitemap: string[] = [];

const src: string[] = [];
const exclude = (arr: string[]) => {
  arr.map((s) => '!' + join(source_dir, '**', s)).forEach((s) => src.push(s));
};
const include = (arr: string[]) => {
  arr.map((s) => join(source_dir, '**', s)).forEach((s) => src.push(s));
};

const globalExcludePatterns = ['!source/_data/**', '!source/_drafts/**'];

const renderAssets = () => {
  console.log(logname + chalk.magentaBright('[assets]'), 'start');
  const src = ['source/**/**', '!source/**/**.{md,php}', '!source/_posts/**/**.md', ...config.exclude];
  src.addAll(globalExcludePatterns);
  return gulp
    .src(src, { cwd: root })
    .pipe(gulp.dest(normalize(generated_dir)))
    .on('end', () => console.log(logname + chalk.magentaBright('[assets]'), chalk.green('finish')));

  /*
    .pipe(
      through.obj(function (file: vinyl, enc, cb) {
        if (file.path.includes('/_posts')) file.dirname = file.dirname.replace('/_posts/', '/');
        //const pathfile = toUnix(file.path);
        //const contents = fn(String(file.contents), toUnix(file.path), file) || file.contents;
        //file.contents = !Buffer.isBuffer(contents) ? Buffer.from(contents) : contents;

      cb(null, file);
    })
  )
  */
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
  console.log('[render]', 'generating to', generated_dir);
  const exclude = config.exclude.map((ePattern) => ePattern.replace(/^!+/, ''));
  const ignore = ['/_drafts/', '/_data/', ...exclude];

  const getGlob = function (pattern: string) {
    return new Bluebird((resolve: (arg: string[]) => any, reject) => {
      glob(pattern, { ignore: ignore, cwd: post_public_dir, dot: true, matchBase: true }, function (err, files) {
        if (err) {
          return reject(err);
        }
        resolve(files);
      });
    });
  };

  return getGlob('**/*.md').map((file, index) => {
    //const file = files[0];
    const result = {
      /** Full path */
      path: file,
      /** Permalink path */
      permalink: file.replaceArr([cwd(), '/_posts/'], '/'),
    };
    (() => console.log).once(result);
    //write(tmp('glob.log'), files.join('\n'));
  });

  //**/{readme,README,changelog,CHANGELOG}.{md,MD}
  /*
  const filters = src.map((pattern) => {
    const match = minimatch.match(get, pattern, { matchBase: true });
    console.log(match.length, pattern);
  });
  .filter((path) => {
      const matched = [];
      const matchBase = micromatch.some(path, src, { matchBase: true, dot: true, windows: true });
      //const matchContains = micromatch.some(path, src, { matchBase: true, dot: true, windows: true, contains: true });
      console.log(matchBase, path, src);
    });
  //const filter = micromatch(get, src, { matchBase: true, dot: true, regex: true, windows: true, contains: true, nocase: true });
  //console.log(filter.length);

  //console.log(micromatch(get, '*.md', { matchBase: true }).length);

  /*.pipe(
      through.obj(async (file: extendedVinyl, encoding, next) => {
        const filepath = file.path;
        const self = this;
        log = [logname, filepath];
        // exclude
        if (file.isNull() || file.isStream() || file.extname != '.md' || filepath.match(/(readme|changelog|contribute).md$/gi)) {
          log.push(chalk.red('excluded'));
          console.log(...log);
          next();
          return;
        }

        const parse = parsePost(file.contents.toString(encoding));
        if (!parse) {
          log.push(chalk.red('fail parse'));
          console.log(...log);
          next();
          return;
        }
        //parse.fileTree = {
        //  source: replacePath(toUnix(filepath.toString()), '/source/_posts/', '/src-posts/'),
        //  public: replacePath(toUnix(filepath.toString()), '/src-posts/', '/source/_posts/'),
        //};
        //const modify = modifyPost(parse);

        // skip error modification
        //if (modify.error) {
        //  log.push(chalk.red('fail modify'));
        //  console.log(...log);
        //  return next();
        //}

        // reparse
        //parse = parsePost(modify.content);

        // render markdown to html
        parse.body = renderBodyMarkdown(parse);

        // set permalink
        page_url.pathname = toUnix(filepath)
          .replaceArr([post_public_dir, join(cwd(), 'source')], '')
          .replace(/.md$/, '.html');
        const permalink = page_url.toString();

        // push to sitemap
        sitemap.push(permalink);

        // ejs render preparation
        const ejs_opt: DynamicObject = Object.assign(parse.metadata, parse);
        ejs_opt.content = parse.body; // html rendered markdown
        ejs_opt.url = permalink; // permalink
        const ejs_data = { page: ejs_opt, config: config, root: theme_dir, theme: theme_config };
        //const rendered = ejs_object.render(readFileSync(layout, 'utf-8'), ejs_data);
        return ejs_object
          .renderFile(layout, ejs_data)
          .then((rendered) => {
            // emit changes
            file.contents = Buffer.from(rendered);
            if (self) self.push(file);
            console.log(...log, chalk.green('success'));
            next(null, file);
          })
          .catch((e) => {
            console.log(...log, chalk.red('fail render ejs'));
            next();
          });
      })
    )
    .pipe(
      through.obj((file, enc, next) => {
        // remove source/ & /_posts from path
        file.dirname = file.dirname.replace('/_posts/', '/').replace('/source/', '/');

        // change extension to .html
        file.extname = '.html';
      })
    )
    .pipe(gulpDebugSrc());*/
  //.pipe(gulp.dest(generated_dir))
  //.on('end', () => console.log(logname + chalk.magentaBright('[grab]'), chalk.green('finish')))
};

gulp.task('generate:article', renderArticle);

gulp.task('generate', gulp.series('generate:assets', 'generate:template'));

async function renderArticlex(this: any, file: vinyl) {
  log.push(file.path.replace(cwd(), ''));
  let parse = parsePost(file.contents.toString(file.encoding));
  if (parse) {
    parse.fileTree = {
      source: replacePath(toUnix(file.path.toString()), '/source/_posts/', '/src-posts/'),
      public: replacePath(toUnix(file.path.toString()), '/src-posts/', '/source/_posts/'),
    };
    const modify = modifyPost(parse);

    // reparse
    parse = parsePost(modify.content);
    // render markdown to html
    parse.body = renderBodyMarkdown(parse);
    // replace /_posts/ to / for permalink
    if (file.dirname.includes('/_posts')) file.dirname = file.dirname.replace('/_posts/', '/');
    // ejs render preparation
    const ejs_opt: DynamicObject = Object.assign(parse.metadata, parse);
    ejs_opt.content = parse.body; // html rendered markdown
    ejs_opt.url = file.url; // permalink
    // ejs render start
    try {
      const rendered = await ejs_object.renderFile(layout, { page: ejs_opt, config: config, root: theme_dir, theme: theme_config });
      file.contents = Buffer.from(rendered);
      //if (self) self.push(rendered);
      this.push(file);
      log.push(chalk.green('success'));
      console.log(...log);
    } catch (e) {
      writeFile(tmp(sanitizeFilename(parse.metadata.title) + '.log'), inspect(e));
    }
  }
}

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
