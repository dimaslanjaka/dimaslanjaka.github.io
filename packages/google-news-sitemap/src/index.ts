import moment from "moment";
import xmlbuilder from "xmlbuilder";
import languages from "./languages.json";

export const root = {
  urlset: {
    "@xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9",
    "@xmlns:news": "http://www.google.com/schemas/sitemap-news/0.9",
    "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
    "@xsi:schemaLocation":
      "http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-news/0.9 http://www.google.com/schemas/sitemap-news/0.9/sitemap-news.xsd",
    url: [],
  },
};

export type UnionOfArrayElements<ARR_T extends Readonly<unknown[]>> = ARR_T[number];
const genres = ["Blog", "OpEd", "Opinion", "PressRelease", "Satire", "UserGenerated"] as const;

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

type codelang = string | keyof typeof languages;
//type infocodelang = typeof languages[codelang];

export type XMLItemType = {
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

export function parse(prepare: ItemType): XMLItemType {
  return {
    loc: prepare.loc,
    "news:news": {
      "news:publication": {
        "news:language": prepare.news.publication.language,
        "news:name": prepare.news.publication.name,
      },
      "news:title": prepare.news.title,
      "news:publication_date": prepare.news.publication_date,
    },
  };
}

export interface ClassItemType {
  /**
   * Publisher or Author Name
   */
  publication_name:
  | string
  | {
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
  items: ItemType[] = [];
  static date_pattern = "YYYY-MM-DDTHH:mm:ssZ";
  add(item: ClassItemType) {
    if (!item.title && !item.publication_name && item.publication_date) return;
    let author = "Dimas Lanjaka (Default User)";
    if (typeof item.publication_name == "string") {
      author = item.publication_name;
    } else if (typeof item.publication_name == 'object') {
      if (item.publication_name.name) author = item.publication_name.name;
    }
    const build: ItemType = {
      loc: item.location,
      news: {
        publication: { name: author, language: item.publication_language || "en" },
        publication_date:
          item.publication_date || moment(new Date(), moment.ISO_8601).format(GoogleNewsSitemap.date_pattern),
        title: item.title,
        genres: item.genres || "Blog",
      },
    };
    if (typeof item.keywords == "string") {
      build.news.keywords = item.keywords;
    } else if (Array.isArray(item.keywords)) {
      build.news.keywords = (<Array<string>>item.keywords).join(",");
    }
    root.urlset.url.push(parse(build));
    this.items.push(build);
    return build;
  }
  getTotal() {
    return this.items.length
  }
  toString() {
    return xmlbuilder.create(root, { version: "1.0", encoding: "UTF-8" }).end({ pretty: true });
  }
}
