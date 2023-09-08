"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Extract domain from URL
 */
function extractDomain(url) {
    var hostname;
    if (url.indexOf('://') > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }
    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];
    return hostname;
}
exports.default = extractDomain;
