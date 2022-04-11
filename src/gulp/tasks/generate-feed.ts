import { Feed } from 'feed';
import { helpers } from '../../ejs';
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
  favicon: 'http://example.com/favicon.ico',
  copyright: 'All rights reserved 2013, John Doe',
  updated: new Date(2013, 6, 14), // optional, default = today
  generator: 'awesome', // optional, default = 'Feed for Node.js'
  feedLinks: {
    json: 'https://example.com/json',
    atom: 'https://example.com/atom',
  },
  author: {
    name: 'John Doe',
    email: 'johndoe@example.com',
    link: 'https://example.com/johndoe',
  },
});
