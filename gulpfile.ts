import Bluebird from 'bluebird';
import { create as createServer } from 'browser-sync';
import { ChildProcess } from 'child_process';
import spawn from 'cross-spawn';
import gulp from 'gulp';
import { cwd, join } from './src/node/filemanager';
import ServerMiddleWare from './src/gulp/server/middleware';
import config from './src/types/_config';
import 'js-prototypes';
import './src/generator';

const browserSync = createServer();
gulp.task('server', function () {
  const bsi = browserSync.init({
    server: './' + config.public_dir,
    port: config.server.port,
    open: false,
    middleware: ServerMiddleWare,
  });

  // handling spawner to reduce memory usages
  const childs: { [key: string]: ChildProcess[] } = {
    generate: [],
    copy: [],
  };
  // watch changes on source dir
  gulp.watch(join(config.source_dir, '.guid'), function (cb) {
    Bluebird.all(childs.generate)
      .map((child) => {
        if (!child.killed) child.kill('SIGKILL');
      })
      .then(() => {
        const child = spawn('gulp', ['generate', '--nocache'], { cwd: cwd(), stdio: 'inherit' });
        childs.generate.push(child);
      })
      .finally(cb);
  });
  // watch changes on src-posts
  gulp.watch(join(__dirname, 'src-posts', '.guid'), function (cb) {
    Bluebird.all(childs.copy)
      .map((child) => {
        if (!child.killed) child.kill('SIGKILL');
      })
      .then(() => {
        const child = spawn('gulp', ['copy', '--nocache'], { cwd: cwd(), stdio: 'inherit' });
        childs.copy.push(child);
      })
      .finally(cb);
  });
  // watch public dir/.guid to reload browsersync
  //gulp.watch(join(config.public_dir, '.guid')).on('change', browserSync.reload);
  return Promise.resolve(bsi);
});
