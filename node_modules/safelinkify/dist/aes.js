"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_js_1 = __importDefault(require("crypto-js"));
var salt = 'salt'; //salt
var iv = '1111111111111111'; //pass salt minimum length 12 chars
var iterations = 999; //iterations
/**
 * Get key
 * @param {string} passphrase
 * @param {string} salt
 * @see {@link https://www.webmanajemen.com/2019/07/phpjs-cryptojs-encrypt-decrypt.html}
 */
function getKey(passphrase, salt) {
    var key = crypto_js_1.default.PBKDF2(passphrase, salt, {
        hasher: crypto_js_1.default.algo.SHA256,
        keySize: 64 / 8,
        iterations: iterations
    });
    return key;
}
/**
 * Encrypt function
 * @param {string} passphrase password
 * @param {string} plainText
 * @see {@link https://www.webmanajemen.com/2019/07/phpjs-cryptojs-encrypt-decrypt.html}
 */
function userJSEncrypt(passphrase, plainText, debug) {
    if (debug === void 0) { debug = false; }
    if (!plainText)
        return null;
    try {
        var key = getKey(passphrase, salt);
        var encrypted = crypto_js_1.default.AES.encrypt(plainText, key, {
            iv: crypto_js_1.default.enc.Utf8.parse(iv)
        });
        var result = encrypted.ciphertext.toString(crypto_js_1.default.enc.Base64);
        if (typeof result == 'string' && result.length)
            return result;
    }
    catch (error) {
        if (error instanceof Error && debug)
            console.log('AES encrypt error', error.message, {
                plainText: plainText,
                passphrase: passphrase
            });
    }
    return null;
}
/**
 * Decrypt function
 * @param {string} passphrase password
 * @param {string} encryptedText
 * @see {@link https://www.webmanajemen.com/2019/07/phpjs-cryptojs-encrypt-decrypt.html}
 */
function userJSDecrypt(passphrase, encryptedText, debug) {
    if (debug === void 0) { debug = false; }
    if (!encryptedText)
        return null;
    try {
        var key = getKey(passphrase, salt);
        var decrypted = crypto_js_1.default.AES.decrypt(encryptedText, key, {
            iv: crypto_js_1.default.enc.Utf8.parse(iv)
        });
        var result = decrypted.toString(crypto_js_1.default.enc.Utf8);
        if (typeof result == 'string' && result.length)
            return result;
    }
    catch (error) {
        if (error instanceof Error && debug)
            console.log('AES decrypt error', error.message, {
                encryptedText: encryptedText,
                passphrase: passphrase
            });
    }
    return null;
}
/**
 * @see {@link https://www.webmanajemen.com/2019/07/phpjs-cryptojs-encrypt-decrypt.html}
 */
exports.default = {
    encrypt: userJSEncrypt,
    decrypt: userJSDecrypt
};
