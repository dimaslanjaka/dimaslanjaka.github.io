require('ts-node').register({
  /* options */
});
const gulp = require('gulp');
const dev = false;
if (dev) {
  process.cwd = () => __dirname;
}

if (!dev) {
  const {
    copyPosts,
    clean_tmp,
    clean_db,
    clean_posts,
    copyAssets
  } = require('./packages/static-blog-generator/dist/src');
  // require('static-blog-generator');
  // require('./packages/static-blog-generator/dist/src');
  initGulp({
    copyPosts,
    clean_tmp,
    clean_db,
    clean_posts,
    copyAssets
  });
} else {
  const {
    copyPosts,
    clean_tmp,
    clean_db,
    clean_posts,
    copyAssets
  } = require('./packages/static-blog-generator/src');
  initGulp({
    copyPosts,
    clean_tmp,
    clean_db,
    clean_posts,
    copyAssets
  });
}

function initGulp(ins = {}) {
  gulp.task('hexo:copy', async () => task_copy(ins));

  gulp.task('hexo:clean', async () => task_clean(ins));
}

function task_copy(ins = {}) {
  const assets = ins.copyAssets();
  if (!('then' in assets)) {
    // copyPosts(null, 'Tests/shortcodes');
    ins.copyPosts(null, null);
  }
}

function task_clean(ins = {}) {
  ins.clean_posts();
  ins.clean_tmp();
  ins.clean_db();
}
