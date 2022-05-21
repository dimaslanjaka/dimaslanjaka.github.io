/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */
import chalk from 'chalk';
import { readFileSync, writeFileSync } from 'fs';
import gulp from 'gulp';
import { join } from 'path';
import safelinkify from 'safelinkify';
import { TaskCallback } from 'undertaker';
import { arrayAddAll, uniqueStringArray } from '../../node/array-utils';
import { globSrc } from '../../node/filemanager';
import jdom from '../../node/jsdom';
import { isMatch } from '../../node/string-utils';
import config, { root } from '../../types/_config';

const safelink = new safelinkify.safelink({
  redirect: [config.external_link.safelink.redirect],
  password: config.external_link.safelink.password,
  type: config.external_link.safelink.type
});

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

const logname = chalk.magenta('[generate]') + chalk.blue('[after]');
const hexoURL = new URL(config.url);
const internal_links = uniqueStringArray([
  ...config.external_link.exclude,
  hexoURL.host,
  'www.webmanajemen.com',
  'https://github.com/dimaslanjaka',
  '/dimaslanjaka1',
  'dimaslanjaka.github.io'
]);

/**
 * filter external links
 * @param href
 * @returns
 */
export function filter_external_links(href: string, debug = false) {
  const result = {
    /**
     * is internal?
     */
    internal: true,
    /**
     * original link or safelink
     */
    href: href
  };
  if (href && href.length > 2) {
    // fix dynamic protocol urls
    const homepage = new URL(config.url);
    // fix dynamic url protocol
    if (href.startsWith('//')) href = 'http:' + href;
    /**
     *  javascript anchors, dot anchors, hash header
     */
    const isExternal = href.trim().match(new RegExp('^(https?)://'));
    const isInternal = isMatch(href.trim(), /^(\.+|#|(javascript|mailto|mail):)/i) && !isExternal;
    const isLength = href.trim().length > 0;
    const isAllowed = isExternal && isLength;
    if (debug) {
      console.log(isInternal, isExternal, isAllowed, href);
    }

    // skip hash and
    if (isAllowed) {
      // only get external links with protocols
      if (href.trim().match(new RegExp('^(https?|ftp)://'))) {
        /**
         * match host
         */
        const matchHost = internal_links.includes(new URL(href).host);
        /**
         * match url
         */
        const matchHref = internal_links.includes(href);
        result.internal = matchHost;
        if (debug) {
          console.log(!matchHost, !matchHref, href);
        }
        if (!matchHost && !matchHref) {
          const safelinkConfig = config.external_link.safelink;
          // apply safelink
          if (safelinkConfig.enable) {
            const safelinkPath = safelink.encodeURL(href);
            if (typeof safelinkPath == 'string' && safelinkPath.length > 0) {
              result.href = safelinkPath;
            }
          }
        }
      }
    }
  }
  return result;
}

const generated_dir = join(root, config.public_dir);
export function staticAfter(done: TaskCallback) {
  // iterate public_dir of _config.yml (hexo generate)
  globSrc('**/*.html', { cwd: generated_dir })
    .map((file) => join(generated_dir, file))
    .then((files) => {
      console.log(logname, 'html files total', files.length);
      return parseAfterGen(files, done);
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

const files: string[] = [];
/**
 * html fixer using queue method
 * @param sources insert once
 * @param callback callback after processed all files
 * @returns
 */
export const parseAfterGen = (sources?: string[], callback?: CallableFunction) => {
  if (sources && sources.length) arrayAddAll(files, sources);
  const skip = () => {
    // if files has members, shift first file, restart function
    if (files.length) {
      files.shift();
      //console.log(logname, 'remaining', files.length + 1);
      return parseAfterGen(null, callback);
    } else if (typeof callback == 'function') {
      return callback();
    }
  };
  if (!files.length) return skip();

  const file = files[0];
  const content = readFileSync(file, 'utf-8');
  const debug = false; //strMatch(file, 'see-blog-position-in-search');
  const result = fixHtmlPost(content, debug);
  writeFileSync(file, result);
  return skip();
};

/**
 * fix html content (safelink, nofollow, etc) using JSDOM
 * @param content
 * @returns
 */
export default function fixHtmlPost(content: string, debug = false) {
  const jd = new jdom();
  const dom = jd.parse(content);
  // fix lang attr
  const html = dom.querySelector('html');
  if (html && !html.hasAttribute('lang')) html.setAttribute('lang', 'en');
  // external link filter
  const hrefs = dom.querySelectorAll('a');
  if (hrefs && hrefs.length > 0) {
    for (let i = 0; i < hrefs.length; i++) {
      const element = hrefs[i];
      const href = element.getAttribute('href');
      const filter = filter_external_links(href, debug);
      if (debug) {
        if (href.includes('seoserp')) console.log(filter, href);
      }
      if (!filter.internal) {
        element.setAttribute('rel', 'nofollow noopener noreferer');
        element.setAttribute('target', '_blank');
      }

      if (config.external_link.safelink && config.external_link.safelink.enable) {
        element.setAttribute('href', filter.href);
      }
    }
  }

  const result = jd.serialize();
  return removeWordpressCDN(result);
}
