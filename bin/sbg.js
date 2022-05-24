const yargs = require('yargs');
const argv = yargs(process.argv.slice(2)).argv;
const cache =
  typeof argv['nocache'] !== 'undefined' && argv['nocache'] ? false : true;
const config = require('../build/src/types/_config');
config.cache = cache;

const { copy_assets } = require('../build/src/gulp/tasks/copy/assets');
const { copy_posts } = require('../build/src/gulp/tasks/copy');
const {
  gulpInlineStyle
} = require('../build/src/gulp/tasks/copy/remove-inline-style');
const {
  clean_public,
  clean_posts,
  clean_db,
  clean_tmp
} = require('../build/src/gulp/tasks/clean');
/**
 * @type {string[]}
 */
const args = argv._;
const task = {
  copy: {
    assets: copy_assets,
    remove_inline_style: gulpInlineStyle,
    post: copy_posts
  },
  clean: {
    public: clean_public,
    db: clean_db,
    tmp: clean_tmp,
    posts: clean_posts
  }
};
args
  .map((s) => {
    const split = s.split(':');
    if (split.length === 1) return split[0];
    return split[1];
  })
  .forEach((arg) => {
    if (arg === 'blogger') {
      task.copy.assets();
      task.copy.post();
      task.copy.remove_inline_style();
    }
  });
