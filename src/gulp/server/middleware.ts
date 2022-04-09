import { cwd, existsSync, join, readFileSync, write } from '../../node/filemanager';
import config, { post_generated_dir, post_public_dir } from '../../types/_config';
import 'js-prototypes';
import '../../node/cache-serialize';
import ejs_object from '../../ejs';
import gulp from 'gulp';
import { parsePost } from '../../markdown/transformPosts';
import { modifyPost } from '../tasks/copy';
import { renderer } from '../tasks/generate';
import chalk from 'chalk';
import { toUnix } from 'upath';

let gulpIndicator = false;
const preview = readFileSync(join(__dirname, 'public/preview.html'), 'utf-8');

const ServerMiddleWare: import('browser-sync').Options['middleware'] = [
  async function (req, res, next) {
    const pathname = req.url;
    if (!/\/api/.test(pathname)) {
      /*res.writeHead(302, {
        Location: '/src/public/index.html#/App1/Dashboard',
      });
      res.end();*/

      if (pathname.endsWith('.html')) {
        // find post and pages
        const sourceMD = [join(cwd(), config.source_dir, '_posts', decodeURIComponent(pathname)), join(cwd(), config.source_dir, decodeURIComponent(pathname))].map((s) =>
          s.replace(/.html$/, '.md')
        );
        for (let index = 0; index < sourceMD.length; index++) {
          const md = sourceMD[index];
          const dest = join(post_generated_dir, toUnix(md).replaceArr([cwd(), 'source/', '_posts/'], '')).replace(/.md$/, '.html');
          // start generating
          if (existsSync(md)) {
            // pre-process markdown
            if (!gulpIndicator) {
              gulpIndicator = true;
              gulp.series('generate:assets', 'generate:template')(() => (gulpIndicator = false));
            }
            // parse markdown metadata
            const parsed = modifyPost(parsePost(md));
            // render markdown post
            renderer(parsed).then((rendered) => write(dest, rendered.replace('</body>', preview + '</body>')).then((f) => console.log(chalk.blueBright('preview saved'), f)));
          }
          // show previous generated
          if (existsSync(dest)) return res.end(readFileSync(dest));
        }
      }
    }
    // skip
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

export default ServerMiddleWare;
