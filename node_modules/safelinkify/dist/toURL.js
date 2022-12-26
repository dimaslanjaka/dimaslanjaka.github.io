"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixUrl = exports.isValidHttpUrl = void 0;
/**
 * is url valid
 * @param string
 * @returns
 */
function isValidHttpUrl(string) {
    var url;
    try {
        url = new URL(string);
    }
    catch (_) {
        return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
}
exports.isValidHttpUrl = isValidHttpUrl;
/**
 * fix url
 * * doubled slashes
 * @param url
 * @returns
 */
function fixUrl(url) {
    var str;
    if (typeof url === 'string') {
        str = url;
    }
    else {
        str = url.toString();
    }
    return str.replace(/([^:]\/)\/+/g, '$1');
}
exports.fixUrl = fixUrl;
/**
 * transform url string to {@link Nullable}<{@link URL}>
 * @param url
 * @returns
 */
function toURL(url) {
    try {
        if (url.startsWith('/') || url.startsWith('?')) {
            // url is pathname or query
            return new URL('http://not-actually-domain.com/' + url.replace(/^\/+/, ''));
        }
        else if (url.match(/^https?:\/\//)) {
            // test full url with protocol://
            return new URL(url);
        }
    }
    catch (error) {
        if (error instanceof Error)
            console.log(url, error.message);
        return null;
    }
}
exports.default = toURL;
