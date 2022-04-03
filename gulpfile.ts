import glob from 'glob'
import gulp from 'gulp'
import { join } from 'upath'

gulp.task('article:copy', function (done?) {
  gulp.src('**/*.md', { cwd: join(__dirname, 'src-posts') })
});
