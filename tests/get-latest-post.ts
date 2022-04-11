import CachePost from '../src/node/cache-post';
const postCache = new CachePost();
const latest = postCache.getLatestPosts().map((data) => data.metadata);
console.log(latest);
