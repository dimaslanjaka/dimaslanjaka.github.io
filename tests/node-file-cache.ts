import * as nodeFileCache from 'node-file-cache/src';
const cache = nodeFileCache.create(); // default configuration

const key = 'my-cache-key';
const item = {
  name: 'my cache item',
};
const options = {
  life: 60, // set lifespan of one minute
  tags: ['my-cache-tag', 'another-tag'],
};

//cache.set(key, item, options);

const cachedItem = cache.get(key);
console.log(cachedItem);
