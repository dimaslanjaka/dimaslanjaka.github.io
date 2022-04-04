import Cache from '../node/cache';
import uuidv4, { makeid } from '../node/uuid';

console.clear();

const cache = new Cache('test', { sync: true });
cache.clear();
const keys = ['key-' + makeid(1).repeat(10), 'test', 'key', 'test-key']; //.add(Math.round(Math.random()).toFixed(0));
keys.forEach((key) => {
  const val = uuidv4();
  cache.set(key, val);
  console.log('get-dump', cache.dump(key));
  console.log('exists', cache.has(key));
  console.log('get', { key: key, same: cache.get(key, 'undefined key') === val, val: cache.get(key, 'undefined key') });
});
