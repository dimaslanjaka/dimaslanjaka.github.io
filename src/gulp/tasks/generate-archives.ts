import Bluebird from 'bluebird';
import moment from 'moment';
import { thumbnail } from '../../ejs/helper/thumbnail';
import { parsePostReturn } from '../../markdown/transformPosts';
import CachePost from '../../node/cache-post';
import { cwd, join, write } from '../../node/filemanager';
import config, { tmp } from '../../types/_config';
import 'js-prototypes';
import { modifyPost } from './copy';
import { renderer } from './generate';
import { TaskCallback } from 'undertaker';
import gulp from 'gulp';
import { excerpt } from '../../ejs/helper/excerpt';
import color from '../../node/color';

const postCache = new CachePost();
const generated_tag_dir = join(cwd(), config.public_dir, config.tag_dir);
const generated_cat_dir = join(cwd(), config.public_dir, config.category_dir);
const homepage = new URL(config.url);
const logname = color['Piggy Pink']('[archive]');

/** all generated tags dir */
type ArchivePost = {
  cat_dir?: string;
  tag_dir?: string;
  title?: string;
  thumbnail?: string;
  url?: string;
  excerpt?: string;
};

interface Archives {
  [key: string]: ArchivePost[];
}

export async function generateArchive(done?: TaskCallback) {
  const tag_posts: Archives = {};
  const cat_posts: Archives = {};
  await Bluebird.all(postCache.getAll())
    .filter((item) => {
      if (!item) return false;
      if (!item.metadata) return false;
      return true;
    })
    .each((post: parsePostReturn) => {
      if (post.metadata.tags.length) {
        post.metadata.tags.removeEmpties().forEach((tag) => {
          // setup tag dir
          const tag_dir = join(generated_tag_dir, tag);
          const buildPost: ArchivePost = {
            tag_dir: tag_dir,
            title: post.metadata.title,
            thumbnail: thumbnail(post.metadata),
            url: post.metadata.url,
            excerpt: excerpt(post.metadata),
          };

          // initialize index tag if not exist
          if (!tag_posts[tag]) tag_posts[tag] = [];
          // push prevent duplicate object
          if (!tag_posts[tag].find(({ title }) => title === post.metadata.title)) tag_posts[tag].push(buildPost);
        });
      }
      if (post.metadata.category.length) {
        post.metadata.category.removeEmpties().forEach((cat) => {
          // setup tag dir
          const cat_dir = join(generated_cat_dir, cat);
          const buildPost_1: ArchivePost = {
            cat_dir: cat_dir,
            title: post.metadata.title,
            thumbnail: thumbnail(post.metadata),
            url: post.metadata.url,
            excerpt: excerpt(post.metadata),
          };

          // initialize index tag if not exist
          if (!cat_posts[cat]) cat_posts[cat] = [];
          // push prevent duplicate object
          if (!cat_posts[cat].find(({ title: title_1 }) => title_1 === post.metadata.title)) cat_posts[cat].push(buildPost_1);
        });
      }
    });
  const genTag = () => {
    const keys = Object.keys(tag_posts);
    console.log('total tags', keys.length);
    return Bluebird.all(keys).each((tagname) => {
      const posts = tag_posts[tagname];
      const tagPermalink = join(generated_tag_dir, tagname, 'index.html');
      homepage.pathname = join(config.tag_dir, 'index.html');

      const opt_1: parsePostReturn = {
        metadata: {
          title: 'Tag: ' + tagname,
          subtitle: 'Tag: ' + tagname + ' ' + new URL(config.url).host,
          date: moment().format(),
          updated: moment().format(),
          category: [],
          tags: [],
          type: 'archive',
          url: homepage.toString(),
        },
        /** setup sitedata array as json */
        sitedata: JSON.stringify(posts),
        body: '',
        content: '',
        fileTree: {
          source: tagPermalink,
          public: join(tmp(), tagPermalink),
        },
      };
      const mod = modifyPost(opt_1);
      renderer(mod).then((rendered) => {
        write(tagPermalink, rendered).then((f) => console.log(logname, 'tag', f));
      });
    });
  };
  const genCat = () => {
    const keys = Object.keys(cat_posts);
    console.log('total categories', keys.length);
    return Bluebird.all(keys).each((catname) => {
      const posts_1 = cat_posts[catname];
      const catPermalink = join(generated_cat_dir, catname, 'index.html');
      homepage.pathname = join(config.category_dir, 'index.html');

      const opt_2: parsePostReturn = {
        metadata: {
          title: 'Category: ' + catname,
          subtitle: 'Category: ' + catname + ' ' + new URL(config.url).host,
          date: moment().format(),
          updated: moment().format(),
          category: [],
          tags: [],
          type: 'archive',
          url: homepage.toString(),
        },
        /** setup sitedata array as json */
        sitedata: JSON.stringify(posts_1),
        body: '',
        content: '',
        fileTree: {
          source: catPermalink,
          public: join(tmp(), catPermalink),
        },
      };
      const mod_1 = modifyPost(opt_2);

      renderer(mod_1).then((rendered_1) => {
        write(catPermalink, rendered_1).then((f_1) => {
          console.log(logname, 'category', f_1);
        });
      });
    });
  };
  await genTag();
  await genCat();
  if (typeof done == 'function') done();
}

export async function generateIndex(done?: TaskCallback) {
  try {
    const posts = await Bluebird.all(postCache.getAll()).filter((item) => {
      if (!item) return false;
      if (!item.metadata) return false;
      return true;
    });
    homepage.pathname = '/index.html';
    const indexPermalink = join(config.public_dir, 'index.html');
    const sitedata = posts.map((post) => {
      const buildPost = { title: post.metadata.title, thumbnail: thumbnail(post.metadata), url: post.metadata.url, excerpt: excerpt(post.metadata) };
      return buildPost;
    });
    const opt: parsePostReturn = {
      metadata: {
        title: 'Homepage',
        subtitle: excerpt(<any>config),
        date: moment().format(),
        updated: moment().format(),
        category: [],
        tags: [],
        type: 'archive',
        url: homepage.toString(),
      },
      /** setup sitedata array as json */
      sitedata: JSON.stringify(sitedata),
      body: '',
      content: '',
      fileTree: {
        source: indexPermalink,
        public: join(tmp(), 'index.html'),
      },
    };
    const mod = modifyPost(opt);
    return renderer(mod).then(async (rendered) => {
      const f = await write(indexPermalink, rendered);
      console.log(logname, 'index', f);
      if (typeof done == 'function') done();
    });
  } catch (e) {
    console.log(e);
  }
}

gulp.task('generate:index', generateIndex);
gulp.task('generate:label', generateArchive);
gulp.task('generate:archive', gulp.series('generate:index', 'generate:label'));
