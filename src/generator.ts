import gulp from 'gulp';
import './gulp/server';
import './gulp/tasks/clean';
import './gulp/tasks/copy';
import './gulp/tasks/deploy';
import './gulp/tasks/dump';
import './gulp/tasks/generate';
import scheduler from './node/scheduler';

// register scheduler
new scheduler();

gulp.task('default', gulp.series('copy', 'generate'));

/**
 * @see {@link https://stackoverflow.com/a/67394338/6404439}
 */
process.on('uncaughtException', function (err) {
  console.error('uncaughtException:\n' + err.stack + '\n');
});
