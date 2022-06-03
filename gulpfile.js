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
  parsePost
} = require('static-blog-generator');
initGulp({
  copyPosts,
  clean_tmp,
  clean_db,
  clean_posts,
  copyAssets,
  parsePost
});

gulp.task('hexo:copy', async () => {
  const source = joi;
});

/**
 * initialize gulp
 * @param {import('static-blog-generator')} ins
 */
function initGulp(ins = {}) {
  gulp.task('hexo:clean', async () => task_clean(ins));
}

/**
 * copy task
 * @param {import('static-blog-generator')} ins
 */
function task_copy(ins = {}) {
  const assets = ins.copyAssets();
  if (!('then' in assets)) {
    // copyPosts(null, 'Tests/shortcodes');
    ins.copyPosts(null, null);
  }
}

/**
 * clean task
 * @param {import('static-blog-generator')} ins
 */
function task_clean(ins = {}) {
  ins.clean_posts();
  ins.clean_tmp();
  ins.clean_db();
}
