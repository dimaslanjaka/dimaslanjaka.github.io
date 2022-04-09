import Bluebird from 'bluebird';
import { parsePostReturn } from '../../markdown/transformPosts';
import CachePost from '../../node/cache-post';
import { cwd, join } from '../../node/filemanager';
import config from '../../types/_config';

const posts = new CachePost();
const generated_tag_dir = join(cwd(), config.public_dir, config.tag_dir);
const all = Bluebird.all(posts.getAll());
/** all generated tags dir */
type ArcivePost = parsePostReturn & {
  tag_dir: string;
};
const tag_posts: { [key: string]: ArcivePost[] } = {};

all
  .each((post: ArcivePost) => {
    if (post.metadata.tags.length) {
      post.metadata.tags.removeEmpties().forEach((tag) => {
        // setup tag dir
        const tag_dir = join(generated_tag_dir, tag);
        post.tag_dir = tag_dir;
        // initialize index tag if not exist
        if (!tag_posts[tag]) tag_posts[tag] = [];
        // push prevent duplicate object
        if (!tag_posts[tag].find(({ metadata }) => metadata.title === post.metadata.title)) tag_posts[tag].push(post);
      });
    }
  })
  .then(() => {
    console.log('total tags', Object.keys(tag_posts).length);
  });
