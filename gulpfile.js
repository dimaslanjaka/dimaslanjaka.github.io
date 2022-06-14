var Hexo = require('hexo');
var gulp = require('gulp');
const { getConfig } = require('static-blog-generator');
const { join } = require('upath');
const dom = require('gulp-dom');
const sf = require('safelinkify');
var hexo = new Hexo(process.cwd(), {});

gulp.task('safelink', async () => {
  const config = getConfig();
  const configSafelink = config.external_link.safelink;
  const safelink = new sf.safelink({
    redirect: [config.external_link.safelink.redirect],
    password: config.external_link.safelink.password,
    type: config.external_link.safelink.type
  });
  const internal_links = [
    ...config.external_link.exclude,
    new URL(config.url).host,
    'www.webmanajemen.com',
    'https://github.com/dimaslanjaka',
    '/dimaslanjaka1',
    'dimaslanjaka.github.io'
  ];
  gulp
    .src(join(__dirname, config.public_dir, '**/*.html'))
    .pipe(
      dom(function () {
        //https://github.com/trygve-lie/gulp-dom
        this.querySelectorAll('body')[0].setAttribute('data-version', '1.0');
        const elements = Array.from(this.querySelectorAll('a'));
        if (configSafelink.enable) {
          for (let i = 0; i < elements.length; i++) {
            const a = elements[i];
            const href = String(a.href).trim();
            if (new RegExp('^https?://').test(href)) {
              /**
               * match host
               */
              const matchHost = internal_links.includes(new URL(href).host);
              /**
               * match url
               */
              const matchHref = internal_links.includes(href);
              if (!matchHost && !matchHref) {
                const safelinkPath = safelink.encodeURL(href);
                if (
                  typeof safelinkPath == 'string' &&
                  safelinkPath.length > 0
                ) {
                  a.setAttribute('href', safelinkPath);
                }
              }
            }
          }
        }
      })
    )
    .pipe(gulp.dest(join(__dirname, config.public_dir)));
});

gulp.task('default', async () => {
  hexo.init().then(function () {
    hexo.load().then(function (err, val) {
      //hexo.locals.invalidate();
      const posts = hexo.locals.get('posts');
      posts.forEach((post) => {
        console.log(post.title);
      });
    });
  });
});
