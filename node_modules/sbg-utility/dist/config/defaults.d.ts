import mappedConfig from './_config.json';
export type importConfig = typeof mappedConfig;
/**
 * get default configuration
 * @returns
 */
export declare function getDefaultConfig(): {
    archive_dir: string;
    author: string;
    browsersync: {
        logLevel: string;
        ghostMode: {
            scroll: boolean;
        };
        instanceName: string;
    };
    categories: {
        lowercase: boolean;
        assign: null;
        mapper: null;
    };
    category_dir: string;
    code_dir: string;
    date_format: string;
    default_category: string;
    default_layout: string;
    deploy: {
        type: string;
        repo: string;
        branch: string;
        username: string;
        email: string;
        message: string;
        deployDir: string;
        github: {
            submodule: never[];
        };
    };
    description: string;
    exclude: null;
    external_link: {
        enable: boolean;
        field: string;
        safelink: {
            enable: boolean;
            exclude: string[];
            redirect: string[];
            type: string;
            password: string;
        };
        exclude: string[];
    };
    filename_case: number;
    future: boolean;
    generator: {
        cache: boolean;
        verbose: boolean;
    };
    highlight: {
        enable: boolean;
        line_number: boolean;
        auto_detect: boolean;
        tab_replace: string;
        wrap: boolean;
        hljs: boolean;
    };
    i18n_dir: string;
    ignore: null;
    include: null;
    index_generator: {
        path: string;
        per_page: number;
        order_by: string;
    };
    keywords: null;
    language: string;
    markdown: {
        preset: string;
        render: {
            html: boolean;
            xhtmlOut: boolean;
            langPrefix: string;
            breaks: boolean;
            linkify: boolean;
            typographer: boolean;
            quotes: string;
        };
        enable_rules: null;
        disable_rules: null;
        plugins: null;
        anchors: {
            level: number;
            collisionSuffix: string;
            permalink: boolean;
            permalinkClass: string;
            permalinkSide: string;
            permalinkSymbol: string;
            case: number;
            separator: string;
        };
    };
    meta_generator: boolean;
    new_post_name: string;
    pagination_dir: string;
    per_page: number;
    permalink: string;
    permalink_defaults: null;
    post_asset_folder: boolean;
    post_dir: string;
    pretty_urls: {
        trailing_index: boolean;
        trailing_html: boolean;
    };
    prismjs: {
        enable: boolean;
    };
    public_dir: string;
    relative_link: boolean;
    render_drafts: boolean;
    root: string;
    sitemap: {
        path: string[];
        rel: boolean;
        tags: boolean;
        categories: boolean;
    };
    skip_render: null;
    source_dir: string;
    tag_dir: string;
    tags: {
        lowercase: boolean;
        assign: null;
        mapper: null;
    };
    theme: string;
    time_format: string;
    timezone: string;
    title: string;
    titlecase: boolean;
    updated_option: string;
    url: string;
};
/**
 * get default _config.yml
 * @returns
 */
export declare function getDefaultConfigYaml(): string;
