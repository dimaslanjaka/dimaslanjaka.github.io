/* eslint-disable no-useless-escape */

import { postMap } from '../../markdown/transformPosts/parsePost';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const noimage = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';

/**
 * Thumbnail Helper
 * @description Get the thumbnail url from a post
 * @param {object} post
 * @example
 *     <%- thumbnail(post) %>
 */
export function thumbnail(post: postMap['metadata']) {
  let url = post.cover || post.thumbnail;
  if (!url && post.photos) {
    if (Array.isArray(post.photos)) return post.photos[0];
  }
  if (!url) {
    const imgPattern = /\<img\s.*?\s?src\s*=\s*['|"]?([^\s'"]+).*?\>/gi;
    const result = imgPattern.exec(post.content);
    if (result && result.length > 1) {
      url = result[1];
    }
  }
  return url || noimage;
}
