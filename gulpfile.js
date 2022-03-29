"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/* eslint-disable @typescript-eslint/no-unused-vars */
//import "./packages/hexo-seo/packages/js-prototypes/src/globals";
//import "./src/node/console";
var gulp = __importStar(require("gulp"));
// `gulp article:copy`
var article_copy_1 = require("./src/gulp/tasks/article-copy");
var path_1 = require("path");
require("js-prototypes");
var modify_file_1 = __importDefault(require("./src/gulp/modules/modify-file"));
var transformPosts_1 = require("./src/markdown/transformPosts");
var browser_sync_1 = __importDefault(require("browser-sync"));
var ejs_1 = __importDefault(require("ejs"));
var rename_1 = __importDefault(require("./src/gulp/modules/rename"));
var through2_1 = __importDefault(require("through2"));
var config = {
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
        image: 'https://res.cloudinary.com/dimaslanjaka/image/fetch/https://imgdb.net/images/3600.jpg'
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
    seo: undefined
};
var source_dir = (0, path_1.join)(__dirname, config.source_dir, '_posts');
var public_dir = (0, path_1.join)(__dirname, config.public_dir);
// just copy and process from source posts (src-posts) to production posts (source/_posts)
gulp.task('article:copy', function () {
    //return articleCopy(config, done);
    return gulp.src(['src-posts/**/**']).pipe(gulp.dest(source_dir));
});
gulp.task('article:process', function () {
    return gulp
        .src((0, path_1.join)(source_dir, '/**/**.md'))
        .pipe((0, modify_file_1["default"])(function (content, path, file) {
        var parse = (0, transformPosts_1.parsePost)(Buffer.isBuffer(content) ? content.toString() : content);
        if (parse) {
            parse.fileTree = {
                source: path.toString().replace('/source/_posts/', '/src-posts/'),
                public: path.toString().replace('/src-posts/', '/source/_posts/')
            };
        }
        var modify = (0, article_copy_1.modifyPost)(parse);
        console.log(modify.error);
        if (!modify.error) {
            return Buffer.from(modify.content);
        }
        return content;
    }))
        .pipe(gulp.dest(source_dir));
});
gulp.task('article:render', function () {
    return gulp
        .src((0, path_1.join)(source_dir, '/Chimeraland/Recipes.md'))
        .pipe(through2_1["default"].obj(function (file, enc, callback) {
        var _this = this;
        var filePath = (0, path_1.relative)(file.base, file.path);
        var content = file.contents.toString();
        var parse = (0, transformPosts_1.parsePost)(content);
        var modify = (0, article_copy_1.modifyPost)(parse);
        console.log(file.contents);
        if (!modify.error) {
            console.log('[render][start]');
            return ejs_1["default"]
                .renderFile((0, path_1.join)(__dirname, 'template/index'), { page: parse, config: config })
                .then(function (rendered) {
                file.contents = Buffer.from(rendered);
                _this.push(file);
                console.log(rendered);
            })["catch"](console.error)
                .then(callback);
        }
        callback();
    }))
        .pipe((0, rename_1["default"])(function (path) {
        path.extname = '.html';
    }))
        .pipe(gulp.dest(public_dir));
});
gulp.task('server', function () {
    browser_sync_1["default"].init({
        server: {
            baseDir: './' + config.public_dir
        }
    });
});
gulp.task('default', gulp.parallel('article:copy', 'article:process'));
