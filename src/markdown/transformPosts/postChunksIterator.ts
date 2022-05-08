import { getLatestDateArray } from '../../ejs/helper/date';
import { join, write } from '../../node/filemanager';
import config, { tmp } from '../../types/_config';
import { DeepPartial, post_chunks } from './postMapper';

export interface GeneratorOpt {
  /**
   * current page number
   */
  current_page: number;
  /**
   * base permalink
   * @example tags/tagname
   */
  base: string;
  /**
   * parent chunks (all pages)
   * @see {@link post_chunks}
   */
  parentChunks: ReturnType<typeof post_chunks>['chunk'];
  /**
   * tree chunks
   * * tree contains parent and inner chunks
   */
  treeChunks: ReturnType<typeof post_chunks>;
}

/**
 * chunks iterator transform pages to partial page data
 * @param innerChunks partial pages
 * @param opt
 * @returns
 */
export default function postChunksIterator(
  innerChunks: ReturnType<typeof post_chunks>['chunk'][0],
  opt: DeepPartial<GeneratorOpt>
) {
  const current_page = opt.current_page;
  const base = opt.base;
  const parentChunks = opt.parentChunks;
  const sitedata = opt.treeChunks.sitedata;
  const homepage = new URL(config.url);

  /** previous page number */
  let page_prev = current_page - 1;
  if (!parentChunks[page_prev]) page_prev = null;
  homepage.pathname = join(base, page_prev);
  if (!page_prev) homepage.pathname = base;
  /** previous page permalink */
  const page_prev_url = homepage.pathname;

  homepage.pathname = join(base, 'page', current_page);
  if (current_page === 0) homepage.pathname = base;
  /** current page permalink */
  const page_current_url = homepage.pathname;

  /** next page number */
  let page_next = current_page + 1;
  if (!parentChunks[page_next]) page_next = null;
  homepage.pathname = join(base, 'page', page_next);
  /** next page permalink */
  const page_next_url = page_next ? homepage.pathname : null;

  /** get latest modified time of posts */
  const latestUpdated = getLatestDateArray(innerChunks.map((post) => post.updated.toString()));

  const result = {
    /** setup sitedata array as json */
    sitedata: JSON.stringify(sitedata),
    latestUpdated,
    posts: innerChunks,
    total: parentChunks.length,
    page_now: current_page,
    page_prev: page_prev,
    page_prev_url: page_prev_url,
    page_current_url: page_current_url,
    page_next_url: page_next_url,
    page_next: page_next,
    perm_base: opt.base,
    perm_current: page_current_url,
  };

  if (config.verbose) {
    write(tmp('generator', base, `${current_page}.log`), {
      page_prev,
      page_prev_url,
      page_current: current_page,
      page_current_url,
      page_next,
      page_next_url,
      total: parentChunks.length,
    });
  }
  return result;
}
