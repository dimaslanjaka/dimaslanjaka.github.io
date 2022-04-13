import { getLatestPosts } from '../src/node/cache-post';
const latest = getLatestPosts().map((data) => data.metadata);
console.log(latest);
