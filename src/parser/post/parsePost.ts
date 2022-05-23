import { parsePost as moduleParsePost, postMap } from 'hexo-post-parser';
import { toUnix } from 'upath';
import { replacePath } from '../../gulp/utils';
import CachePost from '../../node/cache-post';
import color from '../../node/color';
import config from '../../types/_config';
import { validateParsed } from '../transformPosts';
import modifyPost from './modifyPost';
//const parseCache = new CacheFile('parsePost');
const cachePost = new CachePost();
const __g = (typeof window != 'undefined' ? window : global) /* node */ as any;

/**
 * Parse Markdown Post
 * @see {@link moduleParsePost}
 * @param path
 * @returns
 */
const parsePost = (path: string, content?: string) => {
  let parse = moduleParsePost(content || path, {
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
  }) as postMap;

  if (!validateParsed(parse)) {
    console.log(color.redBright('[fail]'), 'at 1st parse');
    return null;
  }

  parse.fileTree = {
    source: replacePath(
      toUnix(path.toString()),
      '/source/_posts/',
      '/src-posts/'
    ),
    public: replacePath(
      toUnix(path.toString()),
      '/src-posts/',
      '/source/_posts/'
    )
  };

  parse = modifyPost(parse);

  if (parse.metadata.type === 'post') {
    // insert parsed to caches (only non-redirected post)
    if (!parse.metadata.redirect) {
      cachePost.set(path, parse);
    }
    //parseCache.set(path, parse);
  }

  return parse;
};

export {
  DeepPartial,
  ParseOptions,
  postMap,
  postMeta
} from 'hexo-post-parser/src';
export { parsePost };
export default parsePost;
__g.parsePost = parsePost;
