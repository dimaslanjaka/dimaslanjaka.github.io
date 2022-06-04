process.cwd = () => __dirname;
require('ts-node').register({
  /* options */
});
const gulp = require('gulp');
const {
  copyPosts,
  clean_tmp,
  clean_db,
  clean_posts,
  copyAssets,
  parsePost,
  getConfig
} = require('static-blog-generator');
const { join } = require('path');

async function copy() {
  const config = getConfig();
  const source = join(__dirname, config.source_dir);
  copyAssets();
  copyPosts(null, null, { shortcodes: { codeblock: false } });
}

async function task_clean() {
  clean_posts();
  clean_tmp();
  clean_db();
}

gulp.task('hexo:copy', copy);
gulp.task('hexo:clean', task_clean);
