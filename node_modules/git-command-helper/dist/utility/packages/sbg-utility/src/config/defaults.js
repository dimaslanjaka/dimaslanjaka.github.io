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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultConfigYaml = exports.getDefaultConfig = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const upath_1 = require("upath");
const yaml = __importStar(require("yaml"));
const utils_1 = require("../utils");
const case_path_1 = require("../utils/filemanager/case-path");
const _config_json_1 = __importDefault(require("./_config.json"));
/**
 * get default configuration
 * @returns
 */
function getDefaultConfig() {
    const hexoDefaultConfig = {
        // Site
        title: 'Hexo',
        subtitle: '',
        description: '',
        author: 'John Doe',
        language: 'en',
        timezone: '',
        // URL
        url: 'http://example.com',
        root: '/',
        permalink: ':year/:month/:day/:name/',
        permalink_defaults: {},
        pretty_urls: {
            trailing_index: true,
            trailing_html: true
        },
        // Directory
        post_dir: 'src-posts',
        // deploy_dir: '.deploy_git',
        source_dir: 'source',
        public_dir: 'public',
        tag_dir: 'tags',
        archive_dir: 'archives',
        category_dir: 'categories',
        code_dir: 'downloads/code',
        i18n_dir: ':lang',
        skip_render: [],
        // Writing
        new_post_name: ':title.md',
        default_layout: 'post',
        titlecase: false,
        external_link: {
            enable: true,
            field: 'site',
            exclude: ''
        },
        filename_case: 0,
        render_drafts: false,
        post_asset_folder: false,
        relative_link: false,
        future: true,
        syntax_highlighter: 'highlight.js',
        highlight: {
            auto_detect: false,
            line_number: true,
            tab_replace: '',
            wrap: true,
            exclude_languages: [],
            language_attr: false,
            hljs: false
        },
        prismjs: {
            preprocess: true,
            line_number: true,
            tab_replace: ''
        },
        // Category & Tag
        default_category: 'uncategorized',
        category_map: {},
        tag_map: {},
        // Date / Time format
        date_format: 'YYYY-MM-DD',
        time_format: 'HH:mm:ss',
        updated_option: 'mtime',
        // * mtime: file modification date (default)
        // * empty: no more update
        // Pagination
        per_page: 10,
        pagination_dir: 'page',
        // Extensions
        theme: 'landscape',
        server: {
            cache: false
        },
        // Deployment
        deploy: {},
        // ignore files from processing
        ignore: [],
        // Category & Tag
        meta_generator: true
    };
    const sbgDefaultConfig = {
        cwd: (0, upath_1.toUnix)((0, case_path_1.trueCasePathSync)(process.cwd()))
    };
    const configYML = yaml.parse(getDefaultConfigYaml());
    return Object.assign(hexoDefaultConfig, sbgDefaultConfig, configYML);
}
exports.getDefaultConfig = getDefaultConfig;
/**
 * get default _config.yml
 * @returns
 */
function getDefaultConfigYaml() {
    const yml = (0, upath_1.join)(__dirname, '_config.yml');
    if (fs_extra_1.default.existsSync(yml)) {
        return fs_extra_1.default.readFileSync((0, upath_1.join)(__dirname, '_config.yml'), 'utf-8');
    }
    else {
        return (0, utils_1.jsonStringifyWithCircularRefs)(_config_json_1.default);
    }
}
exports.getDefaultConfigYaml = getDefaultConfigYaml;
