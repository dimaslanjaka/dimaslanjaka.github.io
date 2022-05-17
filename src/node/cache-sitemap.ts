import { postMap } from '../markdown/transformPosts/parsePost';
import CacheFile, { defaultResovableValue } from './cache';

/**
 * all sitemaps
 */
interface SitemapInfo {
  [key: string]: any;
  title?: postMap['metadata']['title'];
  date?: postMap['metadata']['date'];
  updated?: postMap['metadata']['updated'];
  excerpt?: postMap['metadata']['excerpt'];
  thumbnail?: postMap['metadata']['thumbnail'];
  url?: postMap['metadata']['url'];
  views?: number;
}

//let sitemapCache: CacheFile;
export default class Sitemap extends CacheFile {
  constructor() {
    super('sitemap');
    // initialize instance
    //sitemapCache = new CacheFile('sitemap');
  }
  getValues(opt = defaultResovableValue): SitemapInfo[] {
    return super.getValues(opt);
  }
  add(obj: SitemapInfo) {
    super.set(obj.title, obj);
    return this;
  }
  getTotal(): number {
    return super.getValues().length;
  }
}
