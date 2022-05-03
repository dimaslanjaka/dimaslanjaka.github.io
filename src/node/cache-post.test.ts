import { getAllPosts, getRandomPosts } from './cache-post';

const all = getAllPosts();
console.log('all posts', all.length);

const random = getRandomPosts(5, 'center');
console.log('random posts', random.length);
