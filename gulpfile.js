const gulp = require('gulp');
const { copyPosts, clean_posts, copyAssets } = require('static-blog-generator');

gulp.task('hexo:copy', async function (done) {
  copyAssets();
  copyPosts(done, 'Tests/shortcodes');
});

gulp.task('hexo:clean', async function (done) {
  clean_posts(done)
});
