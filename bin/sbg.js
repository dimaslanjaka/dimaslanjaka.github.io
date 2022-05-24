const yargs = require('yargs');
const argv = yargs(process.argv.slice(2)).argv;
const cache =
  typeof argv['nocache'] !== 'undefined' && argv['nocache'] ? false : true;
const config = require('../build/src/types/_config');
config.cache = cache;

const { copyAssets } = require('../build/src/gulp/tasks/copy/assets');
/**
 * @type {string[]}
 */
const args = argv._;
const task = {
  copy: {
    assets: copyAssets
  }
};
args.forEach((arg) => {
  console.log(arg);
});
