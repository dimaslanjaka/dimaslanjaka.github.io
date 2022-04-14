import gulp from 'gulp';
import { buildPost } from '../../markdown/transformPosts';
import parsePost from '../../markdown/transformPosts/parsePost';
import { existsSync, globSrc, join, write } from '../../node/filemanager';
import jdom from '../../node/jsdom';
import { post_public_dir } from '../../types/_config';

/**
 * remove inline style html string
 * @param str
 * @param single_element true=single html (div, etc), false=full <html></html>
 * @returns
 */
export function removeInlineStyle(str: string, single_element = true) {
  const dom = new jdom();
  const doc = dom.parse(str);
  Array.from(doc.querySelectorAll('*[style]')).forEach((el) => {
    el.removeAttribute('style');
  });
  if (single_element) {
    return dom.body().innerHTML;
  } else {
    return dom.serialize();
  }
}

/**
 * remove all blogger inline style html from posts
 * @returns
 */
export function gulpInlineStyle() {
  const src = globSrc('**/*.md', { cwd: post_public_dir })
    .map((item) => join(post_public_dir, item))
    .filter(existsSync);
  return src
    .map((item) => {
      return { path: item, parsed: parsePost(item) };
    })
    .filter((obj) => typeof obj.parsed == 'object' && typeof obj.parsed.body == 'string' && obj.parsed.body.length > 0)
    .each((obj) => {
      const parsed = obj.parsed;
      if (parsed.body.includes('<div dir="ltr" style="text-align: left;" trbidi="on">')) {
        parsed.body = removeInlineStyle(parsed.body, true);
        //console.log(obj.path);
        write(obj.path, buildPost(parsed));
      }
    })
    .thenReturn();
}

gulp.task('copy:remove-inline-style', gulpInlineStyle);
