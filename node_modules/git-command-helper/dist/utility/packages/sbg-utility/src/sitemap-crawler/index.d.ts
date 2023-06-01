import * as siteMap from './sitemap-crawler';
export * from './sitemap-crawler';
export { SiteMapCrawlerCore as SiteMapCrawler, sitemapCrawler, sitemapCrawlerAsync } from './sitemap-crawler';
declare const _default: (link: string | string[], opts?: siteMap.Opt, callback?: (arg0: Error, arg1?: string[]) => void) => void;
export default _default;
