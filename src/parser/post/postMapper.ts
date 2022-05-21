import moment from 'moment';
import { excerpt } from '../../ejs/helper/excerpt';
import { thumbnail } from '../../ejs/helper/thumbnail';
import { array_split_chunks } from '../../node/array-utils';
import { getAllPosts } from '../../node/cache-post';
import config from '../../types/_config';
import { postMap } from './parsePost';

/**
 * Partializing properties
 * @see {@link https://stackoverflow.com/a/40076355/6404439}
 */
export type Partial<T> = {
  [P in keyof T]?: T[P];
};
/**
 * Partializing properties deeper
 * @see {@link https://stackoverflow.com/a/40076355/6404439}
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Record<string, unknown>
    ? DeepPartial<T[P]>
    : T[P];
};

/**
 * mapped type
 */
export type mergedPostMap = Partial<postMap> & DeepPartial<postMap['metadata']>;
export interface archiveMap extends mergedPostMap {
  [key: string]: any;
  /**
   * previous page items
   */
  prev?: mergedPostMap[] | null;
  /**
   * next page items
   */
  next?: mergedPostMap[] | null;
  /**
   * current page number
   */
  page_now?: number;
  /**
   * next page number
   */
  page_next?: number;
  /**
   * next page url (only visible on archive generator)
   */
  page_next_url?: string;
  /**
   * previous page url (only visible on archive generator)
   */
  page_prev_url?: string;
  /**
   * previous page number
   */
  page_prev?: number;
  /**
   * page total
   */
  total?: number;
}

/**
 * Transform post object
 * * merge post metadata property ({@link postMap.metadata}) to root property
 * @returns
 */
export default function postMapper(post: postMap): archiveMap {
  post.metadata.date = new dateMapper(<string>post.metadata.date);
  return Object.assign(post, post.metadata);
}

/**
 * transform array into an mapped chunks
 * @param chunks
 * @returns
 */
export function postChunksMapper<T extends any[][]>(chunks: T): T {
  const defaultMap: archiveMap = {
    page_next: null,
    page_now: null,
    page_next_url: null,
    page_prev: null,
    page_prev_url: null
  };
  chunks.map((arr_chunk, i) => {
    if (Array.isArray(arr_chunk)) {
      const ret = arr_chunk.map((post: archiveMap) => {
        post.page_now = i;
        post.page_next = i + 1;
        post.page_prev = i - 1;
        if (post.page_prev === -1) post.page_prev = null;
        post.total = chunks.length;
        if (Array.isArray(chunks[post.page_prev])) {
          post.prev = chunks[post.page_prev];
        }
        if (Array.isArray(chunks[post.page_next])) {
          post.next = chunks[post.page_next];
        }
        return Object.assign(defaultMap, post);
      });
      return ret;
    }
    return arr_chunk;
  });
  return chunks;
}

export function array_wrap<T extends any[]>(arr: T): T {
  arr['each'] = arr.forEach;
  return arr;
}

/**
 * simplified dump
 * @param post
 * @returns
 */
export function simplifyDump(post: any) {
  if (Array.isArray(post)) return post.map(simplifyDump);
  if (typeof post == 'object') {
    if (post.sitedata) post.sitedata = null;
    if (post.posts) {
      if (Array.isArray(post.posts)) {
        post.posts = post.posts.map(simplifyDump);
      }
    }
    if (post.config) post.config = null;
    if (post.body) post.body = null;
    if (post.content) post.content = null;
    if (post.next) post.next = null;
    if (post.prev) post.prev = null;
    if (post.metadata) post.metadata = null;
  }
  return post;
}

/**
 * split posts array to chunks
 * @param arr
 * @returns
 */
export function post_chunks<T extends any[]>(arr?: T) {
  const posts = (typeof arr == 'object' ? arr : getAllPosts())
    .filter((item) => {
      if (!item) return false;
      if (!item.metadata) return false;
      return true;
    })
    .map(postMapper);
  //.map((post) => Object.assign(post, post.metadata));
  /**
   * split posts to chunks divided by {@link config.index_generator.per_page}
   */
  const chunk = postChunksMapper(
    array_split_chunks(posts, config.index_generator.per_page)
  );

  const sitedata = posts.map((post) => {
    const data = {
      title: post.metadata.title,
      thumbnail: thumbnail(post.metadata),
      url: post.metadata.url,
      excerpt: excerpt(post.metadata)
    };
    return data;
  });
  return {
    /** all posts */
    posts,
    /** all posts chunks */
    chunk,
    /** all posts infinite scroll sitedata */
    sitedata
  };
}

/**
 * HexoJS date formatter
 * * Playground Test {@link https://codepen.io/dimaslanjaka/pen/LYegjaV}
 */
export class dateMapper {
  data: moment.Moment;
  constructor(date: moment.MomentInput) {
    if (typeof date == 'string') {
      this.data = moment(date);
    }
  }
  format = (pattern: string) => this.data.format(pattern);
  year = () => this.data.format('YYYY');
  toString = () => this.data.format('YYYY-MM-DDTHH:mm:ssZ');
}
