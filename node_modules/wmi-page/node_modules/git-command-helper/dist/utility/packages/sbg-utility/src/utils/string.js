"use strict";
// https://raw.githubusercontent.com/dimaslanjaka/chimeraland/master/src/utils/string.ts
// https://github.com/dimaslanjaka/chimeraland/tree/master/src/utils
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidHttpUrl = exports.slugify = exports.replacePath = exports.bufferToString = exports.streamToString = exports.capitalizer = exports.capitalize = exports.escapeRegex = void 0;
/**
 * escape regex string
 * @param string
 * @returns
 */
function escapeRegex(string, method = '1') {
    if (method === '1' || !method)
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Escape characters with special meaning either inside or outside character sets.
    // Use a simple backslash escape when it’s always valid, and a `\xnn` escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.
    if (method === '2')
        return string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
}
exports.escapeRegex = escapeRegex;
/**
 * capitalize string first letter of each word which mixed with symbols
 * @param str
 * @param moreSymbols add more symbols, default []
 * @returns
 */
function capitalize(str, moreSymbols = []) {
    let symbols = ['-', ' '];
    if (Array.isArray(moreSymbols)) {
        // concatenate more symbols
        symbols = [...new Set(symbols.concat(moreSymbols))];
    }
    symbols.forEach((symbol) => {
        str = str
            .split(symbol)
            .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
            .join(symbol);
    });
    return str;
}
exports.capitalize = capitalize;
exports.capitalizer = capitalize;
/**
 * Stream to string
 * @param stream
 * @returns
 */
function streamToString(stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on('error', (err) => reject(err));
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    });
}
exports.streamToString = streamToString;
/**
 * Buffer to string
 * @param array
 * @returns
 */
function bufferToString(array) {
    if (typeof Uint8Array !== 'undefined' && typeof TextDecoder !== 'undefined') {
        const td = new TextDecoder();
        const ua = new Uint8Array(array);
        return td.decode(ua);
    }
    else {
        return array.toString();
    }
}
exports.bufferToString = bufferToString;
/**
 * Replace path unix-style
 * @param source
 * @param toReplace
 * @param replacement
 * @returns
 */
async function replacePath(source, toReplace, replacement = '') {
    const upath = await Promise.resolve().then(() => __importStar(require('upath')));
    return upath.toUnix(source).replace(upath.toUnix(toReplace), replacement);
}
exports.replacePath = replacePath;
/**
 * slugify string
 * @param str
 * @param ext
 * @returns
 */
function slugify(str, ext) {
    return ((str
        // lower case
        .toLowerCase()
        // remove special char except space, underscore, alphabetic, number
        .replace(/[^a-zA-Z0-9\s+\-_]/g, '')
        // replace whitespaces and underscore with single hypens
        .replace(/[\s\-_]+/g, '-')
        // replace multiple hypens with single hypens
        .replace(/-+/g, '-') + (ext || '')).trim());
}
exports.slugify = slugify;
/**
 * check variable is valid http url string
 * @param string
 * @returns
 */
function isValidHttpUrl(string) {
    let url;
    try {
        url = new URL(string);
    }
    catch (_) {
        return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
}
exports.isValidHttpUrl = isValidHttpUrl;
