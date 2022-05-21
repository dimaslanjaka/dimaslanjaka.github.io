import { join } from 'upath';
import { arrayAddAll, array_unique, removeEmpties } from '../../node/array-utils';
import { getAllPosts } from '../../node/cache-post';
import { write } from '../../node/filemanager';
import config from '../../types/_config';

// middleware generator
const cats: string[] = [],
  tags: string[] = [];
try {
  getAllPosts().forEach((post) => {
    arrayAddAll(cats, post.metadata.category);
    arrayAddAll(tags, post.metadata.tags);
  });
} catch (error) {
  //
}
const map_tags = array_unique(removeEmpties(tags))
  .map((tag) => {
    return '/' + config.tag_dir + '/' + tag;
  })
  .sort(function (a, b) {
    return a === b ? 0 : a < b ? -1 : 1;
  });
const map_cats = array_unique(removeEmpties(cats))
  .map((tag) => {
    return '/' + config.category_dir + '/' + tag;
  })
  .sort(function (a, b) {
    return a === b ? 0 : a < b ? -1 : 1;
  });

write(join(__dirname, 'routes.json'), {
  tag: map_tags,
  category: map_cats
});
