const { promisify } = require('util');
const { resolve } = require('path');
const fs = require('fs');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const bluebird = require('bluebird');

/**
 * iterate dir
 * @param dir
 * @returns {Promise<string[]>}
 */
async function getFiles(dir) {
  const sibDirs = await readdir(dir);
  /**
   *
   * @type {string[]}
   */
  const files = await bluebird.all(
    sibDirs.map(async (subDir) => {
      const res = resolve(dir, subDir);
      return (await stat(res)).isDirectory() ? getFiles(res) : res;
    })
  );
  return files.reduce((a, f) => a.concat(f), []);
}

module.exports = getFiles;
