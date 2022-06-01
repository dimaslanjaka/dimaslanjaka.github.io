const gulp = require('gulp');
const { copyPosts, clean_posts, copyAssets } = require('./packages/static-blog-generator/dist/src');

gulp.task('hexo:copy', async function (done) {
  const assets = copyAssets();
  if (!('then' in assets)) {
    copyPosts(done, 'Tests/shortcodes');
  }
});

gulp.task('hexo:clean', async function (done) {
  clean_posts(done);
});
