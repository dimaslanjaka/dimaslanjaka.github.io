const request = require('request');
const cheerio = require('cheerio');
const async = require('async');
const url = require('url');
const ProgressBar = require('progress');

class SiteMapCrawler {
  static start(links, isProgress, isLog, isCounting, callback) {
    const siteMap = {};
    let bar;

    if (isProgress) {
      bar = new ProgressBar('siteMap-crawling [:bar] :percent', {
        total: links.length
      });
    }

    async.each(
      links,
      (link, callback) => {
        const done = () => {
          if (isProgress) {
            bar.tick();
          }

          callback();
        };

        request(link, (err, res, body) => {
          if (err) {
            if (isLog) {
              const { errno, code, syscall, host } = err;
              console.log(`\nError: ${errno} ${code} ${syscall}, ${host}`);
            }
            return done();
          }

          const $ = cheerio.load(body);
          const hrefs = $('[href]');
          let filteredLinks = new Set();

          hrefs.each((i) => {
            const href = this.filterLink(link, hrefs.eq(i).attr('href'));

            if (href) {
              filteredLinks.add(href);
            }
          });

          filteredLinks = [...filteredLinks];

          if (filteredLinks.length > 0) {
            siteMap[link] = filteredLinks;
          }
          return done();
        });
      },
      (err) => {
        if (err) {
          return callback(err);
        }

        const count = Object.keys(siteMap).length;
        const siteMapObj = isCounting ? { count, siteMap } : siteMap[links];

        callback(null, siteMapObj);
      }
    );
  }

  static filterLink(parent, href) {
    const ignores = [
      '^javascript',
      'css',
      'ico',
      '#',
      '^/$',
      '^#none$',
      '^$',
      '@',
      'png',
      'pdf$',
      '^tel',
      '^sms',
      '^mailto',
      'admin',
      'login',
      'register'
    ];
    const rIgnores = new RegExp(ignores.join('|'), 'i');

    if (href.startsWith('http')) {
      const parentHostName = new URL(parent).hostname;
      const hrefHostName = new URL(href).hostname;

      if (parentHostName === hrefHostName && !href.match(rIgnores)) {
        return href;
      }
    }

    if (!href.match(rIgnores) && !href.includes('//')) {
      return url.resolve(parent, href);
    }

    return null;
  }
}

const attachProtocol = (link) => {
  if (!link.startsWith('http')) {
    return 'http://' + link;
  }

  return link;
};

const siteMap = (link, opts, callback) => {
  let isProgress,
    isLog,
    isCounting = true;

  if (typeof opts === 'function') {
    callback = opts;
  } else {
    isProgress = opts.isProgress || false;
    isLog = opts.isLog || false;
  }

  if (typeof link === 'string') {
    link = attachProtocol(link);
    link = [link];
    isCounting = false;
  } else {
    link = link.map((l) => {
      return attachProtocol(l);
    });
  }

  SiteMapCrawler.start(link, isProgress, isLog, isCounting, callback);
};

module.exports = siteMap;
