"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sitemapCrawlerAsync = exports.sitemapCrawler = exports.SiteMapCrawler = void 0;
const tslib_1 = require("tslib");
const siteMap = tslib_1.__importStar(require("./sitemap-crawler"));
//module 'sitemap-crawler'
tslib_1.__exportStar(require("./sitemap-crawler"), exports);
var sitemap_crawler_1 = require("./sitemap-crawler");
Object.defineProperty(exports, "SiteMapCrawler", { enumerable: true, get: function () { return sitemap_crawler_1.SiteMapCrawlerCore; } });
Object.defineProperty(exports, "sitemapCrawler", { enumerable: true, get: function () { return sitemap_crawler_1.sitemapCrawler; } });
Object.defineProperty(exports, "sitemapCrawlerAsync", { enumerable: true, get: function () { return sitemap_crawler_1.sitemapCrawlerAsync; } });
exports.default = siteMap.sitemapCrawler;
//# sourceMappingURL=index.js.map