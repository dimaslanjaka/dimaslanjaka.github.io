import { modifyPost } from '../markdown/transformPosts/modifyPost';
import { parsePostReturn } from '../markdown/transformPosts';
import CacheFile, { defaultResovableValue } from './cache';

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
   * get latest posts
   * @param by order descending by `date` or default `updated`
   * @param max max result
   * @returns array of {@link postResult}
   */
  getLatestPosts(by: 'date' | 'updated' = 'updated', max = 5): postResult[] {
    const posts: parsePostReturn[] = this.getValues({ max: max, resolveValue: true });
    return posts
      .filter((post) => post.metadata.type == 'post')
      .sort((a, b) => {
        const c = new Date(a.metadata[by]);
        const d = new Date(b.metadata[by]);
        if (c < d) return 1;
        if (c > d) return -1;
        return 0;
      })
      .splice(0, max)
      .removeEmpties()
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
    return this.getValues(opt)
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
    return this.getValues(opt)
      .filter((post) => post.metadata.type == 'post')
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
    getLatestPosts = new CachePost().getLatestPosts.bind(new CacheFile('posts'));
    getRandomPosts = new CachePost().getRandomPosts.bind(new CacheFile('posts'));
    getAll = new CachePost().getAll.bind(new CacheFile('posts'));
  };
}

export const Post = CachePost;
