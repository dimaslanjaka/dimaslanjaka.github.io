import { Feed } from 'feed';
import moment from 'moment';
import { helpers } from '../../ejs';
import { author_email, author_link, author_name } from '../../ejs/helper/author';
import config from '../../types/_config';

const homepage = new URL(config.url);
const urlfor = helpers.url_for;

const feed = new Feed({
  title: 'Feed Title',
  description: 'This is my personal feed!',
  id: config.url,
  link: config.url,
  language: 'en', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
  image: 'http://example.com/image.png',
  favicon: urlfor('/favicon.ico'),
  copyright: 'All rights reserved ' + moment().format('YYYY') + ', ' + author_name(config),
  updated: new Date(2013, 6, 14), // optional, default = today
  generator: 'static blog generator', // optional, default = 'Feed for Node.js'
  feedLinks: {
    json: urlfor('/feed.json'),
    atom: urlfor('/atom.xml'),
  },
  author: {
    name: author_name(config),
    email: author_email(config),
    link: author_link(config),
  },
});
