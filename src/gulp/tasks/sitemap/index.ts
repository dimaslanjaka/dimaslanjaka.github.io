import Bluebird from 'bluebird';
import chalk from 'chalk';
import gulp from 'gulp';
import moment from 'moment';
import { TaskCallback } from 'undertaker';
import { getLatestDateArray, sortByDate } from '../../../ejs/helper/date';
import { getAllPosts } from '../../../node/cache-post';
import { join, readFileSync, write } from '../../../node/filemanager';
import { postMap } from '../../../parser/post/parsePost';
import config, { post_generated_dir } from '../../../types/_config';

/// define global variable without refetch them
const logname = chalk.magentaBright('[sitemap-xml]');
const homepage = new URL(config.url);
/**
 * list posts of each categories
 */
const listCats: { [key: string]: Partial<postMap>[] } = {};
/**
 * list posts of each tags
 */
const listTags: { [key: string]: Partial<postMap>[] } = {};
/**
 * all mapped posts
 */
const allPosts = (() => {
  try {
    return (
      Bluebird.all(getAllPosts())
        .map((post) => {
          if (!post) return;
          if (!post.metadata.type || !post.metadata.type.length)
            if (post.fileTree)
              if (typeof post.fileTree.public == 'string')
                if (!post.metadata.type)
                  post.metadata.type = post.fileTree.public.includes('_posts')
                    ? 'post'
                    : 'page';
          const cats = post.metadata.category;
          const tags = post.metadata.tags;
          if (cats) {
            if (Array.isArray(cats)) {
              cats.forEach((cat) => {
                if (!listCats[cat]) listCats[cat] = [];
                listCats[cat].push(post);
              });
            }
          }
          if (tags) {
            if (Array.isArray(tags)) {
              tags.forEach((tag) => {
                if (!listTags[tag]) listTags[tag] = [];
                listTags[tag].push(post);
              });
            }
          }
          return post;
        })
        // filter unecessary files
        .filter((post) => {
          if (!post) return false;
          if (!post.metadata) return false;
          if (!post.metadata.url) return false;
          const u = post.metadata.url;
          const ex = {
            /**
             * standard non-sitemap files
             */
            major: !u.match(
              /\/.(guid|git|eslint|tslint|prettierc)|(404).html$/
            ),
            /**
             * project test development files
             */
            dev: !u.match(/(Test|guide)\//)
          };
          return Object.values(ex).every(Boolean);
        })
    );
  } catch (error) {
    return Bluebird.resolve([]);
  }
})();

/**
 * copy asset sitemaps
 */
function copy() {
  const srcdir = join(__dirname, 'views');
  console.log(logname, 'copy', srcdir, '->', post_generated_dir);
  return gulp
    .src('**/*.{xsd,xsl}', { cwd: srcdir })
    .pipe(gulp.dest(post_generated_dir));
}

function generateLabels(done?: TaskCallback) {
  const sourceIndexXML = join(__dirname, 'views/tag-sitemap.xml');
  const readXML = readFileSync(sourceIndexXML, 'utf-8');
  const mapTags = [];
  // generate tags by tag name
  for (const tagname in listCats) {
    if (Object.prototype.hasOwnProperty.call(listCats, tagname)) {
      const tags = listCats[tagname].sort(sortByDate).map((item) => {
        if (item.metadata.updated)
          return moment(item.metadata.updated.toString());
        if (item.metadata.date) return moment(item.metadata.date.toString());
      });
      const lastmod = moment(getLatestDateArray(tags)).format(
        'YYYY-MM-DDTHH:mm:ssZ'
      );
      homepage.pathname = join(config.tag_dir, tagname);
      const url = homepage.toString();
      const str = `<url><loc>${url}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>`;
      mapTags.push(str);
    }
  }
  const buildXML = readXML.replace(
    /<url>+[\s\S\n]*<\/url>/gm,
    mapTags.join('\n')
  );
  write(join(post_generated_dir, 'tag-sitemap.xml'), buildXML).then((f) => {
    console.log(f);
    if (typeof done == 'function') done();
  });
}

/**
 * generate posts and pages sitemap
 * @param done
 */
function generatePages(done?: TaskCallback) {
  const sourceIndexXML = join(__dirname, 'views/post-sitemap.xml');
  const readXML = readFileSync(sourceIndexXML, 'utf-8');
  const posts = [];
  const pages = [];
  allPosts
    .then((posts) => {
      return posts.sort(sortByDate);
    })
    .each((post) => {
      const lastmod = moment(post.metadata.updated).format(
        'YYYY-MM-DDTHH:mm:ssZ'
      );
      let str: string;
      if (post.metadata.type == 'post') {
        str = `<url><loc>${post.metadata.url}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>1.0</priority></url>`;
        posts.push(str);
      } else {
        str = `<url><loc>${post.metadata.url}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`;
        pages.push(str);
      }
    })
    .finally(() => {
      let buildXML = readXML.replace(
        /<url>+[\s\S\n]*<\/url>/gm,
        posts.join('\n')
      );
      write(join(post_generated_dir, 'post-sitemap.xml'), buildXML).then(
        (f) => {
          console.log(logname, f);
          buildXML = readXML.replace(
            /<url>+[\s\S\n]*<\/url>/gm,
            pages.join('\n')
          );
          write(join(post_generated_dir, 'page-sitemap.xml'), buildXML).then(
            (f) => {
              console.log(logname, f);
              if (typeof done == 'function') done();
            }
          );
        }
      );
    });
}

/**
 * generated sitemap index
 * @see {@link https://yoast.com/sitemap_index.xml}
 * @param done
 */
async function generateIndex(done?: TaskCallback) {
  const sourceIndexXML = join(__dirname, 'views/sitemap.xml');
  const readXML = readFileSync(sourceIndexXML, 'utf-8');

  /**
   * get latest date of tags
   */
  const latestTag = await allPosts
    .map((item) => {
      if (item.metadata.tags && item.metadata.tags.length) {
        if (item.metadata.updated) return moment(item.metadata.updated);
        if (item.metadata.date) return moment(item.metadata.date);
      }
    })
    .then(getLatestDateArray)
    .then((date) => {
      return `<sitemap><loc>${config.url.replace(
        /\/+$/,
        ''
      )}/tag-sitemap.xml</loc><lastmod>${date}</lastmod></sitemap>`;
    });
  /**
   * get latest date of categories
   */
  const latestCat = await allPosts
    .map((item) => {
      if (item.metadata.category && item.metadata.category.length) {
        if (item.metadata.updated) return moment(item.metadata.updated);
        if (item.metadata.date) return moment(item.metadata.date);
      }
    })
    .then(getLatestDateArray)
    .then((date) => {
      return `<sitemap><loc>${config.url.replace(
        /\/+$/,
        ''
      )}/category-sitemap.xml</loc><lastmod>${date}</lastmod></sitemap>`;
    });

  const latestPost = await allPosts
    .map((item) => {
      if (item.metadata.type && item.metadata.type == 'post') {
        if (item.metadata.updated) return moment(item.metadata.updated);
        if (item.metadata.date) return moment(item.metadata.date);
      }
    })
    .then(getLatestDateArray)
    .then((date) => {
      return `<sitemap><loc>${config.url.replace(
        /\/+$/,
        ''
      )}/post-sitemap.xml</loc><lastmod>${date}</lastmod></sitemap>`;
    });

  const latestPage = await allPosts
    .map((item) => {
      if (item.metadata.type && item.metadata.type == 'page') {
        if (item.metadata.updated) return moment(item.metadata.updated);
        if (item.metadata.date) return moment(item.metadata.date);
      }
    })
    .then(getLatestDateArray)
    .then((date) => {
      // if no page exist, return latest post date
      if (!date)
        return latestPost.replace('post-sitemap.xml', 'page-sitemap.xml');
      return `<sitemap><loc>${config.url.replace(
        /\/+$/,
        ''
      )}/page-sitemap.xml</loc><lastmod>${date}</lastmod></sitemap>`;
    });

  const buildStr = [latestTag, latestCat, latestPost, latestPage];
  const buildXML = readXML.replace(
    /<sitemap>+[\s\S\n]*<\/sitemap>/gm,
    buildStr.join('\n')
  );
  write(join(post_generated_dir, 'sitemap.xml'), buildXML).then((f) => {
    console.log(logname, f);
    if (typeof done == 'function') done();
  });
}

gulp.task(
  'generate:sitemap-xml',
  gulp.series(copy, generateIndex, generatePages)
);
