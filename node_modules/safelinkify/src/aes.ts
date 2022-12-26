import CryptoJS from 'crypto-js';
import { Nullable } from './globals';

var salt = 'salt'; //salt
var iv = '1111111111111111'; //pass salt minimum length 12 chars
var iterations = 999; //iterations

/**
 * Get key
 * @param {string} passphrase
 * @param {string} salt
 * @see {@link https://www.webmanajemen.com/2019/07/phpjs-cryptojs-encrypt-decrypt.html}
 */
function getKey(passphrase: string, salt: string) {
  var key = CryptoJS.PBKDF2(passphrase, salt, {
    hasher: CryptoJS.algo.SHA256,
    keySize: 64 / 8,
    iterations
  });
  return key;
}

/**
 * Encrypt function
 * @param {string} passphrase password
 * @param {string} plainText
 * @see {@link https://www.webmanajemen.com/2019/07/phpjs-cryptojs-encrypt-decrypt.html}
 */
function userJSEncrypt(passphrase: string, plainText: Nullable<string>, debug = false): Nullable<string> {
  if (!plainText) return null;
  try {
    var key = getKey(passphrase, salt);
    var encrypted = CryptoJS.AES.encrypt(plainText, key, {
      iv: CryptoJS.enc.Utf8.parse(iv)
    });
    const result = encrypted.ciphertext.toString(CryptoJS.enc.Base64);
    if (typeof result == 'string' && result.length) return result;
  } catch (error) {
    if (error instanceof Error && debug)
      console.log('AES encrypt error', error.message, {
        plainText,
        passphrase
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
function userJSDecrypt(passphrase: string, encryptedText: Nullable<string>, debug = false): Nullable<string> {
  if (!encryptedText) return null;
  try {
    var key = getKey(passphrase, salt);
    var decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
      iv: CryptoJS.enc.Utf8.parse(iv)
    });
    const result = decrypted.toString(CryptoJS.enc.Utf8);
    if (typeof result == 'string' && result.length) return result;
  } catch (error) {
    if (error instanceof Error && debug)
      console.log('AES decrypt error', error.message, {
        encryptedText,
        passphrase
      });
  }
  return null;
}

/**
 * @see {@link https://www.webmanajemen.com/2019/07/phpjs-cryptojs-encrypt-decrypt.html}
 */
export default {
  encrypt: userJSEncrypt,
  decrypt: userJSDecrypt
};
