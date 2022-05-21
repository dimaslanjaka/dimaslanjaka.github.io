/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { postMap } from '../../parser/post/parsePost';
import config from '../../types/_config';

/**
 * get author name
 * @param page
 * @returns
 */
export function author_name(page: postMap['metadata'] | typeof config) {
  const author = page['author'];
  if (typeof author == 'string') return author;
  if (typeof author == 'object') {
    if (author['nick']) return author['nick'];
    if (author['name']) return author['name'];
  }
}

/**
 * get author email
 * @param page post metadata or config from _config.yml
 * @returns
 */
export function author_email(page: postMap['metadata'] | typeof config) {
  const author = page['author'];

  if (typeof author == 'object') {
    if (author['mail']) return author['mail'];
    if (author['email']) return author['email'];
  }
  // default email
  return 'noreply@blogger.com';
}

/**
 * transform author object
 * @param page
 * @returns
 */
export function author_object(page: postMap['metadata'] | typeof config) {
  return {
    name: String(author_name(page)),
    email: String(author_email(page)),
    link: String(author_link(page))
  };
}

/**
 * get author link
 * @param page
 * @returns
 */
export function author_link(page: postMap['metadata'] | typeof config) {
  const author = page['author'];
  if (typeof author == 'object') {
    if (author['link']) return author['link'];
  }
  if (config.author) {
    if (config.author.link) return config.author.link;
  }
  return config.url;
}
