const gulp = require('gulp');
const parser = require('hexo-post-parser');
const path = require('path');
const { copyPosts } = require('static-blog-generator/dist/src/gulp/tasks/copy');

gulp.task('hexo:copy', async function () {
  copyPosts(null, 'Tests/shortcodes');
});
