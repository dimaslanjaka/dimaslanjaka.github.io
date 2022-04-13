import { getAllPosts } from '../../node/cache-post';
import 'js-prototypes';
import config from '../../types/_config';
import { join, write } from '../../node/filemanager';

// middleware generator
const cats: string[] = [],
  tags: string[] = [];
getAllPosts().forEach((post) => {
  cats.addAll(post.metadata.category);
  tags.addAll(post.metadata.tags);
});
const map_tags = tags
  .removeEmpties()
  .unique()
  .map((tag) => {
    return '/' + config.tag_dir + '/' + tag;
  });
const map_cats = cats
  .removeEmpties()
  .unique()
  .map((tag) => {
    return '/' + config.category_dir + '/' + tag;
  });

write(join(__dirname, 'routes.json'), {
  tag: map_tags,
  category: map_cats,
});
