import { cwd, existsSync, join, readFileSync, write } from '../../node/filemanager';
import config, { post_generated_dir, tmp } from '../../types/_config';
import ejs_object from '../../ejs';
import gulp, { TaskFunction } from 'gulp';
import { parsePost } from '../../markdown/transformPosts';
import { renderer } from '../tasks/generate-posts';
import { toUnix } from 'upath';
import fixHtmlPost from '../tasks/generate-after';
import compress from 'compression';
import '../tasks/generate';
import 'js-prototypes';
import { JSDOM } from 'jsdom';
import chalk from 'chalk';
import Bluebird from 'bluebird';
import { modifyPost } from '../../markdown/transformPosts/modifyPost';
import { generateIndex, generateLabel } from '../tasks/generate-archives';
import './gen-middleware';
import routedata from './routes.json';
import jdom from '../../node/jsdom';
import { inspect } from 'util';

let gulpIndicator = false;
const homepage = new URL(config.url);
let preview: string;

const dom = new jdom();
function showPreview(str: string | Buffer) {
  const previewfile = join(__dirname, 'public/preview.html');
  if (!preview) preview = existsSync(previewfile) ? readFileSync(previewfile, 'utf-8') : 'NO PREVIEW AVAILABLE';
  const doc = dom.parse(String(str));
  doc.body.innerHTML += preview;
  Array.from(doc.querySelectorAll('a')).forEach((a) => {
    let href = a.getAttribute('href');
    if (typeof href == 'string' && href.isMatch(new RegExp('^https?://' + homepage.host))) {
      href = href.replace(new RegExp('^https?://' + homepage.host + '/'), '/');
      return a.setAttribute('href', href);
    }
    a.setAttribute('href', href);
  });
  const body = dom.serialize();
  //body = body.replace(new RegExp(config.url + '/', 'gm'), '/').replace(new RegExp(config.url, 'gm'), '');

  dom.close();
  return body;
}

const copyAssets = (...fn: TaskFunction[] | string[]) => {
  return new Bluebird((resolve) => {
    if (!gulpIndicator) {
      gulpIndicator = true;
      const tasks = ['generate:assets', 'generate:template', ...fn].removeEmpties();

      gulp.series(...tasks)(() => {
        gulpIndicator = false;
        resolve();
      });
    }
  });
};

const ServerMiddleWare: import('browser-sync').Options['middleware'] = [
  function (req, res, next) {
    copyAssets(); // dont await to keep performance
    next();
  },
  async function (req, res, next) {
    res.setHeader('X-Powered-By', 'SBG'); // send X-Powered-By
    if (!config.server.cache) {
      res.setHeader('Expires', 'on, 01 Jan 1970 00:00:00 GMT');
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
      res.setHeader('Cache-Control', 'post-check=0, pre-check=0');
      res.setHeader('Pragma', 'no-cache');
    }

    const isHomepage = req.url === '/';
    if (isHomepage) return next();
    // skip api, admin
    if (req.url.isMatch(/^\/(api|admin)/)) return next();
    // skip assets
    if (req.url.isMatch(/.(css|js|png|svg|jpeg|webp|jpg|ico)$/)) return next();

    homepage.pathname = req.url; // let URL instance parse the url
    const pathname = homepage.pathname; // just get pathname

    //console.log('pathname', pathname);
    write(tmp('middleware.log'), inspect(req));

    const isPage = pathname.isMatch(/(.html|\/)$/);

    if (isPage) {
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
    // show previous generated
    if (!pathname) console.log('last processed', pathname);
    next();
  },
  {
    route: '/',
    handle: async function (req, res, next) {
      const sourceIndex = join(cwd(), config.public_dir, 'index.html');
      const str = await generateIndex();
      if (str) return res.end(showPreview(str));
      if (existsSync(sourceIndex)) {
        console.log('[archive] pre-processed', req.url, '->', sourceIndex);
        return res.end(showPreview(readFileSync(sourceIndex)));
      }
      next();
    },
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
      return ejs_object
        .renderFile(join(__dirname, 'public/admin.ejs'))
        .then((rendered) => res.end(rendered))
        .catch(next);
    },
  },
];

if (config.server.compress) {
  // push compression to first index
  ServerMiddleWare.unshift.apply(compress());
}

routedata.category.addAll(routedata.tag).forEach((path) => {
  ServerMiddleWare.push({
    route: path,
    handle: async function (req, res, next) {
      const pathname = req.url.replace(/\/+/, '/').replace(/^\//, '');
      const labelname = req.url.split('/').last(1)[0];
      const sourceArchive = join(cwd(), config.public_dir, decodeURIComponent(pathname), 'index.html');
      let result: string;
      await generateLabel((str) => {
        result = str;
      }, labelname);
      if (existsSync(sourceArchive)) {
        result = readFileSync(sourceArchive, 'utf-8');
      }
      if (result) {
        res.end(showPreview(readFileSync(result)));
      }
      next();
    },
  });
});

export default ServerMiddleWare;
