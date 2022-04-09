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
import { modifyPost } from './copy';
import { parsePostReturn } from '../../markdown/transformPosts';
import { renderer } from './generate';
import './sitemap';

const logname = chalk.cyanBright('[generate][sitemap]');
const pages = new Sitemap();

/**
 * Genearate Google News Sitemap
 * * save to `config.public_dir/sitemap-news.xml`
 * @param done
 */
function generateGoogleNewsSitemap(done: TaskCallback) {
  const map = new GoogleNewsSitemap();
  const log = logname + chalk.blue('[google-news]');

  Bluebird.all(pages.getValues())
    .map((item) => {
      const val: ClassItemType = {
        publication_name: item.author,
        publication_language: item.lang || 'en',
        publication_date: item.date,
        title: item.title,
        location: fixURLSitemap(item.url).toString(),
      };
      return map.add(val);
    })
    .then((i) => {
      console.log(log, 'total pages', i.length);
      write(join(root, config.public_dir, 'sitemap-news.xml'), map.toString()).then((f) => {
        console.log(log, 'saved', f);
      });
    })
    .finally(() => done());
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
  Bluebird.all(pages.getValues())
    .map((item) => {
      return `<a href="${fixURLSitemap(item.url).pathname}">${item.title}</a>`;
    })
    .then((items) => {
      const content = items.join('<br/>');
      const opt: parsePostReturn = {
        metadata: {
          title: 'Sitemap',
          subtitle: 'Sitemap ' + new URL(config.url).host,
          content: content,
          date: moment().format(),
          updated: moment().format(),
          category: [],
          tags: [],
        },
        body: content || '',
        content: content || '',
        fileTree: {
          source: join(cwd(), '.guid'),
          public: join(cwd(), '.guid'),
        },
      };
      const modify = modifyPost(opt);
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
gulp.task('generate:gn-sitemap', generateGoogleNewsSitemap);
gulp.task('generate:sitemap-html', generateSitemapHtml);
gulp.task('generate:sitemap-txt', generateSitemapText);
// combine all sitemap tasks
gulp.task('generate:sitemap', gulp.series('generate:gn-sitemap', 'generate:sitemap-html', 'generate:sitemap-txt', 'generate:sitemap-xml'));
