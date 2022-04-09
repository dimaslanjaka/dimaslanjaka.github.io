import { cwd, existsSync, join, readFileSync, write } from '../../node/filemanager';
import config, { post_generated_dir } from '../../types/_config';
import 'js-prototypes';
import '../../node/cache-serialize';
import ejs_object from '../../ejs';
import gulp from 'gulp';
import { parsePost } from '../../markdown/transformPosts';
import { modifyPost } from '../tasks/copy';
import { renderer } from '../tasks/generate';
import { toUnix } from 'upath';
import fixHtmlPost from '../tasks/generate-after';
import compress from 'compression';

let gulpIndicator = false;
const preview = readFileSync(join(__dirname, 'public/preview.html'), 'utf-8');
const homepage = new URL(config.url);

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
      /*res.writeHead(302, {
        Location: '/src/public/index.html#/App1/Dashboard',
      });
      res.end();*/

      if (pathname.match(/(.html|\/)$/)) {
        // find post and pages
        const sourceMD = [join(cwd(), config.source_dir, '_posts', decodeURIComponent(pathname)), join(cwd(), config.source_dir, decodeURIComponent(pathname))].map((s) =>
          s.replace(/.html$/, '.md')
        );
        sourceMD.push(join(cwd(), config.source_dir, decodeURIComponent(pathname))); // push non-markdown source
        for (let index = 0; index < sourceMD.length; index++) {
          const file = sourceMD[index];
          const dest = join(post_generated_dir, toUnix(file).replaceArr([cwd(), 'source/', '_posts/'], '')).replace(/.md$/, '.html');
          // start generating
          if (existsSync(file)) {
            try {
              // pre-process markdown
              if (!gulpIndicator) {
                gulpIndicator = true;
                gulp.series('generate:assets', 'generate:template')(() => (gulpIndicator = false));
              }
              // parse markdown metadata
              const parsed = modifyPost(parsePost(file));
              // render markdown post
              return renderer(parsed).then((rendered) => {
                rendered = fixHtmlPost(rendered).replace(new RegExp(config.url + '/', 'gm'), '/');
                write(dest, rendered);
                const content = rendered.replace('</body>', preview + '</body>');
                res.setHeader('Content-Type', 'text/html');
                console.log('pre-processed', pathname);
                res.end(content);
              });
            } catch (error) {
              return res.end(readFileSync(file));
            }
          }
        }
      }
    }
    // show previous generated
    console.log('last processed', pathname);
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
