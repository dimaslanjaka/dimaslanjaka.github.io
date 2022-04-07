import CachePost from '../src/node/cache-post';
const postCache = new CachePost();
const latest = postCache.getLatest().map((data) => data.metadata);
console.log(latest);
