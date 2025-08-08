import CryptoJS from 'crypto-js';
export var b64 = {
    encode: function (str) {
        if (!str)
            return null;
        try {
            var encodedWord = CryptoJS.enc.Utf8.parse(str); // encodedWord Array object
            return CryptoJS.enc.Base64.stringify(encodedWord);
        }
        catch (error) {
            //console.log('Error Base64 encode: ' + String(error));
            return null;
        }
    },
    decode: function (encoded) {
        if (!encoded)
            return null;
        try {
            var encodedWord = CryptoJS.enc.Base64.parse(encoded); // encodedWord via Base64.parse()
            return CryptoJS.enc.Utf8.stringify(encodedWord);
        }
        catch (error) {
            //console.log('Error Base64 decode: ' + String(error));
            return null;
        }
    }
};
export default b64;
