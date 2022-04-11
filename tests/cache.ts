import chalk from 'chalk';
import CacheFile from '../src/node/cache';
import { cwd, existsSync, join, write } from '../src/node/filemanager';

const targets = ['tests/data/cache.txt'].map((s) => join(cwd(), s));
targets.forEach((item) => {
  if (existsSync(item)) write(item, '');
});

/**
 * key cache
 */
const target = targets[0];

console.log('cache key', target);
/**
 * value to save, random number 0-n
 */
const data = Math.floor(Math.random() * 3);

//// check first unchanged
const cache = new CacheFile('tests');
let isChanged = false;
if (!cache.has(target)) {
  console.log('1. new cache with value', data);
  cache.set(target, data);
} else {
  isChanged = cache.isFileChanged(target);
  console.log('1. is file changed', isChanged);
}
const prev_data = cache.get(target);
console.log('1.1 old data', chalk.green(prev_data));
console.log('-'.repeat(32));
//// change data
write(target, data);
isChanged = cache.isFileChanged(target);
if (isChanged) {
  console.log(chalk.redBright('data is changed'), 'set', prev_data, '->', data);
  cache.set(target, data);
}
console.log('2. is file changed', isChanged);
console.log('2.1 new data', chalk.greenBright(cache.get(target)));
console.log('-'.repeat(32));
