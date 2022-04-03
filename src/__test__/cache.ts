import { uuidv4 } from '../markdown/transformPosts';
import Cache from '../node/cache';
import { rmdirSync } from '../node/filemanager';
import scheduler from '../node/scheduler';

new scheduler();

console.clear();
const cache = new Cache('test');

cache.set('key', uuidv4());
console.log('key exists', cache.has('key'));
console.log('get', cache.get('key', 'undefined key'));
