import { parsePostReturn } from '../markdown/transformPosts';
import CacheFile, { defaultResovableValue, ResovableValue } from './cache';

/**
 * all sitemaps
 */
interface SitemapInfo {
  [key: string]: any;
  title?: string;
  date?: string;
  updated?: string;
  excerpt?: string;
  thumbnail?: string;
  url?: string;
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
