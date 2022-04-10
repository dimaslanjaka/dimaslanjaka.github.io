import { parsePostReturn } from '../markdown/transformPosts';
import CacheFile, { defaultResovableValue } from './cache';

type postResult = parsePostReturn & parsePostReturn['metadata'];

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
    const posts: parsePostReturn[] = new CacheFile('posts').getValues();
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
      .map((post) => new CachePost().fixPost(post))
      .map((post) => {
        return Object.assign(post, post.metadata);
      });
  }

  /**
   * fix post
   * @param post
   * @returns
   */
  fixPost(post: parsePostReturn) {
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
   * get all posts
   * @param opt {@link defaultResovableValue}
   * @returns array of posts {@link CacheFile.getValues}
   */
  getAll(opt = defaultResovableValue) {
    return new CacheFile('posts')
      .getValues(opt)
      .filter((post) => post.metadata.type == 'post')
      .map((post) => new CachePost().fixPost(post));
  }
}

export const Post = CachePost;
