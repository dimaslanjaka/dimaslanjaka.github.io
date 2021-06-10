/// <reference types="crypto-js" />

const CryptoJSAesJson = {
  stringify: function (cipherParams: CryptoJS.lib.CipherParams) {
    const j = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64), iv: "", s: "" };
    if (cipherParams.iv) j.iv = cipherParams.iv.toString();
    if (cipherParams.salt) j.s = cipherParams.salt.toString();
    return JSON.stringify(j);
  },
  parse: function (jsonStr: string) {
    const j = JSON.parse(jsonStr);
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(j.ct),
    });
    if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv);
    if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s);
    return cipherParams;
  },
};

/**
 * AES encrypt
 * @see /src/shim/Cipher.php
 * @param text
 * @param key
 * @returns
 */
function aesEncrypt(text: string, key: string | CryptoJS.lib.WordArray) {
  const enc = CryptoJS.AES.encrypt(JSON.stringify(text), key, {
    format: CryptoJSAesJson,
  }).toString();
  return base64_encode(enc);
}

/**
 * AES decrypt
 * @see /src/shim/Cipher.php
 * @param encrypted
 * @param key
 * @returns
 */
function aesDecrypt(encrypted: string, key: string | CryptoJS.lib.WordArray) {
  const dec = base64_decode(encrypted);
  return JSON.parse(
    CryptoJS.AES.decrypt(dec, key, {
      format: CryptoJSAesJson,
    }).toString(CryptoJS.enc.Utf8)
  );
}

if (typeof module != "undefined" && typeof module.exports != "undefined") {
  module.exports = {
    aesDecrypt,
    aesEncrypt,
  };
}
