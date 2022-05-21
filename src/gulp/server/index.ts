import Bluebird from 'bluebird';
import { create as createServer } from 'browser-sync';
import { ChildProcess } from 'child_process';
import { kill } from 'cross-port-killer';
import spawn from 'cross-spawn';
import gulp from 'gulp';
import memoizee from 'memoizee';
import net from 'net';
import { join, toUnix } from 'upath';
import config from '../../types/_config';
import { ServerMiddleWare } from './middleware';

const cwd = memoizee(() => toUnix(process.cwd()));
const browserSync = createServer();
const portInUse = function (port: number, callback: (arg0: boolean) => any) {
  const server = net.createServer(function (socket) {
    socket.write('Echo server\r\n');
    socket.pipe(socket);
  });

  server.on('error', function (_e) {
    callback(true);
  });
  server.on('listening', function (_e: any) {
    server.close();
    callback(false);
  });

  server.listen(port, '127.0.0.1');
};
const options = {
  server: './' + config.public_dir,
  port: config.server.port,
  open: false,
  middleware: ServerMiddleWare
};
function startServer() {
  const bsi = browserSync.init(options);

  // handling spawner to reduce memory usages
  const childs: { [key: string]: ChildProcess[] } = {
    generate: [],
    copy: []
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

  return bsi;
}

export async function localServer() {
  return portInUse(options.port, async (inuse) => {
    if (inuse) {
      const pids = await kill(options.port);
      console.log(pids, 'killed');
    }
    return startServer();
  });
}
