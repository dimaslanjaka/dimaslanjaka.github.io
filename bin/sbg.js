const yargs = require('yargs');
const argv = yargs(process.argv.slice(2)).argv;
const cache =
  typeof argv['nocache'] !== 'undefined' && argv['nocache'] ? false : true;
const config = require('../build/src/types/_config');
config.cache = cache;
const gulp = require('../build/gulpfile'); //require('gulp');
/*
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
*/

/**
 * @type {string[]}
 */
const args = argv._;
/*const task = {
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
args.forEach((arg) => {
  const split = arg.split(':');
  const main = split[0];
  const sub = split.length > 1 ? split[1] : null;
  console.log(main, sub);
  gulp.series(arg)(null);
  if (sub === 'blogger') {
    task.copy.assets().once('end', () => {
      task.copy.post().once('end', () => {
        task.copy.remove_inline_style();
      });
    });
  }
});
*/

const run = () =>
  gulp.series(args[0])(() => {
    args.shift();
    run();
  });
run();
