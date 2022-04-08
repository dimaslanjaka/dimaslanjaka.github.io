import CachePost from '../../node/cache-post';

const posts = new CachePost();
const all = posts.getAll();
console.log('total posts', all.length);
