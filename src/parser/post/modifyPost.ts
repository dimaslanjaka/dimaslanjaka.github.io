import { parse as parseHTML } from 'node-html-parser';
import { isValidHttpUrl } from '../../gulp/utils';
import { array_move } from '../../node/array-utils';
import { pcache } from '../../node/cache';
import { md5 } from '../../node/md5-file';
import { countWords } from '../../node/string-utils';
import config from '../../types/_config';
import { renderBodyMarkdown } from '../toHtml';
import { postMap } from './parsePost';
import { archiveMap, mergedPostMap } from './postMapper';

const useCache = config.generator.cache;
const modCache = pcache('modify');

/*interface GroupLabel {
  [key: string]: ReturnType<typeof parsePost>[];
}
const postCats: GroupLabel = {};
const postTags: GroupLabel = {};
const cacheTags = new CacheFile('postTags');
const cacheCats = new CacheFile('postCats');*/
const _g = (typeof window != 'undefined' ? window : global) /* node */ as any;

type modifyPostType = postMap | mergedPostMap | archiveMap;
// type modifyPostType = Partial<postMap> | Partial<mergedPostMap> | Partial<archiveMap>;

/**
 * Modify Post With Defined Conditions
 * @param parse result of {@link parsePost}
 * @returns
 */
export function modifyPost<T extends modifyPostType>(parse: T): T {
  if (!parse) return null;
  const cacheKey = md5(
    parse.metadata.title +
      parse.metadata.date +
      parse.metadata.updated +
      parse.metadata.type
  );
  /*if (parse.fileTree) {
    if (parse.fileTree.source) {
      cacheKey = md5(parse.fileTree.source);
    }
  }*/
  if (useCache) {
    const get = modCache.getSync<typeof parse>(cacheKey);
    if (get) return get;
  }
  // @todo setup empty tags and categories when not set
  if (!Array.isArray(parse.metadata.category))
    parse.metadata.category = [config.default_category];
  if (!Array.isArray(parse.metadata.tags))
    parse.metadata.tags = [config.default_tag];

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
  const postLowerTags = parse.metadata.tags.map(
    (tag) => tag && tag.toLowerCase()
  );

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
  if (
    config.default_tag &&
    parse.metadata.tags.length > 1 &&
    parse.metadata.tags.includes(config.default_tag)
  ) {
    parse.metadata.tags = parse.metadata.tags.filter(
      (tag) => tag !== config.default_tag
    );
  }

  // @todo remove default category when categories have more than 1 item
  if (
    config.default_category &&
    parse.metadata.category.length > 1 &&
    parse.metadata.category.includes(config.default_category)
  ) {
    parse.metadata.category = parse.metadata.category.filter(
      (category) => category !== config.default_category
    );
  }

  // @todo remove duplicate categories
  parse.metadata.category = [...new Set(parse.metadata.category)];
  // @todo remove duplicate tags
  parse.metadata.tags = [...new Set(parse.metadata.tags)];

  /*// @todo prepare to add post category to cache
  parse.metadata.category.forEach((name: string) => {
    if (!name) return;
    // init
    if (!postCats[name]) postCats[name] = [];
    // prevent duplicate push
    if (!postCats[name].find(({ title }) => title === parse.metadata.title))
      postCats[name].push(<any>parse);
  });

  // @todo prepare to add post tag to cache
  parse.metadata.tags.forEach((name: string) => {
    if (!name) return;
    let post = postTags[name];
    // init
    if (!post) post = [];
    // prevent duplicate push
    if (!postTags[name].find(({ title }) => title === parse.metadata.title))
      postTags[name].push(<any>parse);
  });*/

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
    if (!isValidHttpUrl(canonical))
      parse.metadata.canonical = config.url + parse.metadata.canonical;
  }

  // move 'programming' to first index
  if (parse.metadata.category.includes('Programming')) {
    parse.metadata.category.forEach((str, i) => {
      if (str.toLowerCase().trim() === 'programming') {
        parse.metadata.category = array_move(parse.metadata.category, i, 0);
      }
    });
  }

  /*scheduler.add('add-labels', () => {
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
  });*/

  modCache.putSync(cacheKey, parse);

  return parse;
}

export default modifyPost;
_g.modifyPost = modifyPost;
