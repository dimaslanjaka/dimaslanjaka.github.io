/* eslint-disable no-useless-escape */
import { parsePostReturn } from '../../markdown/transformPosts';
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
export function excerpt(page: parsePostReturn['metadata'] | ProjectConfig, length = 200) {
  let str = 'no excerpt';
  if (page.subtitle) {
    str = page.subtitle;
  } else if (page.description) {
    str = page.description;
  } else if (page.excerpt) {
    str = page.excerpt;
  } else if (page.title) {
    str = page.title;
  }
  return cleanString(str).substring(0, length);
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
