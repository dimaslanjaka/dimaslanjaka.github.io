import { parsePost as moduleParsePost } from 'hexo-post-parser/src';
import CacheFile from '../../node/cache';
import { DynamicObject } from '../../types';
import config from '../../types/_config';
import { dateMapper, DeepPartial } from './postMapper';
const parseCache = new CacheFile('parsePost');
const __g = (typeof window != 'undefined' ? window : global) /* node */ as any;

/**
 * Parse Markdown Post
 * @see {@link moduleParsePost}
 * @param path
 * @returns
 */
const parsePost = (path: string) => {
  const result = moduleParsePost(String(path), {
    shortcodes: {
      youtube: true,
      css: true,
      include: true,
      link: true,
      now: true,
      script: true,
      text: true
    },
    cache: config.generator.cache,
    config,
    formatDate: true,
    fix: true,
    sourceFile: path
  });
  parseCache.set(path, result);
  return result;
};

/**
 * post metadata information (title, etc)
 */
export type postMeta = DynamicObject & {
  /**
   * Article language code
   */
  lang?: string;
  /**
   * Article title
   */
  title: string;
  subtitle: string;
  uuid?: string;
  updated?: string | dateMapper;
  date: string | dateMapper;
  description?: string;
  tags: string[];
  category: string[];
  photos?: string[];
  cover?: string;
  thumbnail?: string;
  /**
   * full url
   */
  url?: string;
  /**
   * just pathname
   */
  permalink?: string;
  /**
   * archive (index, tags, categories)
   */
  type?: 'post' | 'page' | 'archive';
};
export type postMap = DynamicObject & {
  /**
   * Article metadata
   */
  metadataString?: string;
  fileTree?: {
    /**
     * [post source] post file from `src-posts/`
     */
    source?: string;
    /**
     * [public source] post file from source_dir _config.yml
     */
    public?: string;
  };
  /**
   * _config.yml
   */
  config?: typeof config | null;
  /**
   * Article metadata
   */
  metadata?: DeepPartial<postMeta>;
  /**
   * Article body
   */
  body?: string;
};

export default parsePost;
export { parsePost };
__g.parsePost = parsePost;
