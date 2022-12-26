import aes from './aes';
import b64 from './b64';
import { encryptionURLResult, Nullable } from './globals';

const _global_encryptionURL = (typeof window !== 'undefined' ? window : global) as any;

/**
 * resolve url encryption
 * @param url
 * @param passphrase
 * @returns
 */
export default function encryptionURL(url: Nullable<string | URL>, passphrase: string = 'root', debug = false) {
  /** Default Return Value */
  const defaultRet: encryptionURLResult = {
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
      passphrase
    }
  };
  if (!url) return defaultRet;
  const value = url instanceof URL ? url.href : url;
  /** BASE64 Decrypt */
  const b64d = b64.decode(value);
  /** BASE64 Encrypt */
  const b64e = b64.encode(value);
  /** AES Encrypt */
  const aese = aes.encrypt(passphrase, value, debug);
  /** AES Decrypt */
  const aesd = aes.decrypt(passphrase, value, debug);
  return Object.assign(defaultRet, {
    value,
    base64: {
      encode: b64d ? null : b64e,
      decode: b64d
    },
    aes: {
      encode: aesd ? null : aese,
      decode: aesd,
      passphrase
    }
  });
}

_global_encryptionURL.encryptionURL = encryptionURL;
