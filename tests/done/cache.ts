import Cache from '../../src/node/cache';
import uuidv4, { makeid } from '../../src/node/uuid';
import chai from 'chai';
const expect = chai.expect;
const should = chai.should();
const assert = chai.assert;

console.clear();

describe('parse', () => {
  const cache = new Cache('test', { sync: true });
  cache.clear();
  const keys = ['key-' + makeid(1).repeat(10), 'test', 'key', 'test-key'];
  keys.forEach((key) => {
    const val = uuidv4();
    cache.set(key, val);
    console.log('get-dump', cache.dump(key));
    console.log('exists', cache.has(key));
    console.log('get', { key: key, same: cache.get(key, 'undefined key') === val, val: cache.get(key, 'undefined key') });
  });
});
