import { join } from 'path';
import { parse as parseHTML } from 'node-html-parser';
import config, { ProjectConfig, root } from '../../types/_config';
import { loopDir } from '../utils';
import 'js-prototypes';
import { readFileSync, writeFileSync } from 'fs';
import bluebird from 'bluebird';
import { cwd } from 'process';
import chalk from 'chalk';

export const getDomainWithoutSubdomain = (url: string | URL) => {
  const urlParts = new URL(url).hostname.split('.');

  return urlParts
    .slice(0)
    .slice(-(urlParts.length === 4 ? 3 : 2))
    .join('.');
};

/*
const external_link = config.external_link;
const exclude_link: string[] = (Array.isArray(config.external_link.exclude) ? config.external_link.exclude : [config.external_link.exclude]).add(config.url).map(fixUrl);
const site_url = new URL(config.url);
if (external_link.enable) {
            html.querySelectorAll('a').forEach((a) => {
              let href = a.getAttribute('href');
              if (!href) return;
              if (href.startsWith('//')) href = 'http:' + href;
              //if (href.trim().match(new RegExp('^https?://' + site_url.host, 'gi'))) return;
              if (href.trim().match(/^[#/]/) || href.trim().length == 0) return;
              if (exclude_link.some((s) => href.trim().includes(s)) || href.trim().match(new RegExp('^https?://' + site_url.host, 'gi'))) return;
              a.setAttribute('target', '_blank');
              a.setAttribute('rel', 'nofollow noopener');
              if (href.trim().match(/^https?:\/\//)) {
                a.setAttribute('href', '//webmanajemen.com/page/safelink.html?url=' + Buffer.from(href).toString('base64'));
              }
            });
          }
*/

export default function afterGenerate() {
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
    console.log(chalk.blue('[after]'), file);
    const isHtml = file.endsWith('.html');
    if (isHtml) {
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
      const result = doc.toString();
      writeFileSync(file, result);
    }
  });
}
