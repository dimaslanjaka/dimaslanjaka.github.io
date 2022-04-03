/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import config, { ProjectConfig } from '../../types/_config';
import { parsePostReturn } from '../../markdown/transformPosts';
/**
 * get author name
 * @param page
 * @returns
 */
export function author_name(page: parsePostReturn['metadata']) {
  const author = page['author'];
  if (typeof author == 'string') return author;
  if (typeof author == 'object') {
    if (author.nick) return author.nick;
    if (author.name) return author.name;
  }
}

/**
 * get author link
 * @param page
 * @returns
 */
export function author_link(page: parsePostReturn['metadata']) {
  const author = page['author'];
  if (typeof author == 'object') {
    if (author['link']) return author['link'];
  }
  if (config.author) {
    if (config.author.link) return config.author.link;
  }
  return config.url;
}
