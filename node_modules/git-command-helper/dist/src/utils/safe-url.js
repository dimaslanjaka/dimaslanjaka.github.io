"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeURL = void 0;
/**
 * remove `token` from url.
 *
 * @example
 * // from : https://TOKEN@github.com/username/repository-name/blob/filename#L01-L202
 * // to   : https://github.com/username/repository-name/blob/filename#L01-L202
 * @param url
 * @returns
 */
function safeURL(url) {
    const parse = new URL(url);
    const safe = parse.origin + parse.pathname + parse.hash;
    return safe;
}
exports.safeURL = safeURL;
