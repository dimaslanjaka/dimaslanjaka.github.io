import { join } from 'path';
import { parse as parseHTML } from 'node-html-parser';
import config, { root } from '../../types/_config';
import { loopDir } from '../utils';
import 'js-prototypes';
import { readFileSync, writeFileSync } from 'fs';
import bluebird from 'bluebird';
import chalk from 'chalk';
import gulp from 'gulp';

export const getDomainWithoutSubdomain = (url: string | URL) => {
  const urlParts = new URL(url).hostname.split('.');

  return urlParts
    .slice(0)
    .slice(-(urlParts.length === 4 ? 3 : 2))
    .join('.');
};

const logname = chalk.blue('[after]');

function afterGenerate() {
  // iterate public_dir of _config.yml (hexo generate)
  const public_dir = join(root, config.public_dir);
  const loop = loopDir(public_dir);
  const hexoURL = new URL(config.url);
  const exclude = [
    ...config.seo.links.exclude,
    ...config.external_link.exclude,
    hexoURL.host,
    'www.webmanajemen.com',
    'https://github.com/dimaslanjaka',
    '/dimaslanjaka1',
    'dimaslanjaka.github.io',
  ].uniqueStringArray();

  return bluebird.all(loop).each((file) => {
    const isHtml = file.endsWith('.html');
    if (isHtml) {
      console.log(logname + chalk.cyan('[safelink]'), file);
      const doc = parseHTML(readFileSync(file, 'utf-8'));
      const html = doc.querySelector('html');
      if (html && !html.hasAttribute('lang')) html.setAttribute('lang', 'en');

      // safelinkify
      const hrefs = doc.querySelectorAll('a');
      if (hrefs.length) {
        for (let i = 0; i < hrefs.length; i++) {
          const element = hrefs[i];
          let href = element.getAttribute('href');
          // skip `/` homepage links
          if (href && href.length > 2) {
            if (href.startsWith('//')) href = config.url + href;
            // skip hash and javascript anchors
            if (!href.trim().match(/^(#|javascript:)/i) && href.trim().length) {
              // only get external links
              if (href.trim().match(/^https?:\/\//)) {
                const matchHost = exclude.includes(new URL(href).host);
                const matchHref = exclude.includes(href);
                if (!matchHost) {
                  element.setAttribute('rel', 'nofollow noopener noreferer');
                  element.setAttribute('target', '_blank');
                }
                if (!matchHost && !matchHref) {
                  const safelink = '/page/safelink.html?url=' + Buffer.from(encodeURIComponent(href)).toString('base64');
                  element.setAttribute('href', safelink);
                }
              }
            }
          }
        }
      }
      //const memoryUsage = util.inspect(process.memoryUsage()).replace(/\s+/gm, " ");
      //fs.appendFileSync(__dirname + "/tmp/inspect.log", memoryUsage + "\n");

      // save modified html
      const result = removeWordpressCDN(doc.toString());
      writeFileSync(file, result);
    }
  });
}
gulp.task('generate:after', afterGenerate);
export default afterGenerate;

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
