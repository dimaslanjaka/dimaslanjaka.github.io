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
        assign: any;
        mapper: any;
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
            submodule: any[];
        };
    };
    description: string;
    exclude: any;
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
    ignore: any;
    include: any;
    index_generator: {
        path: string;
        per_page: number;
        order_by: string;
    };
    keywords: any;
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
        enable_rules: any;
        disable_rules: any;
        plugins: any;
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
    permalink_defaults: any;
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
    skip_render: any;
    source_dir: string;
    tag_dir: string;
    tags: {
        lowercase: boolean;
        assign: any;
        mapper: any;
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
