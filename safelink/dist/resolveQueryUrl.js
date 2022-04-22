import encryptionURL from './encryptionURL';
import { parseQuery } from './parseQuery';
import toURL from './toURL';
var _global_resolveQueryUrl = (window /* browser */ ||
    global) /* node */;
/**
 * Auto resolve url
 * * parse base64, aes
 * @param url url string or instance, null = {@link window.location.search}
 * @param passphrase aes password
 * @returns
 */
export function resolveQueryUrl(url, passphrase) {
    if (passphrase === void 0) { passphrase = 'root'; }
    var result = {};
    var search = null;
    if (url instanceof URL) {
        search = url.search;
    }
    else if (typeof url == 'string') {
        var parse = toURL(url);
        if (parse != null)
            search = parse.search;
    }
    else if (typeof location == 'object' &&
        typeof location.search == 'string') {
        search = location.search;
    }
    if (!search)
        return null;
    var parse_query_url = parseQuery(null, search);
    if (typeof parse_query_url == 'object') {
        Object.keys(parse_query_url).forEach(function (key) {
            var value = parse_query_url[key];
            result[key] = encryptionURL(value);
        });
    }
    return result;
}
_global_resolveQueryUrl.resolveQueryUrl = resolveQueryUrl;
export default resolveQueryUrl;
