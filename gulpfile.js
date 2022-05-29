const gulp = require('gulp');
const parser = require('hexo-post-parser');
const path = require('path');

gulp.task('copy', async function () {
  await parser.parsePost(
    path.join(__dirname, 'src-posts/Tests/shortcodes.md'),
    {
      cache: false,
      fix: true
    }
  );
});
