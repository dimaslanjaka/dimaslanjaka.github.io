/* eslint-disable @typescript-eslint/no-unused-vars */
import { join } from 'path';
import config, { root } from '../../types/_config';
import 'js-prototypes';
import chalk from 'chalk';
import gulp from 'gulp';
import { globSrc, readFileSync, writeFileSync } from '../../node/filemanager';
import { JSDOM } from 'jsdom';

/**
 * get domain name without subdomain
 * @param url
 * @returns
 */
export const getDomainWithoutSubdomain = (url: string | URL) => {
  const urlParts = new URL(url).hostname.split('.');

  return urlParts
    .slice(0)
    .slice(-(urlParts.length === 4 ? 3 : 2))
    .join('.');
};

const logname = chalk.blue('[after]');
const hexoURL = new URL(config.url);
const internal_links = [
  ...config.seo.links.exclude,
  ...config.external_link.exclude,
  hexoURL.host,
  'www.webmanajemen.com',
  'https://github.com/dimaslanjaka',
  '/dimaslanjaka1',
  'dimaslanjaka.github.io',
].uniqueStringArray();

/**
 * filter external links
 * @param href
 * @returns
 */
export function filter_external_links(href: string) {
  const result = {
    internal: true,
    href: href,
  };
  if (href && href.length > 2) {
    // fix dynamic protocol urls
    if (href.startsWith('//')) href = config.url + href;
    // skip hash and javascript anchors
    if (!href.trim().match(/^(#|javascript:)/i) && href.trim().length) {
      // only get external links with protocols
      if (href.trim().match(/^https?:\/\//)) {
        const matchHost = internal_links.includes(new URL(href).host);
        const matchHref = internal_links.includes(href);
        result.internal = matchHost;
        if (!matchHost && !matchHref) {
          result.href = '/page/safelink.html?url=' + Buffer.from(encodeURIComponent(href)).toString('base64');
        }
      }
    }
  }
  return result;
}

const generated_dir = join(root, config.public_dir);
function staticAfter(done) {
  // iterate public_dir of _config.yml (hexo generate)
  return globSrc('**/*.html', { cwd: generated_dir })
    .map((file) => join(generated_dir, file))
    .then((files) => {
      console.log('total', files.length);
      const parser = () => {
        if (!files.length) return;
        const file = files[0];
        const content = readFileSync(file, 'utf-8');
        const dom = new JSDOM(content);
        const doc: Document = dom.window.document;
        //const html = root.querySelector('html');
        //if (html && !html.hasAttribute('lang')) html.setAttribute('lang', 'en');
        const hrefs = doc.querySelectorAll('a');
        if (hrefs && hrefs.length > 0) {
          for (let i = 0; i < hrefs.length; i++) {
            const element = hrefs[i];
            const href = element.getAttribute('href');
            const filter = filter_external_links(href);
            if (!filter.internal) {
              element.setAttribute('rel', 'nofollow noopener noreferer');
              element.setAttribute('target', '_blank');
            }
            element.setAttribute('href', filter.href);
          }
        }
        dom.window.document = doc;

        // save modified html
        //const result = removeWordpressCDN(root.toString());
        const result = doc.documentElement.outerHTML;
        writeFileSync(file, result);
      };
      return parser();
    });
}
gulp.task('generate:after', staticAfter);

/**
 * remove i2.wp.com i1.wp.com etc
 * @param str url string
 * @param replacement replacement string, default: https://res.cloudinary.com/practicaldev/image/fetch/
 * @returns
 */
export function removeWordpressCDN(str: string, replacement = 'https://res.cloudinary.com/practicaldev/image/fetch/') {
  const regex = /https?:\/\/i\d{1,4}.wp.com\//gm;
  return str.replace(regex, replacement);
}
