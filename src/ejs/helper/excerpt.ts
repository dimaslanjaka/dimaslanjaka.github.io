import { parsePostReturn } from '../../markdown/transformPosts';

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
export function excerpt(page: parsePostReturn['metadata'], length = 200) {
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

function cleanString(text) {
  // return text.replace(/[\"\']/gim, '');
  // @see {@link https://stackoverflow.com/a/6555220/6404439}
  // get only text without special chars
  // except spaces,.-_
  if (typeof text == 'string') return text.replace(/[^a-zA-Z0-9.,-_ ]/gm, '');
  return text;
}
