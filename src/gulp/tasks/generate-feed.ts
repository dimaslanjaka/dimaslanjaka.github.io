import Bluebird from 'bluebird';
import { Feed, Item } from 'feed';
import gulp from 'gulp';
import moment from 'moment';
import { helpers } from '../../ejs';
import { author_email, author_link, author_name, author_object } from '../../ejs/helper/author';
import { excerpt } from '../../ejs/helper/excerpt';
import { thumbnail } from '../../ejs/helper/thumbnail';
import { getAllPosts, getLatestPosts } from '../../node/cache-post';
import color from '../../node/color';
import { join, write } from '../../node/filemanager';
import config, { post_generated_dir } from '../../types/_config';
import { isValidHttpUrl } from '../utils';

const logname = color['Fuzzy Wuzzy']('[feeds]');
const urlfor = helpers.url_for;

function generateFeeds() {
  return new Bluebird((resolve) => {
    // https://github.com/jpmonette/feed
    const feed = new Feed({
      title: config.title,
      description: excerpt(config),
      id: config.url,
      link: config.url,
      language: 'en', // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
      image: urlfor(config.logo),
      favicon: urlfor(config.favicon),
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

    getLatestPosts('date', getAllPosts().length).forEach((post) => {
      try {
        const obj: Item = {
          title: post.metadata.title,
          id: new URL(post.metadata.url).toString(),
          link: new URL(post.metadata.url).toString(),
          description: excerpt(post.metadata),
          author: [author_object(post.metadata)],
          date: moment(post.metadata.date.toString()).toDate(),
          image: thumbnail(post.metadata),
          content: excerpt(post.metadata),
        };
        if (config.feed.content) {
          obj.content = post.content;
        }
        let isImgValid = isValidHttpUrl(String(obj.image));
        if (!isImgValid) {
          if (String(obj.image).startsWith('/')) obj.image = urlfor(String(obj.image));
        }
        isImgValid = isValidHttpUrl(String(obj.image));
        if (isImgValid && typeof obj.image == 'string') {
          obj.image = obj.image.replace(/[\u00A0-\u9999<>&]/g, function (i) {
            return '&#' + i.charCodeAt(0) + ';';
          });
          feed.addItem(obj);
        } else {
          console.log(logname, 'invalid image url', post.metadata.title, obj.image);
        }
      } catch (error) {
        console.log(logname, error.message, post.metadata.title);
      }
    });

    if (Array.isArray(config.feed.type)) {
      config.feed.type.forEach((feedtype, index) => {
        let result: string;
        let ext: string;
        const is = {
          atom: feedtype == 'atom',
          rss: feedtype == 'rss2' || feedtype == 'rss',
          json: feedtype == 'json',
        };
        try {
          if (is.json) {
            ext = '.json';
            result = feed.json1();
          }
          if (is.rss || is.atom) {
            ext = '.xml';
            if (is.atom) {
              result = feed.atom1();
            } else {
              result = feed.rss2();
            }
          }
          if (typeof result == 'string' && typeof ext == 'string') {
            if (feedtype == 'rss2') feedtype = 'rss';
            const dest = join(post_generated_dir, feedtype + ext);
            write(dest, result).then((path) => {
              console.log(logname, 'generated', path);
              if (index == config.feed.type.length - 1) resolve();
            });
          }
        } catch (error) {
          console.log(logname, error.message);
        }
      });
    }
  });
}

gulp.task('generate:feeds', generateFeeds);
