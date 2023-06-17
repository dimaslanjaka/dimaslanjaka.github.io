import * as siteMap from './sitemap-crawler';
export * from './sitemap-crawler';
export { SiteMapCrawlerCore as SiteMapCrawler, sitemapCrawler, sitemapCrawlerAsync } from './sitemap-crawler';
declare const _default: (link: string | string[], opts?: siteMap.Opt | undefined, callback?: ((arg0: Error | null, arg1?: string[] | undefined) => void) | undefined) => void;
export default _default;
