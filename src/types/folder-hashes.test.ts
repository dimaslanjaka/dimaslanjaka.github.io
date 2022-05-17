import Bluebird from 'bluebird';
import { get_source_hash, get_src_posts_hash } from './folder-hashes';

Bluebird.all([get_src_posts_hash(), get_source_hash()]).spread((src_posts, source) => {
  console.log(src_posts, source);
});
