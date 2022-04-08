import gulp from 'gulp';
import moment from 'moment';
import { TaskCallback } from 'undertaker';
import CachePost from '../../../node/cache-post';
import { join, readFileSync, write } from '../../../node/filemanager';
import config, { post_generated_dir } from '../../../types/_config';
import 'js-prototypes';
import Bluebird from 'bluebird';

const postCache = new CachePost();

/**
 * copy asset sitemaps
 */
function copy() {
  return gulp.src('**/*.{xsd,xsl}', { cwd: join(__dirname, 'views') }).pipe(gulp.dest(post_generated_dir));
}

function getLatestDateArray(arr: any[]) {
  return arr.removeEmpties().reduce((a, b) => (a > b ? a : b));
}

async function generateIndex(done?: TaskCallback) {
  const sourceIndexXML = join(__dirname, 'views/sitemap.xml');
  const readXML = readFileSync(sourceIndexXML, 'utf-8');

  const all = postCache.getAll();
  const latestTag = await Bluebird.all(all)
    .map((item) => {
      if (item.metadata.tags && item.metadata.tags.length) {
        if (item.metadata.updated) return moment(item.metadata.updated);
        if (item.metadata.date) return moment(item.metadata.date);
      }
    })
    .then<moment.Moment>(getLatestDateArray)
    .then((date) => {
      return `<sitemap><loc>${config.url.replace(/\/+$/, '')}/tag-sitemap.xml</loc><lastmod>${date}</lastmod></sitemap>`;
    });
  const latestCat = await Bluebird.all(all)
    .map((item) => {
      if (item.metadata.category && item.metadata.category.length) {
        if (item.metadata.updated) return moment(item.metadata.updated);
        if (item.metadata.date) return moment(item.metadata.date);
      }
    })
    .then<moment.Moment>(getLatestDateArray)
    .then((date) => {
      return `<sitemap><loc>${config.url.replace(/\/+$/, '')}/category-sitemap.xml</loc><lastmod>${date}</lastmod></sitemap>`;
    });

  const buildStr = [latestTag, latestCat];
  const buildXML = readXML.replace(/<sitemap>+[\s\S\n]*<\/sitemap>/gm, buildStr.join('\n'));
  write(join(post_generated_dir, 'sitemap.xml'), buildXML).then((f) => {
    console.log(f);
    if (typeof done == 'function') done();
  });
  /*const parseXML = postCache.getAll().map((item) => {
    return `<sitemap><loc>${item.metadata.url}</loc><lastmod>${moment(item.metadata.updated)}</lastmod></sitemap`;
  });
  */
}

gulp.task('generate:sitemap-xml', gulp.series(copy, generateIndex));

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
