import { getRandomPosts } from './cache-post';

const result = getRandomPosts(5, 'center');
console.log(result.length);
