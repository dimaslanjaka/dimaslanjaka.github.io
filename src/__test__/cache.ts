import { uuidv4 } from '../markdown/transformPosts';
import Cache from '../node/cache';
import scheduler from '../node/scheduler';

new scheduler();

const cache = new Cache('test');
const key = uuidv4();
cache.set(key, uuidv4());
console.log('exists', cache.has(key));
console.log('get', cache.get(key, 'undefined key'));
console.log(cache);
