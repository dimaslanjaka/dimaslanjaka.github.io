import { modifyPost } from '../markdown/transformPosts/modifyPost';
import { parsePostReturn } from '../markdown/transformPosts';
import CacheFile, { defaultResovableValue } from './cache';
import memoize from 'memoizee';
import config from '../types/_config';

type postResult = parsePostReturn & parsePostReturn['metadata'];

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

export default class CachePost extends CacheFile {
  constructor() {
    super('posts');
  }

  /**
   * order array
   * @param array
   * @param by
   * @returns
   */
  private order_by(array: any[], by: 'updated' | 'date' | '-updated' | '-date' | string) {
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
  getLatestPosts(by: 'date' | 'updated' = 'updated', max = 5): postResult[] {
    const posts: parsePostReturn[] = this.getAll({ max: max, resolveValue: true });
    return this.order_by(posts, by)
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
  getAll(opt = defaultResovableValue) {
    return this.order_by(this.getValues(opt), config.index_generator.order_by)
      .filter((post: parsePostReturn) => post && post.metadata.type == 'post')
      .map((post) => modifyPost(post))
      .map((post) => fixPost(post));
  }

  /**
   * get random posts
   * @param max max results
   * @returns
   */
  getRandomPosts(max = 5) {
    const opt = defaultResovableValue;
    defaultResovableValue.randomize = true;
    defaultResovableValue.max = max;
    return this.getAll(opt)
      .removeEmpties()
      .splice(0, max)
      .map((post) => fixPost(post))
      .map((post) => {
        return Object.assign(post, post.metadata);
      });
  }

  /**
   * ejs interopability helpers
   */
  static ejs = class {
    getLatestPosts = memoize(new CachePost().getLatestPosts.bind(new CacheFile('posts')));
    getRandomPosts = memoize(new CachePost().getRandomPosts.bind(new CacheFile('posts')));
    getAll = memoize(new CachePost().getAll.bind(new CacheFile('posts')));
  };
}

export const Post = CachePost;
