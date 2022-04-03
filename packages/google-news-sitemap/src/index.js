"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.parse = exports.root = void 0;
var moment_1 = __importDefault(require("moment"));
var xmlbuilder_1 = __importDefault(require("xmlbuilder"));
exports.root = {
    urlset: {
        "@xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9",
        "@xmlns:news": "http://www.google.com/schemas/sitemap-news/0.9",
        "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
        "@xsi:schemaLocation": "http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-news/0.9 http://www.google.com/schemas/sitemap-news/0.9/sitemap-news.xsd",
        url: []
    }
};
var genres = ["Blog", "OpEd", "Opinion", "PressRelease", "Satire", "UserGenerated"];
function parse(prepare) {
    return {
        loc: prepare.loc,
        "news:news": {
            "news:publication": {
                "news:language": prepare.news.publication.language,
                "news:name": prepare.news.publication.name
            },
            "news:title": prepare.news.title,
            "news:publication_date": prepare.news.publication_date
        }
    };
}
exports.parse = parse;
var GoogleNewsSitemap = /** @class */ (function () {
    function GoogleNewsSitemap() {
        /**
         * Max 1000 items
         */
        this.items = [];
    }
    GoogleNewsSitemap.prototype.add = function (item) {
        if (!item.title && !item.publication_name && item.publication_date)
            return;
        var author = "Dimas Lanjaka (Default User)";
        if (typeof item.publication_name == "string") {
            author = item.publication_name;
        }
        else if (item.publication_name.name) {
            author = item.publication_name.name;
        }
        var build = {
            loc: item.location,
            news: {
                publication: { name: author, language: item.publication_language || "en" },
                publication_date: item.publication_date || (0, moment_1["default"])(new Date(), moment_1["default"].ISO_8601).format(GoogleNewsSitemap.date_pattern),
                title: item.title,
                genres: item.genres || "Blog"
            }
        };
        if (typeof item.keywords == "string") {
            build.news.keywords = item.keywords;
        }
        else if (Array.isArray(item.keywords)) {
            build.news.keywords = item.keywords.join(",");
        }
        exports.root.urlset.url.push(parse(build));
        this.items.push(build);
    };
    GoogleNewsSitemap.prototype.toString = function () {
        return xmlbuilder_1["default"].create(exports.root, { version: "1.0", encoding: "UTF-8" }).end({ pretty: true });
    };
    GoogleNewsSitemap.date_pattern = "YYYY-MM-DDTHH:mm:ssZ";
    return GoogleNewsSitemap;
}());
exports["default"] = GoogleNewsSitemap;
