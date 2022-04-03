'use strict';
/* eslint-disable @typescript-eslint/no-unused-vars */
//import "./packages/hexo-seo/packages/js-prototypes/src/globals";
//import "./src/node/console";
import gulp from 'gulp';
// `gulp article:copy`
import article_copy, { modifyPost } from './src/gulp/tasks/article-copy';
import 'js-prototypes';
import modify_file from './src/gulp/modules/modify-file';
import transformPosts, { parsePost } from './src/markdown/transformPosts';
import browser_sync from 'browser-sync';
import ejs from 'ejs';
import rename from './src/gulp/modules/rename';
import through2 from 'through2';
import { join, relative } from './src/node/filemanager';
const config = {
  title: 'WMI',
  subtitle: 'Website Management Indonesia is a blog about scripts, tips and tricks, games, software. Covering php, javascript, jquery, mysql, seo, e-commerce and others.',
  description: 'Website Management Indonesia is a blog about scripts, tips and tricks, games, software. Covering php, javascript, jquery, mysql, seo, e-commerce and others.',
  subtitle_desc: 'Website Management Indonesia is a blog about scripts, tips and tricks, games, software. Covering php, javascript, jquery, mysql, seo, e-commerce and others.',
  keywords: 'how to,php,javascript,blog',
  timezone: 'Asia/Jakarta',
  url: 'https://www.webmanajemen.com',
  author: {
    name: 'Dimas Lanjaka',
    link: 'https://fb.me/dimaslanjaka1',
    image: 'https://res.cloudinary.com/dimaslanjaka/image/fetch/https://imgdb.net/images/3600.jpg',
  },
  source_dir: 'source',
  public_dir: 'docs',
  tag_dir: 'tags',
  archive_dir: 'archives',
  category_dir: 'categories',
  introduction: '',
  search: undefined,
  root: '',
  permalink: '',
  pretty_urls: undefined,
  code_dir: '',
  i18n_dir: '',
  new_post_name: '',
  default_layout: '',
  titlecase: false,
  filename_case: 0,
  render_drafts: false,
  post_asset_folder: false,
  relative_link: false,
  future: false,
  highlight: undefined,
  prismjs: undefined,
  index_generator: undefined,
  default_category: '',
  meta_generator: false,
  date_format: '',
  time_format: '',
  updated_option: false,
  per_page: 0,
  pagination_dir: '',
  server: undefined,
  theme: '',
  deploy: undefined,
  social_links: undefined,
  feed: undefined,
  sitemap: undefined,
  related_posts: undefined,
  markdown_it_plus: undefined,
  browsersync: undefined,
  adsense: undefined,
  analytics: undefined,
  seo: undefined,
};
const source_dir = join(__dirname, config.source_dir, '_posts');
const public_dir = join(__dirname, config.public_dir);
// just copy and process from source posts (src-posts) to production posts (source/_posts)
gulp.task('article:copy', function () {
  //return articleCopy(config, done);
  return gulp.src(['src-posts/**/**']).pipe(gulp.dest(source_dir));
});
gulp.task('article:process', function () {
  return gulp
    .src(join(source_dir, '/**/**.md'))
    .pipe(
      modify_file(function (content, path, file) {
        const parse = parsePost(Buffer.isBuffer(content) ? content.toString() : content);
        if (parse) {
          parse.fileTree = {
            source: path.toString().replace('/source/_posts/', '/src-posts/'),
            public: path.toString().replace('/src-posts/', '/source/_posts/'),
          };
        }
        const modify = modifyPost(parse);
        console.log(modify.error);
        if (!modify.error) {
          return Buffer.from(modify.content);
        }
        return content;
      })
    )
    .pipe(gulp.dest(source_dir));
});
gulp.task('article:render', function () {
  return gulp
    .src(join(source_dir, '/Chimeraland/Recipes.md'))
    .pipe(
      through2['default'].obj(function (file, enc, callback) {
        const self = this;
        const filePath = relative(file.base, file.path);
        const content = file.contents.toString();
        const parse = parsePost(content);
        const modify = modifyPost(parse);
        console.log(file.contents);
        if (!modify.error) {
          console.log('[render][start]');
          return ejs['default']
            .renderFile(join(__dirname, 'template/index'), { page: parse, config: config })
            .then(function (rendered) {
              file.contents = Buffer.from(rendered);
              self.push(file);
              console.log(rendered);
            })
            ['catch'](console.error)
            .then(callback);
        }
        callback();
      })
    )
    .pipe(
      (0, rename['default'])(function (path) {
        path.extname = '.html';
      })
    )
    .pipe(gulp.dest(public_dir));
});
gulp.task('server', function () {
  browser_sync['default'].init({
    server: {
      baseDir: './' + config.public_dir,
    },
  });
});
gulp.task('default', gulp.parallel('article:copy', 'article:process'));
