"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sitemapCrawlerAsync = exports.sitemapCrawler = exports.SiteMapCrawlerCore = void 0;
const async_1 = __importDefault(require("async"));
const bluebird_1 = __importDefault(require("bluebird"));
const cheerio_1 = __importDefault(require("cheerio"));
const progress_1 = __importDefault(require("progress"));
const request_1 = __importDefault(require("request"));
const utils_1 = require("../utils");
class SiteMapCrawlerCore {
    static start(links, core_opt, isCounting, callback) {
        const { isProgress, isLog } = core_opt;
        const siteMap = {};
        let bar;
        if (isProgress) {
            bar = new progress_1.default('siteMap-crawling [:bar] :percent', {
                total: links.length
            });
        }
        async_1.default.each(links, (link, callback) => {
            const done = () => {
                if (isProgress) {
                    bar.tick();
                }
                callback();
            };
            const self = this;
            (0, request_1.default)(link, (err, res, body) => {
                if (err) {
                    if (isLog) {
                        const { errno, code, syscall, host } = err;
                        console.log(`\nError: ${errno} ${code} ${syscall}, ${host}`);
                    }
                    return done();
                }
                try {
                    const $ = cheerio_1.default.load(body);
                    const hrefs = $('[href]');
                    const filteredLinks = new Set();
                    hrefs.each(function (i) {
                        var _a, _b;
                        if (((_a = hrefs.eq(i).get(0)) === null || _a === void 0 ? void 0 : _a.tagName.toLowerCase()) !== 'a') {
                            const href = hrefs.eq(i).attr('href');
                            if (!href || !/(\/|.html)$/gi.test(href))
                                return;
                        }
                        const href = (_b = self.filterLink(link, hrefs.eq(i).attr('href') || '')) === null || _b === void 0 ? void 0 : _b.trim();
                        if (typeof href === 'string' && href.length > 0) {
                            const dirUrl = link.substring(0, link.lastIndexOf('/'));
                            if (/^https?:\/\//i.test(href.trim())) {
                                filteredLinks.add(href);
                            }
                            else {
                                filteredLinks.add(dirUrl + '/' + href);
                            }
                        }
                    });
                    const arrayLinks = Array.from(filteredLinks).map((url) => {
                        if (url.endsWith('/')) {
                            // url ends with. / -> /index.html
                            url += 'index.html';
                        }
                        else if (!/(\w+\.\w+)$/.test(url)) {
                            // url doesnt have extension. /path -> /path/index.html
                            url += '/index.html';
                        }
                        if (!core_opt.keepQuery)
                            return url.split('?')[0];
                        return url;
                    });
                    if (arrayLinks.length > 0) {
                        siteMap[link] = arrayLinks;
                    }
                }
                catch (_a) {
                    console.log('sitemap-crawler', 'cannot parse', link);
                }
                return done();
            });
        }, (err) => {
            if (err) {
                return callback(err);
            }
            const count = Object.keys(siteMap).length;
            const siteMapObj = isCounting ? { count, siteMap } : siteMap[links];
            callback(null, siteMapObj);
        });
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
            'svg',
            'manifest.json',
            'pdf$',
            '^tel',
            '^sms',
            '^mailto',
            'admin',
            'login',
            'register'
        ];
        const rIgnores = new RegExp(ignores.join('|'), 'i');
        if (isValidHttpUrl(href)) {
            const parentHostName = new URL(parent).hostname;
            const hrefHostName = new URL(href).hostname;
            if (parentHostName === hrefHostName && !href.match(rIgnores)) {
                return href;
            }
        }
        if (!href.match(rIgnores) && !href.includes('//')) {
            const base = new URL(parent);
            const resolvedUrl = fixUrl([String(new URL(base.origin + '/' + href))])[0];
            //console.log(parent, href, resolvedUrl);
            return resolvedUrl;
        }
        return null;
    }
}
exports.SiteMapCrawlerCore = SiteMapCrawlerCore;
/**
 * add protocol
 * @param link
 * @returns empty string when invalid link
 */
function attachProtocol(link) {
    if (link.startsWith('/')) {
        (0, utils_1.debug)('sitemap-crawler')('start with slash', link);
        return '';
    }
    else if (link.startsWith('#')) {
        (0, utils_1.debug)('sitemap-crawler')('start with hash', link);
        return '';
    }
    if (!/^https?:/i.test(link)) {
        return 'http://' + link;
    }
    return link;
}
const sitemapCrawler = (link, opts, callback) => {
    let isProgress = false, isLog = false, isCounting = true;
    opts = Object.assign({ isProgress: false, isLog: false }, opts || {});
    if (typeof opts === 'function') {
        callback = opts;
    }
    else {
        isProgress = opts.isProgress || false;
        isLog = opts.isLog || false;
    }
    if (typeof link === 'string') {
        link = attachProtocol(link);
        link = [link];
        isCounting = false;
    }
    else {
        link = link.map((l) => {
            return attachProtocol(l);
        });
    }
    SiteMapCrawlerCore.start(link, {
        isProgress,
        isLog
    }, isCounting, callback || noop);
};
exports.sitemapCrawler = sitemapCrawler;
const asyncResults = {};
/**
 * Sitemap Crawler Asynchronous
 * @param link
 * @param opts
 * @returns
 */
function sitemapCrawlerAsync(link, opts) {
    return new bluebird_1.default((resolve) => {
        // assign with default option
        opts = Object.assign({ deep: 0, isLog: false, keepQuery: false, isProgress: false }, opts || {});
        // crawler
        const crawl = (url) => {
            return new bluebird_1.default((resolveCrawl) => {
                (0, exports.sitemapCrawler)(url, opts, function (e, links) {
                    if (!e) {
                        const key = new URL(url).origin;
                        // append to asyncResult
                        asyncResults[key] = fixUrl(links || []).concat(asyncResults[key] || []);
                    }
                    else {
                        console.log('err', e);
                    }
                    resolveCrawl(asyncResults);
                });
            });
        };
        let linkArr = [];
        const crawled = [];
        const schedule = () => {
            return new bluebird_1.default((resolveSchedule) => {
                const url = linkArr.shift();
                if (crawled.includes(url))
                    return resolveSchedule();
                crawled.push(url);
                crawl(url).then(() => {
                    if (linkArr.length > 0) {
                        schedule().then(resolveSchedule);
                    }
                    else {
                        resolveSchedule();
                    }
                });
            });
        };
        if (typeof link === 'string') {
            linkArr.push(link);
        }
        else {
            linkArr = link;
        }
        const deepIterate = () => {
            return new Promise((resolveLoop) => {
                schedule().then(() => {
                    if (typeof (opts === null || opts === void 0 ? void 0 : opts.deep) === 'number') {
                        if (opts.deep > 0) {
                            opts.deep = opts.deep - 1;
                            linkArr = Object.values(asyncResults).flat(1);
                            deepIterate().then(resolveLoop);
                        }
                        else {
                            resolveLoop(null);
                        }
                    }
                    else {
                        resolveLoop(null);
                    }
                });
            });
        };
        deepIterate().then(() => {
            Object.keys(asyncResults).forEach((key) => {
                asyncResults[key] = fixUrl(asyncResults[key]);
            });
            resolve(asyncResults);
        });
    });
}
exports.sitemapCrawlerAsync = sitemapCrawlerAsync;
exports.default = exports.sitemapCrawler;
function noop() {
    //
}
function isValidHttpUrl(string) {
    let url;
    try {
        url = new URL(string);
    }
    catch (_) {
        return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
}
function fixUrl(links) {
    return (links
        .map((url) => {
        //const parse = new URL(url);
        //url = parse.toString();
        // remove double slash from pathname
        url = url.replace(/(https?:\/\/)|(\/)+/gim, '$1$2');
        return url;
    })
        // remove duplicated urls
        .filter(function (x, i, a) {
        return a.indexOf(x) === i;
    })
        // sort alphabetically
        .sort(function (a, b) {
        return a === b ? 0 : a < b ? -1 : 1;
    }));
}
