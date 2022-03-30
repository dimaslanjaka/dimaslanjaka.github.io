/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Hexo_Config } from '../../../types/_config.js';
import { parsePostReturn } from '../../markdown/transformPosts.js';
/**
 * get author name
 * @param page
 * @returns
 */
export function author_name(page: parsePostReturn['metadata']) {
  const author = page['author'];
  if (typeof author == 'string') return author;
  if (author.nick) return author.nick;
  if (author.name) return author.name;
  return 'Default Author';
}

/**
 * get author link
 * @param page
 * @returns
 */
export function author_link(page: parsePostReturn['metadata'], config?: Hexo_Config) {
  const author = page['author'];
  if (author['link']) return author['link'];
  if (config.author) {
    if (config.author.link) return config.author.link;
  }
  return config.url;
}
