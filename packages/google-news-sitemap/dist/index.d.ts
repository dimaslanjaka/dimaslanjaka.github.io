import languages from "./languages.json";
export declare const root: {
    urlset: {
        "@xmlns": string;
        "@xmlns:news": string;
        "@xmlns:xsi": string;
        "@xsi:schemaLocation": string;
        url: any[];
    };
};
export declare type UnionOfArrayElements<ARR_T extends Readonly<unknown[]>> = ARR_T[number];
declare const genres: readonly ["Blog", "OpEd", "Opinion", "PressRelease", "Satire", "UserGenerated"];
export interface ItemType {
    loc: string;
    news: {
        publication: {
            name: string;
            language: string;
        };
        publication_date: string;
        title: string;
        genres?: string | typeof genres[number];
        keywords?: string;
    };
}
declare type codelang = string | keyof typeof languages;
export declare type XMLItemType = {
    loc: string;
    "news:news": {
        "news:publication": {
            "news:name": string;
            "news:language": codelang;
        };
        "news:title": string;
        "news:publication_date": string;
    };
};
export declare function parse(prepare: ItemType): XMLItemType;
export interface ClassItemType {
    /**
     * Publisher or Author Name
     */
    publication_name: string | {
        name?: string;
        url?: string;
    };
    /**
     * Language Article. Default: en
     */
    publication_language: string;
    access?: string;
    /**
     * This tag allows you to specify genres that your news story is in. This must be in the form of a comma-separated list. Default: Blog
     */
    genres?: string | typeof genres[number];
    /**
     * Article published date
     * - YYYY-MM-DD (e.g. 1997-07-16)
     * - YYYY-MM-DDThh:mmTZD (e.g. 2017-08-10T17:49+11:00)
     * - YYYY-MM-DDThh:mm:ssTZD (e.g. 2017-08-10T17:49:30+11:00)
     * - YYYY-MM-DDThh:mm:ss.sTZD (e.g. 2017-08-10T17:49:30.45+11:00)
     */
    publication_date: string;
    /**
     * Article Title
     */
    title: string;
    /**
     * Location Article Created.
     * - Default NULL
     */
    geo_locations?: string;
    /**
     * Article Keyword.
     * - The keyword should be in the form of a comma-separated list
     */
    keywords?: string | string[];
    stock_tickers?: string;
    /**
     * URL
     */
    location: string;
}
export default class GoogleNewsSitemap {
    /**
     * Max 1000 items
     */
    items: ItemType[];
    static date_pattern: string;
    add(item: ClassItemType): ItemType;
    getTotal(): number;
    toString(): string;
}
export {};
