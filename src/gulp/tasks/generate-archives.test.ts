import { write } from '../../node/filemanager';
import MeasureTime from '../../node/measure-timing';
import { post_chunks } from '../../parser/post/postMapper';
import { tmp } from '../../types/_config';
import { generateIndex } from './generate-archives';

const measure = new MeasureTime();
measure.start();

generateIndex('homepage');
console.log(measure.end());

function debugChunks() {
  // simplify debug
  const chunks = post_chunks();
  chunks[0].map((post) => {
    delete post.body;
    delete post.content;
    delete post.config;
    post.next = null;
    post.prev = null;
  });
  write(tmp('chunks', 'posts.log'), JSON.stringify(chunks[0], null, 4))
    .then(console.log)
    .then(() => console.log(measure.end()));
}
