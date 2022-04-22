import { Nullable } from './resolveQueryUrl';
/**
 * Encrypt function
 * @param {string} passphrase password
 * @param {string} plainText
 * @see {@link https://www.webmanajemen.com/2019/07/phpjs-cryptojs-encrypt-decrypt.html}
 */
declare function userJSEncrypt(passphrase: string, plainText: Nullable<string>, debug?: boolean): Nullable<string>;
/**
 * Decrypt function
 * @param {string} passphrase password
 * @param {string} encryptedText
 * @see {@link https://www.webmanajemen.com/2019/07/phpjs-cryptojs-encrypt-decrypt.html}
 */
declare function userJSDecrypt(passphrase: string, encryptedText: Nullable<string>, debug?: boolean): Nullable<string>;
declare const _default: {
    encrypt: typeof userJSEncrypt;
    decrypt: typeof userJSDecrypt;
};
/**
 * @see {@link https://www.webmanajemen.com/2019/07/phpjs-cryptojs-encrypt-decrypt.html}
 */
export default _default;
