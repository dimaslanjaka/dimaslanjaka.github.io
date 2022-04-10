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

const posts = new CachePost();
const generated_tag_dir = join(cwd(), config.public_dir, config.tag_dir);
const homepage = new URL(config.url);
const all = Bluebird.all(posts.getAll());
/** all generated tags dir */
type ArchivePost = {
  tag_dir: string;
  title?: string;
  thumbnail?: string;
  url?: string;
  excerpt?: string;
};

export function generateArchive(done?: TaskCallback) {
  const tag_posts: { [key: string]: ArchivePost[] } = {};

  all
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
    })
    .then(() => {
      console.log('total tags', Object.keys(tag_posts).length);
      for (const tagname in tag_posts) {
        if (Object.prototype.hasOwnProperty.call(tag_posts, tagname)) {
          const posts = tag_posts[tagname];
          const tagPermalink = join(generated_tag_dir, tagname, 'index.html');
          homepage.pathname = join(config.tag_dir, 'index.html');

          const opt: parsePostReturn = {
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
            sitedata: JSON.stringifyWithCircularRefs(posts),
            body: '',
            content: '',
            fileTree: {
              source: tagPermalink,
              public: join(tmp(), tagPermalink),
            },
          };
          const mod = modifyPost(opt);
          renderer(mod).then((rendered) => {
            write(tagPermalink, rendered).then((f) => console.log('tag generated', f));
          });
        }
      }
    })
    .finally(() => done());
}

gulp.task('generate:archive', generateArchive);
