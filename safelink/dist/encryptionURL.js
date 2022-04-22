import b64 from './b64';
import aes from './aes';
var _global_encryptionURL = (window /* browser */ ||
    global) /* node */;
/**
 * resolve url encryption
 * @param url
 * @param passphrase
 * @returns
 */
export default function encryptionURL(url, passphrase, debug) {
    if (passphrase === void 0) { passphrase = 'root'; }
    if (debug === void 0) { debug = false; }
    /** Default Return Value */
    var defaultRet = {
        value: null,
        base64: {
            encode: null,
            decode: null,
        },
        aes: {
            encode: null,
            decode: null,
            passphrase: passphrase,
        },
    };
    if (!url)
        return defaultRet;
    var value = url instanceof URL ? url.href : url;
    /** BASE64 Decrypt */
    var b64d = b64.decode(value);
    /** BASE64 Encrypt */
    var b64e = b64.encode(value);
    /** AES Encrypt */
    var aese = aes.encrypt(passphrase, value, debug);
    /** AES Decrypt */
    var aesd = aes.decrypt(passphrase, value, debug);
    return Object.assign(defaultRet, {
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
    });
}
_global_encryptionURL.encryptionURL = encryptionURL;
