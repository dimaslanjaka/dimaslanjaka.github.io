import HexoConfig from "hexo/HexoConfig";
export type Hexo_Config =
  | HexoConfig
  | {
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

type Writable<T> = { -readonly [K in keyof T]: T[K] };

type Mutable<T> = {
  -readonly [k in keyof T]: T[k];
};

export type Author =
  | string
  | {
      name: string;
      link: string;
      image: Image;
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
