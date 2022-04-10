import { cwd, existsSync, join, readFileSync, write } from '../../node/filemanager';
import config, { post_generated_dir } from '../../types/_config';
import ejs_object from '../../ejs';
import gulp from 'gulp';
import { parsePost } from '../../markdown/transformPosts';
import { modifyPost } from '../tasks/copy';
import { renderer } from '../tasks/generate';
import { toUnix } from 'upath';
import fixHtmlPost from '../tasks/generate-after';
import compress from 'compression';
import '../tasks/generate-archives';
import 'js-prototypes';
import { JSDOM } from 'jsdom';
import chalk from 'chalk';

let gulpIndicator = false;
const preview = readFileSync(join(__dirname, 'public/preview.html'), 'utf-8');
const homepage = new URL(config.url);

function showPreview(str: string | Buffer) {
  //.replace('</body>', () => preview + '</body>')
  const dom = new JSDOM(str);
  dom.window.document.body.innerHTML += preview;
  let body = dom.serialize();
  body = body.replace(new RegExp(config.url + '/', 'gm'), '/');
  dom.window.close();
  return body;
}

const ServerMiddleWare: import('browser-sync').Options['middleware'] = [
  async function (req, res, next) {
    homepage.pathname = req.url; // let URL instance parse the url
    const pathname = homepage.pathname; // just get pathname
    res.setHeader('X-Powered-By', 'SBG'); // send X-Powered-By
    if (!config.server.cache) {
      res.setHeader('Expires', 'on, 01 Jan 1970 00:00:00 GMT');
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
      res.setHeader('Cache-Control', 'post-check=0, pre-check=0');
      res.setHeader('Pragma', 'no-cache');
    }

    if (!/\/api/.test(pathname)) {
      const isArchive = pathname.match(new RegExp(config.category_dir + '/', 'g')) || pathname.match(new RegExp(config.tag_dir + '/', 'g'));
      const sourceArchive = join(cwd(), config.source_dir, decodeURIComponent(pathname), 'index.html');
      if (isArchive) {
        gulp.series('generate:archive')(null);
        ///console.log('generate archive', sourceArchive);
        if (existsSync(sourceArchive)) {
          console.log('[archive] pre-processed', pathname);
          return res.end(showPreview(readFileSync(sourceArchive)));
        }
      }

      if (pathname.match(/(.html|\/)$/)) {
        res.setHeader('Content-Type', 'text/html');
        // find post and pages
        const sourceMD = [join(cwd(), config.source_dir, '_posts', decodeURIComponent(pathname)), join(cwd(), config.source_dir, decodeURIComponent(pathname))].map((s) =>
          s.replace(/.html$/, '.md')
        );
        sourceMD.push(join(cwd(), config.source_dir, decodeURIComponent(pathname))); // push non-markdown source
        for (let index = 0; index < sourceMD.length; index++) {
          let file = sourceMD[index];
          const dest = join(post_generated_dir, toUnix(file).replaceArr([cwd(), 'source/', '_posts/'], '')).replace(/.md$/, '.html');
          if (file.endsWith('/')) file += 'index.html';

          // start generating
          if (existsSync(file)) {
            try {
              // pre-process markdown
              if (!gulpIndicator) {
                gulpIndicator = true;
                gulp.series('generate:assets', 'generate:template')(() => (gulpIndicator = false));
              }
              // parse markdown metadata
              const parsed = parsePost(file);
              if (!parsed) {
                console.log(chalk.redBright('cannot parse'), file);
                return next();
              }
              const modify = modifyPost(parsed);
              //console.log(parsed);
              // render markdown post
              return renderer(modify).then((rendered) => {
                rendered = showPreview(fixHtmlPost(rendered));
                write(dest, rendered);

                console.log(chalk.greenBright(`[${parsed.metadata.type}]`), 'pre-processed', pathname);
                res.end(rendered);
              });
            } catch (error) {
              console.error(error);
              return res.end(readFileSync(file));
            }
          }
        }
      }
    }
    // show previous generated
    if (pathname.endsWith('.html')) console.log('last processed', pathname);
    next();
  },
  {
    route: '/api',
    handle: function (req, res, next) {
      // write source/.guid
      if (req.url.includes('generate')) write(join(cwd(), config.source_dir, '.guid'), new Date()).then(() => console.log('gulp generate start'));
      // write public_dir/.guid
      if (req.url.includes('copy')) write(join(cwd(), 'src-posts/.guid'), new Date()).then(() => console.log('gulp copy start'));
      res.writeHead(200, {
        'Content-Type': 'text/plain',
      });
      res.end(JSON.stringifyWithCircularRefs(new Error('Something went wrong. And we are reporting a custom error message.'), 2));
      next();
    },
  },
  {
    route: '/admin',
    handle: (req, res, next) => {
      ejs_object.renderFile(join(__dirname, 'public/admin.ejs')).then((rendered) => res.end(rendered));
    },
  },
];
if (config.server.compress) {
  // push compression to first index
  ServerMiddleWare.unshift.apply(compress());
}
export default ServerMiddleWare;
