"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseQuery = void 0;
var toURL_1 = __importDefault(require("./toURL"));
var _global_parseQuery = (typeof window !== 'undefined' ? window : global);
/**
 * Parse Query URL and Hash
 * @param  query query key, null = return all objects
 * @param  url target query, ex: {@link location.href} or {@link location.search}
 */
function parseQuery(query, url) {
    // skip null, undefined
    if (typeof url !== 'string')
        return;
    // skip empty string
    if (url.length < 1)
        return;
    var result = {};
    /**
     * Query URL Parser
     * @param str
     * @returns
     */
    var parseQueries = function (str) {
        var urlParams = new URLSearchParams(str);
        return Object.fromEntries(urlParams);
    };
    if (url.match(/^(#|\?)/)) {
        url = 'http://not.actually.domain/' + url;
    }
    var parse = (0, toURL_1.default)(url);
    if (parse) {
        if (parse.hash) {
            result = Object.assign(result, parseQueries(parse.hash.substring(1)));
        }
        if (parse.search) {
            result = Object.assign(result, parseQueries(parse.search));
        }
    }
    if (typeof query == 'string' && result.hasOwnProperty(query)) {
        return result[query];
    }
    return result;
}
exports.parseQuery = parseQuery;
_global_parseQuery.parseQuery = parseQuery;
exports.default = parseQuery;
