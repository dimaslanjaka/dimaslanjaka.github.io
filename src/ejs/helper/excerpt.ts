/* eslint-disable no-useless-escape */
import { postMap } from '../../markdown/transformPosts/parsePost';
import { ProjectConfig } from '../../types/_config';

/**
 * get excerpt of page
 * @param page page metadata object
 * @param length length of excerpt, default 200
 * @returns excerpt string
 * @example
 * // unescaped html
 * <%- excerpt(page) %>
 * // escaped html
 * <%= excerpt(page) %>
 */
export function excerpt(page: postMap['metadata'] | ProjectConfig, length = 200) {
  let str: string;
  if (page.subtitle) {
    str = page.subtitle;
  } else if (page.description) {
    str = page.description;
  } else if (page.excerpt) {
    str = page.excerpt;
  } else if (page.title) {
    str = page.title;
  }
  if (str) return cleanString(str).substring(0, length);
}

/**
 * nullable excerpt
 * @param page
 * @returns
 */
export function nExcerpt(page: postMap['metadata'] | ProjectConfig) {
  const try1 = excerpt(page);
  if (try1 == page.title) return null;
  return try1;
}

/**
 * get only text without special chars
 * * except spaces,.-_
 * * encoded html entities
 * @see {@link https://stackoverflow.com/a/6555220/6404439}
 * @param text
 * @returns
 */
function cleanString(text: string) {
  if (typeof text == 'string') {
    const rawStr = text.replace(/[^a-zA-Z0-9.,-_ ]/gm, '');
    const encodedStr = rawStr.replace(/[\u00A0-\u9999<>\&]/g, function (i) {
      return '&#' + i.charCodeAt(0) + ';';
    });
    return encodedStr;
  }
  return text;
}
