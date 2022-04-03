import { join, readFileSync, resolve, write } from '../node/filemanager';
import yaml from 'yaml';
import data from './_config_data.json';
import { toUnix } from 'upath';

export type ProjectConfig = (typeof data & Hexo_Config) & {
  [keys: string]: any;
};
export const root = join(__dirname, '../../');
const file = join(root, '_config.yml');
const str = readFileSync(file, 'utf-8');
const config: ProjectConfig = yaml.parse(str);

if (!config.exclude) config.exclude = [];
if (!config.ignore) config.ignore = [];
if (!config.include) config.include = [];
if (!config.skip_render) config.skip_render = [];

if (process.env.NODE_ENV == 'development') {
  config.url = 'http://adsense.webmanajemen.com:' + config.server.port;
}

/**
 * Public Source Post Dir (`source/`)
 */
export const post_public_dir = resolve(join(root, config.source_dir, '_posts'));
/**
 * Generated directory (`config.public_dir`)
 */
export const post_generated_dir = resolve(join(root, config.public_dir));
/**
 * `src-posts/` directory
 */
export const post_source_dir = resolve(join(root, 'src-posts'));
/**
 * path to temp folder
 * @param path file path inside temp folder
 * @returns
 */
export const tmp = (...path: string[]) => join(root, 'tmp', path.join('/'));

//// THEME
const theme_def_opt = {
  amp: false,
};
export type ThemeOpt =
  | typeof theme_def_opt
  | {
      [key: string]: any;
    };
export const theme_dir = toUnix(resolve(join(root, 'themes', config.theme)));
const theme_yml = join(theme_dir, '_config.yml');
export const theme_config: ThemeOpt = Object.assign(theme_def_opt, yaml.parse(readFileSync(theme_yml, 'utf-8')));

export default config;

write(join(__dirname, '_config_data.json'), JSON.stringify(config));

export type Hexo_Config = {
  title: string;
  subtitle: string;
  description: string;
  subtitle_desc: string;
  keywords: string;
  timezone: string;
  introduction: string;
  search: Search;
  url: string;
  root: string;
  author: Author;
  permalink: string;
  pretty_urls: PrettyUrls;
  source_dir: string;
  public_dir: string;
  tag_dir: string;
  archive_dir: string;
  category_dir: string;
  code_dir: string;
  i18n_dir: string;
  new_post_name: string;
  default_layout: string;
  titlecase: boolean;
  //external_link: ExternalLink;
  filename_case: number;
  render_drafts: boolean;
  post_asset_folder: boolean;
  relative_link: boolean;
  future: boolean;
  highlight: Highlight;
  prismjs: Prismjs;
  index_generator: IndexGenerator;
  default_category: string;
  meta_generator: boolean;
  date_format: string;
  time_format: string;
  updated_option: boolean;
  per_page: number;
  pagination_dir: string;
  server: Server;
  theme: string;
  deploy: Deploy;
  social_links: SocialLinks;
  feed: Feed;
  sitemap: Sitemap;
  related_posts: RelatedPosts;
  markdown_it_plus: MarkdownItPlus;
  browsersync: Browsersync;
  adsense: Adsense;
  analytics: Analytics;
  seo: Seo;
};

export type Author =
  | string
  | {
      name: string;
      link: string;
      image: string | Image;
    };

export interface Search {
  path: string;
  field: string;
  content: boolean;
  format: string;
}
export interface PrettyUrls {
  trailing_index: boolean;
  trailing_html: boolean;
}
export interface ExternalLink {
  enable: boolean;
  field: string;
  exclude: string;
}
export interface Highlight {
  enable: boolean;
  line_number: boolean;
  auto_detect: boolean;
  tab_replace: string;
  wrap: boolean;
  hljs: boolean;
}
export interface Prismjs {
  enable: boolean;
  preprocess: boolean;
  line_number: boolean;
  tab_replace: string;
}
export interface IndexGenerator {
  path: string;
  per_page: number;
  order_by: string;
}
export interface Server {
  port: number;
  log: boolean;
  ip: string;
  host: string;
  proxy: string;
  compress: boolean;
  cache: boolean;
  header: boolean;
  serveStatic: ServeStatic;
}
export interface ServeStatic {
  extensions?: string[] | null;
}
export interface Deploy {
  type: string;
  repo: string;
  branch: string;
  message: string;
}

export interface Image {
  url: string;
  width: number;
  height: number;
}
export interface SocialLinks {
  github: string;
  youtube: string;
}
export interface Feed {
  content: boolean;
  type?: string[] | null;
  path?: string[] | null;
}
export interface Sitemap {
  path: string;
}
export interface RelatedPosts {
  enabled: boolean;
  enable_env_name: string;
  filter_threshold: number;
  related_count: number;
  weight: Weight;
  stemmers?: string[] | null;
  reserved?: string[] | null;
}
export interface Weight {
  title: number;
  description: number;
  keywords: number;
  tags: number;
  categories: number;
  text: number;
}
export interface MarkdownItPlus {
  highlight: boolean;
  html: boolean;
  xhtmlOut: boolean;
  breaks: boolean;
  langPrefix?: null;
  linkify: boolean;
  typographer?: null;
  pre_class: string;
  plugins?: PluginsEntity[] | null;
}
export interface PluginsEntity {
  plugin: Plugin;
}
export interface Plugin {
  name: string;
  enable: boolean;
  options: Options;
}
export interface Options {
  leftDelimiter: string;
  rightDelimiter: string;
  allowedAttributes?: null[] | null;
}
export interface Browsersync {
  logLevel: string;
  ghostMode: GhostMode;
  instanceName: string;
  port: number;
  browser: string;
  open: boolean;
}
export interface GhostMode {
  scroll: boolean;
}
export interface Adsense {
  enable: boolean;
  pub: string;
  article_ads?: string[] | null;
  field: string;
  https: boolean;
  adblock: boolean;
  type: string;
  exclude?: string[] | null;
}
export interface Analytics {
  tagmanager: string;
  GA4: string;
  GA3: string;
  cloudflare: string;
}
export interface Seo {
  html: Html;
  css: boolean;
  js: boolean;
  schema: boolean;
  img: Img;
  links: Links;
  sitemap: boolean;
}
export interface Html {
  fix: boolean;
  exclude?: string[] | null;
}
export interface Img {
  broken: boolean;
  default: string;
  onerror: string;
}
export interface Links {
  enable: boolean;
  exclude?: string[] | null;
}
