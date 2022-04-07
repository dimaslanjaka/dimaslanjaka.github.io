import { parsePostReturn } from '../markdown/transformPosts';
import CacheFile from './cache';

const postCache = new CacheFile('posts');

export default class CachePost extends CacheFile {
  constructor() {
    super('posts');
  }
  /**
   * get latest posts
   * @param by order descending by `date` or `updated`
   * @param max max result
   * @returns array of {@link parsePostReturn}
   */
  getLatest(by: 'date' | 'updated' = 'updated', max = 5) {
    const posts: parsePostReturn[] = postCache.getValues();
    return posts
      .sort((a, b) => {
        const c = new Date(a.metadata[by]);
        const d = new Date(b.metadata[by]);
        if (c < d) return 1;
        if (c > d) return -1;
        return 0;
      })
      .splice(0, max);
  }
}

export const Post = CachePost;
