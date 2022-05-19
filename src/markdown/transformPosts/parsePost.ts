import { parsePost as moduleParsePost } from 'hexo-post-parser/src';
import CacheFile from '../../node/cache';
import config from '../../types/_config';
const parseCache = new CacheFile('parsePost');
const __g = (typeof window != 'undefined' ? window : global) /* node */ as any;

/**
 * Parse Markdown Post
 * @see {@link moduleParsePost}
 * @param path
 * @returns
 */
const parsePost = (path: string) => {
  const parse = moduleParsePost(String(path), {
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
  parseCache.set(path, parse);
  return parse;
};

export { DeepPartial, ParseOptions, postMap, postMeta } from 'hexo-post-parser/src';
export { parsePost };
export default parsePost;
__g.parsePost = parsePost;
