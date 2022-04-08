import Sitemap from '../../node/cache-sitemap';
import GoogleNewsSitemap, { ClassItemType } from 'google-news-sitemap/src';
import { author_name } from '../../ejs/helper/author';
import Bluebird from 'bluebird';

const pages = new Sitemap();
const map = new GoogleNewsSitemap();
const transform = pages.getValues().map((item) => {
  const val: ClassItemType = {
    publication_name: item.author,
    publication_language: item.lang || 'en',
    publication_date: item.date,
    title: item.title,
    location: item.location || '',
  };
  return map.add(val);
});
Bluebird.all(transform).then((i) => console.log(i.length));
