import { modifyPost } from '../markdown/transformPosts/modifyPost';
import { parsePostReturn } from '../markdown/transformPosts';
import CacheFile, { defaultResovableValue } from './cache';
import config from '../types/_config';
import memoizer, { memoizeFs } from './memoize-fs';

export type postResult = parsePostReturn & parsePostReturn['metadata'];
const postCache = new CacheFile('posts');

/**
 * fix post
 * @param post
 * @returns
 */
function fixPost(post: parsePostReturn) {
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
function order_by(array: any[], by: 'updated' | 'date' | '-updated' | '-date' | string) {
  if (Array.isArray(array))
    return array.sort((a, b) => {
      const modby = by.replace('-', '');
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

/**
 * get latest posts
 * @param by order descending by `date` or default (`index_generator.order_by` in `_config.yml`)
 * @param max max result
 * @returns array of {@link postResult}
 */
export function getLatestPosts(by: 'date' | 'updated' = 'updated', max = 5): postResult[] {
  const posts: parsePostReturn[] = getAllPosts({ max: max, resolveValue: true });
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
  return order_by(postCache.getValues(opt), config.index_generator.order_by)
    .filter((post: parsePostReturn) => post && post.metadata.type == 'post')
    .map((post) => modifyPost(post))
    .map((post) => fixPost(post));
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
  const get = new memoizer().fn((id: string) => {
    const result = getAllPosts(opt)
      .removeEmpties()
      .splice(0, max)
      .map((post) => fixPost(post))
      .map((post) => {
        return Object.assign(post, post.metadata);
      });
    randoms[id] = result;
    return result;
  });
  randoms[identifier] = get(identifier);
  return randoms[identifier];
}

export default class CachePost extends CacheFile {
  constructor() {
    super('posts');
  }
}

export const Post = CachePost;
