const gulp = require('gulp');
const { copyPosts } = require('static-blog-generator/dist/src/gulp/tasks/copy');

gulp.task('hexo:copy', async function () {
  copyPosts(null, 'Tests/shortcodes');
});
