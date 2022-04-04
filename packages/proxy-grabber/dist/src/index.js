"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var db_1 = __importDefault(require("./db"));
var spys_1 = __importDefault(require("./spys"));
var moment_1 = __importDefault(require("moment"));
var sslproxies_1 = __importDefault(require("./sslproxies"));
var bluebird_1 = __importDefault(require("bluebird"));
var proxylist_1 = __importDefault(require("./proxylist"));
var path_1 = __importDefault(require("path"));
var curl_1 = __importDefault(require("./curl"));
require("js-prototypes");
var db = new db_1.default(path_1.default.join(process.cwd(), 'databases/proxies'));
/**
 * Proxy Grabber
 */
var proxyGrabber = /** @class */ (function () {
    /**
     * Proxy Grabber Constructor
     * @param TTL Time To Live in Day
     */
    function proxyGrabber(TTL) {
        if (TTL === void 0) { TTL = 1; }
        this.TTL = TTL;
    }
    proxyGrabber.prototype.method1 = function () {
        var lastUpdated = db.exists('/spys/lastUpdated') ? db.get('/spys/lastUpdated') : 100;
        // if spys last grab is more than 1 day
        if ((0, moment_1.default)().diff(lastUpdated, 'days') > this.TTL) {
            return (0, spys_1.default)().then(function (proxies) {
                db.push('/spys/lastUpdated', new Date());
                db.push('/spys/proxies', proxies);
                return proxies;
            });
        }
        return bluebird_1.default.resolve(db.get('/spys/proxies'));
    };
    proxyGrabber.prototype.method2 = function () {
        var lastUpdated = db.exists('/sslProxiesOrg/lastUpdated') ? db.get('/sslProxiesOrg/lastUpdated') : 100;
        if ((0, moment_1.default)().diff(lastUpdated, 'days') > this.TTL) {
            return (0, sslproxies_1.default)().then(function (proxies) {
                db.push('/sslProxiesOrg/lastUpdated', new Date());
                db.push('/sslProxiesOrg/proxies', proxies);
                return proxies;
            });
        }
        return bluebird_1.default.resolve(db.get('/sslProxiesOrg/proxies'));
    };
    proxyGrabber.prototype.method3 = function () {
        var lastUpdated = db.exists('/proxyListOrg/lastUpdated') ? db.get('/proxyListOrg/lastUpdated') : 100;
        if ((0, moment_1.default)().diff(lastUpdated, 'days') > this.TTL) {
            return (0, proxylist_1.default)().then(function (proxies) {
                db.push('/proxyListOrg/lastUpdated', new Date());
                db.push('/proxyListOrg/proxies', proxies);
                return proxies;
            });
        }
        return bluebird_1.default.resolve(db.get('/proxyListOrg/proxies'));
    };
    /**
     * Get all grabbed proxies
     * @returns
     */
    proxyGrabber.prototype.get = function () {
        var _this = this;
        //return Object.assign(this.method1(), this.method2());
        return this.method1().then(function (proxies) {
            return _this.method2().then(function (proxies2) {
                return _this.method3().then(function (proxies3) {
                    return Object.assign(proxies, proxies2, proxies3);
                });
            });
        });
    };
    proxyGrabber.prototype.getDb = function () {
        return { proxyListOrg: this.method3, sslProxiesOrg: this.method2, spys: this.method1 };
    };
    /**
     * Test all proxies
     * @param limit limit proxies each instance to test (0=unlimited)
     */
    proxyGrabber.prototype.test = function (limit) {
        if (limit === void 0) { limit = 10; }
        var self = this;
        function testProxies(proxies, dbKey) {
            return proxies.map(function (obj) {
                var result = { error: true, proxy: null, message: null, code: 0 };
                return curl_1.default
                    .testProxy(obj.proxy, 'https://httpbin.org/get', { HTTPHEADER: ['Accept: application/json'], TIMEOUT: '60L' })
                    .then(function (res) {
                    //console.log({ proxy: obj.proxy, origin: res.data.origin });
                    //console.log(res.headers[1]['content-type'] == 'application/json');
                    result.error = res.status != 200 && res.headers[1]['content-type'] != 'application/json';
                    result.proxy = obj;
                    obj.test = !result.error ? 'PASSED' : 'FAILED';
                    db.edit(dbKey, obj, { proxy: obj.proxy });
                    return result;
                })
                    .catch(function (e) {
                    result.error = true;
                    result.proxy = obj;
                    result.message = e.message;
                    result.code = e['code'];
                    return result;
                });
            });
        }
        function getProxies() {
            var getProxies = [self.method1(), self.method2(), self.method3()];
            var results = [];
            return bluebird_1.default.all(getProxies).map(function (proxies, index) {
                // calculate database key
                var dbKey;
                switch (index) {
                    case 0:
                        dbKey = '/spys/proxies';
                        break;
                    case 1:
                        dbKey = '/sslProxiesOrg/proxies';
                        break;
                    case 2:
                        dbKey = '/proxyListOrg/proxies';
                        break;
                }
                if (dbKey) {
                    proxies = proxies.uniqueObjectKey('proxy').shuffle();
                    if (limit > 0)
                        proxies.length = limit;
                    var test = testProxies(proxies, dbKey).map(function (tested) {
                        return tested.then(function (result) {
                            results = results.concat(result);
                            return bluebird_1.default.all(results);
                        });
                    });
                    return bluebird_1.default.all(test).then(function () {
                        console.log('test', index + 1, 'done');
                        return results;
                    });
                }
                else {
                    console.log('dbKey not found');
                }
            });
        }
        return getProxies();
    };
    proxyGrabber.prototype.toString = function () {
        return JSON.stringify(this.get());
    };
    return proxyGrabber;
}());
module.exports = proxyGrabber;
