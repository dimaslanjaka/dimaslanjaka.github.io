"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.b64 = void 0;
var crypto_js_1 = __importDefault(require("crypto-js"));
exports.b64 = {
    encode: function (str) {
        if (!str)
            return null;
        try {
            var encodedWord = crypto_js_1.default.enc.Utf8.parse(str); // encodedWord Array object
            return crypto_js_1.default.enc.Base64.stringify(encodedWord);
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
            var encodedWord = crypto_js_1.default.enc.Base64.parse(encoded); // encodedWord via Base64.parse()
            return crypto_js_1.default.enc.Utf8.stringify(encodedWord);
        }
        catch (error) {
            //console.log('Error Base64 decode: ' + String(error));
            return null;
        }
    }
};
exports.default = exports.b64;
