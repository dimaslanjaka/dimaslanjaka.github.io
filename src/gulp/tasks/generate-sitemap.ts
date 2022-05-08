import Sitemap from '../../node/cache-sitemap';
import GoogleNewsSitemap, { ClassItemType } from 'google-news-sitemap/src';
import Bluebird from 'bluebird';
import { cwd, join, write } from '../../node/filemanager';
import config, { root } from '../../types/_config';
import gulp from 'gulp';
import { TaskCallback } from 'undertaker';
import chalk from 'chalk';
import 'js-prototypes';
import moment from 'moment';
import { renderer } from './generate-posts';
import './sitemap';
import modifyPost from '../../markdown/transformPosts/modifyPost';
import { postMap } from '../../markdown/transformPosts/parsePost';

const logname = chalk.cyanBright('[generate][sitemap]');
const pages = new Sitemap();

/**
 * Genearate Google News Sitemap
 * * save to `config.public_dir/sitemap-news.xml`
 * @param done
 */
async function generateGoogleNewsSitemap(done: TaskCallback) {
  const map = new GoogleNewsSitemap();
  const log = logname + chalk.blue('[google-news]');

  try {
    const i = await Bluebird.all(pages.getValues().removeEmpties()).map((item) => {
      const val: ClassItemType = {
        publication_name: item.author,
        publication_language: item.lang || 'en',
        publication_date: item.date.toString(),
        title: item.title,
        location: fixURLSitemap(item.url).toString(),
      };
      return map.add(val);
    });
    console.log(log, 'total pages', i.length);
    write(join(root, config.public_dir, 'sitemap-news.xml'), map.toString()).then((f) => {
      console.log(log, 'saved', f);
    });
  } finally {
    done();
  }
}

/**
 * fix url
 * * fix multiple slashes
 * @param url url string
 * @returns instance {@link URL}
 */
function fixURLSitemap(url: string) {
  const parseURL = new URL(url);
  parseURL.pathname = parseURL.pathname.replace(/\/+/, '/').replace(/.md$/, '.html');
  return parseURL;
}

/**
 * generate sitemap html
 * * save to `config.public_dir/sitemap.html`
 * @param done
 */
function generateSitemapHtml(done?: TaskCallback) {
  const log = logname + chalk.blue('[html]');
  //const exclude = config.sitemap.exclude.map((s) => '!' + s.replace(/^!+/, ''));
  Bluebird.all(pages.getValues())
    .map((item) => {
      if (!item.url) {
        console.log(log, 'invalid url', item.title || item);
        return;
      }
      return `<a href="${fixURLSitemap(item.url).pathname}">${item.title}</a>`;
    })
    .then((items) => {
      if (!items.length) {
        console.log(log, 'sitemap item empty');
        return done();
      }
      const content = items.join('<br/>');
      const url = new URL(config.url);
      url.pathname = '/sitemap.html';
      const opt: postMap = {
        metadata: {
          title: 'Sitemap',
          subtitle: 'Sitemap ' + new URL(config.url).host,
          date: moment().format(),
          updated: moment().format(),
          category: [],
          tags: [],
          url: url.toString(),
          type: 'page',
        },
        body: content,
        content: content,
        fileTree: {
          source: join(cwd(), '.guid'),
          public: join(cwd(), '.guid'),
        },
      };
      const modify = modifyPost(opt);
      if (modify.sitedata) delete modify.sitedata;
      //console.log(modify);
      renderer(modify).then((rendered) => {
        write(join(root, config.public_dir, 'sitemap.html'), rendered).then((f) => {
          console.log(log, 'saved', f);
          done();
        });
      });
    });
}

function generateSitemapText(done?: TaskCallback) {
  const log = logname + chalk.blue('[txt]');
  Bluebird.all(pages.getValues())
    .map((item) => {
      return fixURLSitemap(item.url).toString();
    })
    .then((items) => {
      write(join(root, config.public_dir, 'sitemap.txt'), items.join('\n')).then((f) => {
        console.log(log, 'saved', f);
        done();
      });
    });
}

// separate sitemap tasks
gulp.task('generate:sitemap-news', generateGoogleNewsSitemap);
gulp.task('generate:sitemap-html', generateSitemapHtml);
gulp.task('generate:sitemap-txt', generateSitemapText);
// combine all sitemap tasks
gulp.task(
  'generate:sitemap',
  gulp.series('generate:sitemap-news', 'generate:sitemap-html', 'generate:sitemap-txt', 'generate:sitemap-xml')
);
