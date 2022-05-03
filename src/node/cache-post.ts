import modifyPost from '../markdown/transformPosts/modifyPost';
import { postMap } from '../markdown/transformPosts/parsePost';
import CacheFile, { defaultResovableValue } from './cache';
import config from '../types/_config';
import memoizer from './memoize-fs';
import { mergedPostMap } from '../markdown/transformPosts/postMapper';

export type postResult = mergedPostMap;
const postCache = new CacheFile('posts');

/**
 * fix post
 * @param post
 * @returns
 */
function fixPost(post: postMap) {
  if (typeof post.metadata.url == 'string') {
    const url = new URL(post.metadata.url);
    if (url.pathname.isMatch(/.md$/)) {
      url.pathname = url.pathname.replace(/.md$/, '.html');
    }
    post.metadata.url = String(url);
  }
  return post;
}

/**
 * order array
 * @param array
 * @param by
 * @returns
 */
function order_by(array: postMap[], by: 'updated' | 'date' | '-updated' | '-date' | string) {
  if (Array.isArray(array)) {
    return array
      .filter((post) => post && typeof post.metadata == 'object')
      .sort((a, b) => {
        const modby = by.replace('-', '');
        /*try {

      } catch (error) {
        if (error instanceof Error) console.log('cache-post.ts#order_by', error.message);
      }*/
        const c = new Date(a.metadata[modby]);
        const d = new Date(b.metadata[modby]);
        if (by.startsWith('-')) {
          // descending
          if (c < d) return 1;
          if (c > d) return -1;
        } else {
          if (c > d) return 1;
          if (c < d) return -1;
        }
        return 0;
      });
  }
  return array;
}

/**
 * get latest posts
 * @param by order descending by `date` or default (`index_generator.order_by` in `_config.yml`)
 * @param max max result
 * @returns array of {@link postResult}
 */
export function getLatestPosts(by: 'date' | 'updated' = 'updated', max = 5): postResult[] {
  const posts: postMap[] = getAllPosts({ max: max, resolveValue: true });
  return order_by(posts, by)
    .removeEmpties()
    .splice(0, max)
    .map((post) => fixPost(post))
    .map((post) => {
      return Object.assign(post, post.metadata);
    });
}

/**
 * get all posts
 * @param opt {@link defaultResovableValue}
 * @returns array of posts {@link CacheFile.getValues}
 */
export function getAllPosts(opt = defaultResovableValue) {
  if (postCache.getTotal() < 1) return [];
  return order_by(postCache.getValues(opt), config.index_generator.order_by)
    .filter((post: postMap) => post && post.metadata.type == 'post')
    .map((post) => modifyPost(post))
    .map((post) => fixPost(post));
}

/**
 * get total posts (no page)
 * @returns
 */
export function getTotalPosts() {
  return getAllPosts().length;
}

const randoms: { [key: string]: postResult[] } = {};

/**
 * get random posts
 * @param max max results
 * @param identifier cached result
 * @returns
 */
export function getRandomPosts(max = 5, identifier = 'default') {
  const result = randoms[identifier];
  if (Array.isArray(result) && result.length > 0) return result;
  const opt = defaultResovableValue;
  defaultResovableValue.randomize = true;
  defaultResovableValue.max = max;
  const get: () => postResult[] = (() => {
    const fetchAll = () => {
      return getAllPosts(opt)
        .removeEmpties()
        .splice(0, max)
        .map((post) => fixPost(post))
        .map((post) => {
          return Object.assign(post, post.metadata);
        });
    };
    if (config.generator.cache) {
      return new memoizer().fn(() => {
        return fetchAll();
      });
    } else {
      return fetchAll;
    }
  })();
  randoms[identifier] = get();
  return randoms[identifier];
}

export default class CachePost extends CacheFile {
  constructor() {
    super('posts');
  }
}

export const Post = CachePost;
