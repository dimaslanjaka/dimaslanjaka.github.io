import { parseQuery } from './parseQuery';
import b64 from './b64';
import aes from './aes';
var _global_resolveQueryUrl = (window /* browser */ ||
    global) /* node */;
export function resolveQueryUrl(url, passphrase) {
    if (passphrase === void 0) { passphrase = 'root'; }
    var result = {};
    var search = null;
    if (typeof url == 'string') {
        if (url.startsWith('?')) {
            search = url;
        }
        else if (url.length > 0) {
            try {
                var parse = new URL(url);
                search = parse.search;
            }
            catch (error) {
                if (error instanceof Error)
                    console.log(url, error.message);
            }
        }
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
            //console.log('process', key);
            var value = parse_query_url[key];
            var b64d = b64.decode(value);
            var b64e = b64.encode(value);
            //console.log(b64e, b64d);
            var aese = aes.encrypt(passphrase, value);
            var aesd = aes.decrypt(passphrase, value);
            result[key] = {
                value: value,
                base64: {
                    encode: b64d ? null : b64e,
                    decode: b64d,
                },
                aes: {
                    encode: aesd ? null : aese,
                    decode: aesd,
                    passphrase: passphrase,
                },
            };
        });
    }
    return result;
}
_global_resolveQueryUrl.resolveQueryUrl = resolveQueryUrl;
export default resolveQueryUrl;
