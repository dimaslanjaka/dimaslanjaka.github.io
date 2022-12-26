"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var encryptionURL_1 = __importDefault(require("./encryptionURL"));
var parseQuery_1 = require("./parseQuery");
var toURL_1 = __importDefault(require("./toURL"));
var _global_resolveQueryUrl = (typeof window !== 'undefined' ? window : global);
/**
 * Auto resolve url
 * * parse base64, aes
 * @param url url string or instance, null = {@link window.location.search}
 * @param passphrase aes password
 * @returns
 */
function resolveQueryUrl(url, passphrase, debug) {
    if (passphrase === void 0) { passphrase = 'root'; }
    if (debug === void 0) { debug = false; }
    var result = {};
    var href = null;
    if (url instanceof URL) {
        href = url.href;
    }
    else if (typeof url == 'string') {
        if (url.match(/^(#|\?)/)) {
            href = 'http://not.actually.domain/' + url;
        }
        else {
            var parse = (0, toURL_1.default)(url);
            if (parse !== null)
                href = parse.href;
        }
    }
    else if (typeof location == 'object' && typeof location.href == 'string') {
        href = location.href;
    }
    if (!href || !href.match(/#|\?/))
        return null;
    var parse_query_url = (0, parseQuery_1.parseQuery)(null, href);
    if (typeof parse_query_url == 'object') {
        Object.keys(parse_query_url).forEach(function (key) {
            var value = parse_query_url[key];
            result[key] = (0, encryptionURL_1.default)(value, passphrase, debug);
        });
    }
    return result;
}
exports.default = resolveQueryUrl;
_global_resolveQueryUrl.resolveQueryUrl = resolveQueryUrl;
