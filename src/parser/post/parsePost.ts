import { parsePost as moduleParsePost, postMap } from 'hexo-post-parser';
import { Nullable } from 'safelinkify';
import { toUnix } from 'upath';
import { replacePath } from '../../gulp/utils';
import CachePost from '../../node/cache-post';
import config from '../../types/_config';
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
const parsePost = (path: string, content?: string): Nullable<postMap> => {
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
    config: <any>config,
    formatDate: true,
    fix: true,
    sourceFile: path
  });

  /*if (!validateParsed(parse)) {
    console.log(color.redBright('[fail]'), 'at 1st parse');
    return null;
  }*/

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

  parse = modifyPost(<any>parse);

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
