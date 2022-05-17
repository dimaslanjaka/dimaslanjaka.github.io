import { postMap } from '../../markdown/transformPosts/parsePost';
import { join } from '../../node/filemanager';
import config from '../../types/_config';
const tag_dir = config.tag_dir;
const cat_dir = config.category_dir;

export interface Label {
  /**
   * Tag name
   */
  name: string;
  /**
   * Tag path
   */
  path: string;
  /**
   * Tag url
   */
  url: string;
}
const homepage = new URL(config.url);

/**
 * list tag of page
 * @param page page object
 * @returns array of tags
 * @example
 * ```html
 * <% tags(page).forEach(tag => { %>
 * <!-- full url -->
 * tag url: <%- tag.url %>
 * <!-- label name -->
 * tag name: <%- tag.name %>
 * <!-- just pathname without base url -->
 * tag pathname: <%- tag.pathname %>
 * <% }) %>
 * ```
 */
export function tags(page: postMap) {
  const result: Label[] = [];
  const target = page.tags || page.metadata.tags || [];
  target.forEach((tag: string) => {
    homepage.pathname = join(tag_dir, tag);
    result.push({ name: tag, path: homepage.pathname, url: homepage.toString() });
  });
  return result;
}

/**
 * extract categories from page
 * @param page
 * @returns array of object same as {@link tags}
 * @see {@link tags}
 */
export function categories(page: postMap) {
  const result: Label[] = [];
  const target = page.category || page.metadata.category || [];
  target.forEach((tag: string) => {
    homepage.pathname = join(cat_dir, tag);
    result.push({ name: tag, path: homepage.pathname, url: homepage.toString() });
  });
  return result;
}
