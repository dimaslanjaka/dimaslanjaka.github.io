"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var bluebird_1 = __importDefault(require("bluebird"));
var node_html_parser_1 = __importDefault(require("node-html-parser"));
var curl_1 = require("./curl");
function sslProxiesOrg() {
    return bluebird_1.default.resolve((0, curl_1.get)('http://www.sslproxies.org')).then(function (res) {
        var data = res.data;
        var regex = /[0-9]{1,4}.[0-9]{1,4}.[0-9]{1,4}.[0-9]{1,4}/gm;
        var regex2 = /[0-9]{1,4}.[0-9]{1,4}.[0-9]{1,4}.[0-9]{1,4}:[0-9]{1,5}/gm;
        var parser = (0, node_html_parser_1.default)(data.toString());
        var objectWrapper = [];
        parser.querySelectorAll('table').map(function (el) {
            el.querySelectorAll('tr').map(function (tr) {
                var buildObject = {
                    proxy: null,
                    code: null,
                    anonymity: null,
                    ssl: null,
                    google: null,
                    alert: null,
                    type: 'http',
                    test: null,
                };
                var td = tr.querySelectorAll('td');
                var proxy = td[0];
                var port = td[1];
                var countryCode = td[2];
                var anonymity = td[4];
                var google = td[5];
                var ssl = td[6];
                if (proxy && /^\d/.test(proxy.rawText)) {
                    //console.log(proxy.rawText, port.rawText, countryCode.rawText, anonymity.rawText, google.rawText, ssl.rawText);
                    buildObject.proxy = "".concat(proxy.rawText.trim(), ":").concat(port.rawText.trim());
                    buildObject.google = /^yes/.test(google.rawText.trim()) ? true : false;
                    buildObject.ssl = /^yes/.test(ssl.rawText.trim()) ? true : false;
                    buildObject.code = countryCode.rawText.trim();
                    switch (anonymity.rawText.trim()) {
                        case 'elite proxy':
                            buildObject.anonymity = 'H';
                            break;
                        case 'anonymous':
                            buildObject.anonymity = 'A';
                            break;
                        default:
                            buildObject.anonymity = 'N';
                            break;
                    }
                    objectWrapper.push(buildObject);
                }
            });
        });
        return objectWrapper;
    });
}
module.exports = sslProxiesOrg;
