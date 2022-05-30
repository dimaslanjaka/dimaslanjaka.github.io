const gulp = require('gulp');
const { copyPosts, clean_posts } = require('static-blog-generator');

gulp.task('hexo:copy', async function (done) {
  copyPosts(done, 'Tests/shortcodes');
});

gulp.task('hexo:clean', async function (done) {
  clean_posts(done)
});
