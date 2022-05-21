/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { uniqueStringArray } from '../../node/array-utils';
import { postMap } from '../../parser/post/parsePost';

export function keywords(page: postMap['metadata']) {
  let kw = [];
  if (Array.isArray(page.tags) && page.tags.length > 0)
    page.tags.forEach((i) => kw.push(i));
  if (Array.isArray(page.category) && page.category.length > 0)
    page.category.forEach((i) => kw.push(i));
  if (page.title) {
    uniqueStringArray(page.title.replace(/[^\w\s]/gi, '').split(/\s+/))
      .map((s) => s.trim())
      .forEach((i) => kw.push(i));
  }
  kw = uniqueStringArray(kw);
  return kw.join(',');
}

export const keyword = (s) => keywords(s);
