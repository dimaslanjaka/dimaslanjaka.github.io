import { parsePostReturn } from '../markdown/transformPosts';
import CacheFile, { defaultResovableValue } from './cache';

type postResult = parsePostReturn & parsePostReturn['metadata'];

export default class CachePost extends CacheFile {
  private key = 'posts';
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
    const posts: parsePostReturn[] = new CacheFile(this.key).getValues();
    return posts
      .sort((a, b) => {
        const c = new Date(a.metadata[by]);
        const d = new Date(b.metadata[by]);
        if (c < d) return 1;
        if (c > d) return -1;
        return 0;
      })
      .splice(0, max)
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
    return new CacheFile(this.key).getValues(opt) as parsePostReturn[];
  }
}

export const Post = CachePost;
