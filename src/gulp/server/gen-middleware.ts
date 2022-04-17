import { getAllPosts } from '../../node/cache-post';
import 'js-prototypes';
import config from '../../types/_config';
import { join, write } from '../../node/filemanager';

// middleware generator
const cats: string[] = [],
  tags: string[] = [];
try {
  getAllPosts().forEach((post) => {
    cats.addAll(post.metadata.category);
    tags.addAll(post.metadata.tags);
  });
} catch (error) {
  //
}
const map_tags = tags
  .removeEmpties()
  .unique()
  .map((tag) => {
    return '/' + config.tag_dir + '/' + tag;
  })
  .sort(function (a, b) {
    return a === b ? 0 : a < b ? -1 : 1;
  });
const map_cats = cats
  .removeEmpties()
  .unique()
  .map((tag) => {
    return '/' + config.category_dir + '/' + tag;
  })
  .sort(function (a, b) {
    return a === b ? 0 : a < b ? -1 : 1;
  });

write(join(__dirname, 'routes.json'), {
  tag: map_tags,
  category: map_cats,
});
