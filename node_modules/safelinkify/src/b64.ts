import CryptoJS from 'crypto-js';
import { Nullable } from './globals';

export const b64 = {
  encode: (str: string): Nullable<string> => {
    if (!str) return null;
    try {
      const encodedWord = CryptoJS.enc.Utf8.parse(str); // encodedWord Array object
      return CryptoJS.enc.Base64.stringify(encodedWord);
    } catch (error) {
      //console.log('Error Base64 encode: ' + String(error));
      return null;
    }
  },
  decode: (encoded: string): Nullable<string> => {
    if (!encoded) return null;
    try {
      const encodedWord = CryptoJS.enc.Base64.parse(encoded); // encodedWord via Base64.parse()
      return CryptoJS.enc.Utf8.stringify(encodedWord);
    } catch (error) {
      //console.log('Error Base64 decode: ' + String(error));
      return null;
    }
  }
};
export default b64;
