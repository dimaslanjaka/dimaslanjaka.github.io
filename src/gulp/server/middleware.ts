import { cwd, existsSync, join, readFileSync, write } from '../../node/filemanager';
import config, { post_generated_dir } from '../../types/_config';
import ejs_object from '../../ejs';
import gulp, { TaskFunction } from 'gulp';
import { parsePost } from '../../markdown/transformPosts';
import { renderer } from '../tasks/generate-posts';
import { toUnix } from 'upath';
import fixHtmlPost from '../tasks/generate-after';
import compress from 'compression';
import '../tasks/generate';
import 'js-prototypes';
import chalk from 'chalk';
import Bluebird from 'bluebird';
import modifyPost from '../../markdown/transformPosts/modifyPost';
import './gen-middleware';
import routedata from './routes.json';
import jdom from '../../node/jsdom';
import { generateIndex } from '../tasks/generate-archives';
import { spawn } from 'child_process';

let gulpIndicator = false;
const homepage = new URL(config.url);
let preview: string;
const labelSrc: string[] = routedata.category.addAll(routedata.tag);

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
        spawn('npm', ['install'], { cwd: join(cwd(), config.public_dir) });
        resolve();
      });
    }
  });
};

const ServerMiddleWare: import('browser-sync').Options['middleware'] = [
  function (_, res, next) {
    copyAssets(); // dont await to keep performance
    // custom headers
    res.setHeader('X-Powered-By', 'Static Blog Generator'); // send X-Powered-By
    if (!config.server.cache) {
      res.setHeader('Expires', 'on, 01 Jan 1970 00:00:00 GMT');
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
      res.setHeader('Cache-Control', 'post-check=0, pre-check=0');
      res.setHeader('Pragma', 'no-cache');
    }
    next();
  },
  async function (req, res, next) {
    const isHomepage = req.url === '/';
    // skip homepage
    if (isHomepage) return next();

    const pathname: string = req['_parsedUrl'].pathname; // just get pathname
    // skip labels (tag and category)
    if (labelSrc.includes(pathname)) return next();
    if (pathname.isMatch(new RegExp('^/' + config.category_dir + '/'))) return next();
    if (pathname.isMatch(new RegExp('^/' + config.tag_dir + '/'))) return next();
    // skip api, admin
    if (pathname.isMatch(/^\/(api|admin)/)) return next();
    // skip assets
    if (pathname.isMatch(/.(css|js|png|svg|jpeg|webp|jpg|ico)$/)) return next();

    //write(tmp('middleware.log'), inspect(req));
    console.log(req['_parsedUrl'].pathname, req['_parsedUrl'].search);

    const isPage = pathname.isMatch(/(.html|\/)$/);

    if (isPage) {
      res.setHeader('Content-Type', 'text/html');
      // find post and pages
      let sourceMD = [join(cwd(), config.source_dir, '_posts', decodeURIComponent(pathname)), join(cwd(), config.source_dir, decodeURIComponent(pathname))].map((s) => {
        return s.replace(/.html$/, '.md');
      });
      sourceMD.push(join(cwd(), config.source_dir, decodeURIComponent(pathname))); // push non-markdown source
      sourceMD = sourceMD
        .map((path) => {
          if (path.endsWith('/')) return path + 'index.md';
          return path;
        })
        .filter(existsSync)
        .unique();
      console.log(sourceMD);
      if (sourceMD.length > 0) {
        for (let index = 0; index < sourceMD.length; index++) {
          const file = sourceMD[index];
          const dest = join(post_generated_dir, toUnix(file).replaceArr([cwd(), 'source/', '_posts/'], '')).replace(/.md$/, '.html');

          // start generating
          if (existsSync(file)) {
            if (file.endsWith('.md')) {
              // parse markdown metadata
              const parsed = parsePost(file);
              if (!parsed) {
                console.log(chalk.redBright('cannot parse'), file);
                //return next();
                continue;
              }
              const modify = modifyPost(parsed);
              //console.log(modify.metadata.type);
              // render markdown post
              return renderer(modify).then((rendered) => {
                rendered = fixHtmlPost(rendered);
                write(dest, rendered);
                const previewed = showPreview(rendered);

                console.log(chalk.greenBright(`[${parsed.metadata.type}]`), 'pre-processed', pathname, '->', file);
                res.end(previewed);
              });
            } else {
              return res.end(showPreview(readFileSync(file)));
            }
          }
        }
      }
    }
    // show previous generated
    //if (!pathname) console.log('last processed', pathname);
    next();
  },
  // homepage route
  {
    route: '/',
    handle: async function (req, res, next) {
      const sourceIndex = join(cwd(), config.public_dir, 'index.html');
      const str = await generateIndex('homepage');
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

labelSrc.forEach((path) => {
  ServerMiddleWare.push({
    route: path,
    handle: async function (req, res, next) {
      const pathname = req['_parsedUrl'].pathname.replace(/\/+/, '/').replace(/^\//, '');
      const labelname = req['_parsedUrl'].pathname.split('/').removeEmpties().last(1)[0];
      const generatedTo = join(cwd(), config.public_dir, decodeURIComponent(pathname), 'index.html');
      console.log('[generate][label]', pathname, labelname, generatedTo);
      let result: string;
      /*await generateLabel((str) => {
        result = str;
      }, labelname);
      if (result) {
        return res.end(showPreview(result));
      }*/
      next();
    },
  });
});

export default ServerMiddleWare;
