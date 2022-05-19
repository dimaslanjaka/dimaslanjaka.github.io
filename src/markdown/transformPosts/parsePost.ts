import Bluebird from 'bluebird';
import { parsePost as moduleParsePost } from 'hexo-post-parser/src';
import { parse as parseHTML } from 'node-html-parser';
import { toUnix } from 'upath';
import { isValidHttpUrl, replacePath } from '../../gulp/utils';
import CacheFile from '../../node/cache';
import CachePost from '../../node/cache-post';
import color from '../../node/color';
import scheduler from '../../node/scheduler';
import { countWords } from '../../node/utils';
import config from '../../types/_config';
import { renderBodyMarkdown } from '../toHtml';
import { validateParsed } from '../transformPosts';
const parseCache = new CacheFile('parsePost');
const cachePost = new CachePost();
const __g = (typeof window != 'undefined' ? window : global) /* node */ as any;
interface GroupLabel {
  [key: string]: ReturnType<typeof parsePost>[];
}
const postCats: GroupLabel = {};
const postTags: GroupLabel = {};
const cacheTags = new CacheFile('postTags');
const cacheCats = new CacheFile('postCats');

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
  if (!validateParsed(parse)) {
    console.log(color.redBright('[fail]'), 'at 1st parse');
    return null;
  }

  parse.fileTree = {
    source: replacePath(toUnix(path.toString()), '/source/_posts/', '/src-posts/'),
    public: replacePath(toUnix(path.toString()), '/src-posts/', '/source/_posts/')
  };

  // @todo setup empty tags and categories when not set
  if (!Array.isArray(parse.metadata.category)) parse.metadata.category = [config.default_category];
  if (!Array.isArray(parse.metadata.tags)) parse.metadata.tags = [config.default_tag];

  // @todo add tags from title
  if (config.title_map) {
    const title = parse.metadata.title.toLowerCase();
    for (const key in config.title_map) {
      if (Object.prototype.hasOwnProperty.call(config.title_map, key)) {
        const tag = config.title_map[key];
        const regexBoundary = new RegExp(`\\b${key}\\b`, 'gmi');

        if (title.match(regexBoundary)) {
          //console.log('found', regexBoundary, tag);
          parse.metadata.tags.push(tag);
        }
      }
    }
  }

  // tag mapper
  const postLowerTags = parse.metadata.tags.map((tag) => tag && tag.toLowerCase());

  // @todo process config.tag_map (rename tag)
  if (typeof config.tag_map === 'object') {
    for (const key in config.tag_map) {
      if (Object.prototype.hasOwnProperty.call(config.tag_map, key)) {
        const renameTagTo = config.tag_map[key];
        const lowerkey = key.toLowerCase();
        const hasTag = postLowerTags.includes(lowerkey);
        if (hasTag) {
          const indexTag = postLowerTags.indexOf(lowerkey);
          //console.log('original tag', parse.metadata.tags[indexTag]);
          parse.metadata.tags[indexTag] = renameTagTo;
          //console.log('renamed tag', renameTagTo);
        }
      }
    }
  }

  // @todo grouping tag to category
  if (typeof config.tag_group === 'object') {
    for (const key in config.tag_group) {
      if (Object.prototype.hasOwnProperty.call(config.tag_group, key)) {
        const group = config.tag_group[key];
        const lowerkey = key.toLowerCase();
        const hasTag = postLowerTags.includes(lowerkey);
        if (hasTag) {
          //const indexTag = postLowerTags.indexOf(lowerkey);
          //console.log('original tag', parse.metadata.tags[indexTag]);
          //console.log('grouped to', group);
          parse.metadata.category.push(group);
        }
      }
    }
  }

  // @todo remove default tag when tags have more than 1 item
  if (config.default_tag && parse.metadata.tags.length > 1 && parse.metadata.tags.includes(config.default_tag)) {
    parse.metadata.tags = parse.metadata.tags.filter((tag) => tag !== config.default_tag);
  }

  // @todo remove default category when categories have more than 1 item
  if (
    config.default_category &&
    parse.metadata.category.length > 1 &&
    parse.metadata.category.includes(config.default_category)
  ) {
    parse.metadata.category = parse.metadata.category.filter((category) => category !== config.default_category);
  }

  // @todo add post category to cache
  parse.metadata.category.forEach((name: string) => {
    if (!name) return;
    // init
    if (!postCats[name]) postCats[name] = [];
    // prevent duplicate push
    if (!postCats[name].find(({ title }) => title === parse.metadata.title)) postCats[name].push(parse);
  });

  // @todo add post tag to cache
  parse.metadata.tags.forEach((name: string) => {
    if (!name) return;
    // init
    if (!postTags[name]) postTags[name] = [];
    // prevent duplicate push
    if (!postTags[name].find(({ title }) => title === parse.metadata.title)) postTags[name].push(parse);
  });

  // @todo set type post when not set
  if (!parse.metadata.type) parse.metadata.type = 'post';

  // render post for some properties
  let html: ReturnType<typeof parseHTML>;
  try {
    const renderbody = renderBodyMarkdown(parse);
    html = parseHTML(renderbody);
  } catch (error) {
    console.log('[fail]', 'renderBodyMarkdown', error);
    //console.log(...log);
    //console.log(typeof parse.body);
    return null;
  }

  // +article wordcount
  const words = html
    .querySelectorAll('*:not(script,style,meta,link)')
    .map((e) => e.text)
    .join('\n');
  parse.metadata.wordcount = countWords(words);
  if (parse.metadata.canonical) {
    const canonical: string = parse.metadata.canonical;
    if (!isValidHttpUrl(canonical)) parse.metadata.canonical = config.url + parse.metadata.canonical;
  }

  // insert parsed to caches (only non-redirected post)
  if (!parse.metadata.redirect) {
    cachePost.set(path, parse);
  }
  parseCache.set(path, parse);

  scheduler.add('add-labels', () => {
    Bluebird.all([postCats, postTags]).each((group, index) => {
      for (const name in group) {
        if (Object.prototype.hasOwnProperty.call(group, name)) {
          const posts = group[name];
          if (index === 1) {
            cacheTags.set(name, posts);
          } else {
            cacheCats.set(name, posts);
          }
        }
      }
    });
  });

  return parse;
};

export { DeepPartial, ParseOptions, postMap, postMeta } from 'hexo-post-parser/src';
export { parsePost };
export default parsePost;
__g.parsePost = parsePost;
