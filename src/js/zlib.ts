/**
 * ZLIB packer
 * @see http://localhost/src/ZLIB.php
 * @requires pako `npm i pako @types/pako`
 */
class zlib {
  /**
   * Base64 decode from php
   * @param {Uint8Array} arr
   */
  static atos(arr) {
    for (var i = 0, l = arr.length, s = "", c; (c = arr[i++]); )
      s += String.fromCharCode(
        c > 0xdf && c < 0xf0 && i < l - 1
          ? ((c & 0xf) << 12) | ((arr[i++] & 0x3f) << 6) | (arr[i++] & 0x3f)
          : c > 0x7f && i < l
          ? ((c & 0x1f) << 6) | (arr[i++] & 0x3f)
          : c
      );
    return s;
  }

  static decompress(str) {
    const dec = this.atos(pako.ungzip(base64_decode(str)));
    console.log({
      "ZLIB.decompress": {
        target: str,
        result: dec,
      },
    });
    return dec;
  }

  static compress(str) {
    let enc = pako.gzip(str, {
      to: "string",
    });
    enc = base64_encode(enc);
    console.log({
      "ZLIB.compress": {
        target: str,
        result: enc,
      },
    });
    return enc;
  }
}

if (typeof module != "undefined" && module.exports) {
  module.exports = { zlib };
}
