import moment from 'moment';
import { create as createXML } from 'xmlbuilder2';
import CachePost from '../../../node/cache-post';
import { join, readFileSync } from '../../../node/filemanager';

const postCache = new CachePost();

function sitemapindex() {
  const sourceIndexXML = join(__dirname, 'views/sitemap.xml');
  const sitemapIndexDoc = createXML(readFileSync(sourceIndexXML).toString());
  const sitemapIndex = <SitemapIndex>new Object(sitemapIndexDoc.end({ format: 'object' }));
  sitemapIndex.sitemapindex.sitemap = [];
  const lastmod = postCache.getAll().map((item) => {
    return moment(item.metadata.updated);
  });
  console.log(lastmod.length);
}

sitemapindex();

interface sitemapItem {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}
interface sitemapObj {
  urlset: {
    url: sitemapItem[];
  };
}
interface sitemapGroup {
  post: sitemapObj;
  page: sitemapObj;
  tag: sitemapObj;
  category: sitemapObj;
}
const sitemapGroup: sitemapGroup = {
  post: undefined,
  page: undefined,
  tag: undefined,
  category: undefined,
};
interface SitemapIndex {
  sitemapindex: {
    sitemap: SitemapIndexItem[];
  };
}
interface SitemapIndexItem {
  loc: string;
  lastmod: string;
}
