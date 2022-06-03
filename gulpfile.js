require('ts-node').register({
  /* options */
});
const gulp = require('gulp');
const dev = false;
if (dev) {
  process.cwd = () => __dirname;
}
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
  copyAssets, parsePost
});

/**
 * initialize gulp
 * @param {import('static-blog-generator')} ins
 */
function initGulp(ins = {}) {
  gulp.task('hexo:copy', async () => task_copy(ins));

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
