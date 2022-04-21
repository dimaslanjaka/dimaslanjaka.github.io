/**
 * Encrypt function
 * @param {string} passphrase password
 * @param {string} plainText
 * @see {@link https://www.webmanajemen.com/2019/07/phpjs-cryptojs-encrypt-decrypt.html}
 */
declare function userJSEncrypt(passphrase: string, plainText: string): string | null;
/**
 * Decrypt function
 * @param {string} passphrase password
 * @param {string} encryptedText
 * @see {@link https://www.webmanajemen.com/2019/07/phpjs-cryptojs-encrypt-decrypt.html}
 */
declare function userJSDecrypt(passphrase: string, encryptedText: string): string | null;
declare const _default: {
    encrypt: typeof userJSEncrypt;
    decrypt: typeof userJSDecrypt;
};
/**
 * @see {@link https://www.webmanajemen.com/2019/07/phpjs-cryptojs-encrypt-decrypt.html}
 */
export default _default;
