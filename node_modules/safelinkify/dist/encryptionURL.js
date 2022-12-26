"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var aes_1 = __importDefault(require("./aes"));
var b64_1 = __importDefault(require("./b64"));
var _global_encryptionURL = (typeof window !== 'undefined' ? window : global);
/**
 * resolve url encryption
 * @param url
 * @param passphrase
 * @returns
 */
function encryptionURL(url, passphrase, debug) {
    if (passphrase === void 0) { passphrase = 'root'; }
    if (debug === void 0) { debug = false; }
    /** Default Return Value */
    var defaultRet = {
        value: null,
        base64: {
            encode_redirector: null,
            encode: null,
            decode: null
        },
        aes: {
            encode: null,
            decode: null,
            encode_redirector: null,
            passphrase: passphrase
        }
    };
    if (!url)
        return defaultRet;
    var value = url instanceof URL ? url.href : url;
    /** BASE64 Decrypt */
    var b64d = b64_1.default.decode(value);
    /** BASE64 Encrypt */
    var b64e = b64_1.default.encode(value);
    /** AES Encrypt */
    var aese = aes_1.default.encrypt(passphrase, value, debug);
    /** AES Decrypt */
    var aesd = aes_1.default.decrypt(passphrase, value, debug);
    return Object.assign(defaultRet, {
        value: value,
        base64: {
            encode: b64d ? null : b64e,
            decode: b64d
        },
        aes: {
            encode: aesd ? null : aese,
            decode: aesd,
            passphrase: passphrase
        }
    });
}
exports.default = encryptionURL;
_global_encryptionURL.encryptionURL = encryptionURL;
