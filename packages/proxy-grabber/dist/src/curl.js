"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testProxy = exports.get = void 0;
/* eslint-disable @typescript-eslint/no-empty-function */
require("js-prototypes");
var axios_1 = __importDefault(require("axios"));
var axiosDefault = function (url) {
    return {
        baseURL: url,
        maxRedirects: 5,
        timeout: 1000 * 5,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
            Referer: 'http://google.com/crawler',
        },
    };
};
function get(url, options) {
    var opt = ObjectReplaceFrom(axiosDefault(url), options);
    var instance = axios_1.default.create(opt);
    return instance.get(url).then(function (res) {
        var statusCode = res.status;
        if (statusCode == 301 || statusCode == 302) {
            console.log(res.headers);
            return null;
        }
        return res;
    });
    /*.catch((reason: AxiosError) => {
        if (reason.response?.status === 400) {
          // Handle 400
        } else {
          // Handle else
        }
        return reason;
      });*/
}
exports.get = get;
function testProxy(proxy, target, options) {
    if (target === void 0) { target = 'http://google.com'; }
    var def = {
    /*USERAGENT:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
    FOLLOWLOCATION: true,
    REFERER: 'https://webmanajemen.com',
    httpProxyTunnel: '1L',
    PROXY: proxy,*/
    };
    return get(target, ObjectReplaceFrom(def, options));
}
exports.testProxy = testProxy;
/**
 * Object replace value by key from another object
 * @param obj Object to replace
 * @param anotherobj Replace key from this object
 * @returns
 */
function ObjectReplaceFrom(obj, anotherobj) {
    if (typeof anotherobj == 'object') {
        for (var key in anotherobj) {
            if (Object.prototype.hasOwnProperty.call(anotherobj, key)) {
                var element = anotherobj[key];
                obj[key] = element;
            }
        }
    }
    return obj;
}
exports.default = {
    testProxy: testProxy,
    curlGET: get,
    ObjectReplaceFrom: ObjectReplaceFrom,
};
