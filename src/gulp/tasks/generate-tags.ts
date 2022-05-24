import gulp from 'gulp';
import { Nullable } from 'safelinkify/dist/resolveQueryUrl';
import { excerpt } from '../../ejs/helper/excerpt';
import { thumbnail } from '../../ejs/helper/thumbnail';
import CacheFile from '../../node/cache';
import color from '../../node/color';
import { cwd, join, write } from '../../node/filemanager';
import modifyPost from '../../parser/post/modifyPost';
import { postMap } from '../../parser/post/parsePost';
import postChunksIterator from '../../parser/post/postChunksIterator';
import {
  array_wrap,
  post_chunks,
  simplifyDump
} from '../../parser/post/postMapper';
import config, { tmp } from '../../types/_config';
import { renderer } from './generate-posts';

const cacheTags = new CacheFile('postTags');

/**
 * generate tags archive
 * @param labelname specific tag name
 * @param pagenum specific page number
 */
export default async function generateTags(
  labelname?: string | null,
  pagenum?: number
): Promise<Nullable<string>> {
  const tag_posts: { [key: string]: postMap[] } = cacheTags.getAll();
  for (const tagname in tag_posts) {
    if (Object.prototype.hasOwnProperty.call(tag_posts, tagname)) {
      // specific tag label otherwise skip
      if (labelname && tagname.toLowerCase() !== labelname.toLowerCase())
        continue;
      // skip non array
      if (!tag_posts[tagname] || !Array.isArray(tag_posts[tagname])) continue;
      const logname =
        color['Desert Sand']('[generate][tag]') +
        color['Wild Blue Yonder'](`[${tagname}]`);
      const treeChunks = post_chunks(tag_posts[tagname]);
      const parentChunks = treeChunks.chunk;

      for (
        let current_page = 0;
        current_page < parentChunks.length;
        current_page++
      ) {
        // @todo check specific page number is set, otherwise skip
        if (typeof pagenum == 'number' && current_page !== pagenum) continue;
        const innerChunks = array_wrap(parentChunks[current_page]);
        const data = postChunksIterator(innerChunks, {
          current_page: current_page,
          base: join(config.tag_dir, tagname),
          parentChunks,
          treeChunks
        });
        const saveTo = join(
          cwd(),
          config.public_dir,
          data.perm_current,
          'index.html'
        );
        const pagemeta: postMap = {
          metadata: {
            title: 'Tag: ' + tagname,
            description: excerpt(config),
            date: data.latestUpdated,
            updated: data.latestUpdated,
            cover: thumbnail(data.posts[0]),
            category: [],
            tags: [],
            type: 'archive'
          },
          body: '',
          content: '',
          fileTree: {
            source: null,
            public: null
          }
        };
        if (current_page > 0) {
          pagemeta.metadata.title = 'Tag: ' + tagname + ' Page ' + current_page;
        }
        const merge_data = Object.assign(pagemeta, data);
        const pagedata = modifyPost(merge_data);
        const rendered = await renderer(<any>pagedata);
        const f = await write(saveTo, rendered);
        console.log(logname, f);

        if (config.verbose) {
          write(
            tmp('generateTags', data.perm_current + '.log'),
            simplifyDump(pagedata)
          );
        }
        if (labelname) return rendered;
      }
    }
  }
  return null;
}

gulp.task('generate:tags', () => generateTags());
