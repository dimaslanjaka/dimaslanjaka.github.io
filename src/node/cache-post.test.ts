import { join } from 'upath';
import CachePost, {
  getAllPosts,
  getLatestPosts,
  getRandomPosts
} from './cache-post';
import { write } from './filemanager';

const cache = new CachePost();
console.log(cache.getAll('value'));

function _original() {
  const all = getAllPosts();
  console.log('all posts', all.length);

  const random = getRandomPosts(5, 'center');
  console.log('random posts', random.length);

  const latest = getLatestPosts('-date', 5).map((post) => {
    if (post.body) post.body = 'deleted';
    if (post.content) post.content = 'deleted';
    if (post.config) post.config = {};
    return post;
  });
  console.log('latest posts', latest.length);
  write(join(__dirname, 'tmp/latest.json'), latest);
}
