const gulp = require('gulp');
const { copyPosts } = require('static-blog-generator');

gulp.task('hexo:copy', async function () {
  copyPosts(null, 'Tests/shortcodes');
});
