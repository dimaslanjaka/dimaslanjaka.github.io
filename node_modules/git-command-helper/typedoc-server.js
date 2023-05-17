const browserSync = require('browser-sync');
const spawn = require('cross-spawn');
const { existsSync } = require('fs');
const bs = browserSync.create();
const gulp = require('gulp');
const { join } = require('path');

/**
 * Docs serve
 * required:
 * * add docs script for `npm run docs`
 * * npm i -D git-command-helper gulp cross-spawn browser-sync
 *
 * repo: https://github.com/dimaslanjaka/nodejs-package-types/blob/main/typedoc-server.js
 * raw: https://github.com/dimaslanjaka/nodejs-package-types/raw/main/typedoc-server.js
 * update: curl -L https://github.com/dimaslanjaka/nodejs-package-types/raw/main/typedoc-server.js > typedoc-server.js
 */

let building = false;
/**
 * build demo and docs (run only 1 instance)
 * @type {browserSync.MiddlewareHandler | browserSync.PerRouteMiddleware}
 */
const buildDocs = async (_req, _res, next) => {
  if (building) {
    if (typeof next === 'function') return next();
  }
  building = true;
  console.log('building docs...');
  const child = spawn('npm', ['run', 'docs'], { cwd: __dirname, stdio: 'inherit' });
  child.on('close', function (code) {
    console.log('docs build finished', { code });
    building = false;
  });
  if (typeof next === 'function') next();
};

// Serve files from 3 directories with serve-static options
/**
 * @type {browserSync.Options}
 */
const bsOpt = {
  cors: true,
  open: false,
  port: 4000,
  serveStatic: ['.', './docs'],
  serveStaticOptions: {
    extensions: ['html', 'js', 'css'] // pretty urls
  },
  server: {
    routes: {
      '/': '/docs',
      '/docs': '/docs',
      // common
      '/node_modules': './node_modules',
      '/tmp': './tmp',
      '/temp': './temp'
    }
  }
};
if (existsSync(join(__dirname, 'src-docs'))) {
  bsOpt.server = Object.assign(bsOpt.server, { '/js': './src-docs/js', '/css': './src-docs/css' });
}
if (existsSync(join(__dirname, 'test'))) {
  bsOpt.server = Object.assign(bsOpt.server, { '/js': './test/js', '/css': './test/css' });
}
if (existsSync(join(__dirname, 'tests'))) {
  bsOpt.server = Object.assign(bsOpt.server, { '/js': './tests/js', '/css': './tests/css' });
}
bs.init(bsOpt);

// since `nodemon` file watcher and `browsersync` are annoying let's make `gulp` shine
[join(__dirname, 'test'), join(__dirname, 'src-docs'), join(__dirname, 'dist')]
  .filter((path) => existsSync(path))
  .forEach((cwd) => {
    gulp.watch(['**/*.*'], { cwd }, bs.reload);
  });

gulp.watch(
  ['src/*.ts', 'webpack.*.js', '{tsconfig,package}*.json', '*.md', '!src-docs', '!tmp', '!dist', '!release', '!docs'],
  { cwd: __dirname },
  (done) => {
    buildDocs(null, null, done);
  }
);
