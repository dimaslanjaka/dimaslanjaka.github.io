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
var xmlbuilder_1 = __importDefault(require("xmlbuilder"));
var _1 = __importStar(require("."));
var builder = new _1["default"]();
builder.add({
    location: "http://example.com/article1",
    title: "item 1",
    publication_date: "May 24, 2012",
    publication_language: "en",
    publication_name: "Dimas Lanjaka"
});
builder.add({
    location: "http://example.com/article2",
    title: "item 2",
    publication_language: "en",
    publication_date: "May 25, 2012",
    publication_name: "Dimas Lanjaka"
});
builder.items.forEach(function (item) {
    var prepare = {
        loc: item.loc,
        news: {
            publication: {
                name: item.news.publication.name,
                language: item.news.publication.language
            },
            publication_date: item.news.publication_date,
            title: item.news.title
        }
    };
    var build = (0, _1.parse)(prepare);
    build.loc = prepare.loc;
    _1.root.urlset.url.push(build);
});
var xml = xmlbuilder_1["default"].create(_1.root, { version: "1.0", encoding: "UTF-8" }).end({ pretty: true });
console.log(xml);
