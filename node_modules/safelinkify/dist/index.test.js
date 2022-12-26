"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var upath_1 = require("upath");
var _1 = __importDefault(require("."));
console.clear();
var options = {
    // exclude patterns (dont anonymize these patterns)
    exclude: [
        'domain.com',
        /another.domain.com/,
        /https?:\/\/?(?:([^*]+)\.)?webmanajemen\.com/,
        /([a-z0-9](?:[a-z0-9-]{1,61}[a-z0-9])?[.])*webmanajemen\.com/
    ],
    // url redirector
    redirect: 'https://www.webmanajemen.com/page/safelink.html?url=',
    // debug
    verbose: false,
    // encryption type = 'base64' | 'aes'
    type: 'base64',
    // password aes, default = root
    password: 'unique-password'
};
var sf = new _1.default.safelink(options);
var processedExternalLinks = sf.parse("\n<a href=\"www.example.com/page.php?id=xxxx&name=yyyy\" ....>external</a>\n<a href=\"http://www.example.com/page.php?id=xxxx&name=yyyy\" ....>external</a>\n<a href=\"https://www.example.com/page.php?id=xxxx&name=yyyy\" ....>external</a>\n<a href=\"www.example.com/page.php/404\" ....></a>\n<a href=\"http://external.domain.com\">internal</a>\n<a href=\"http://www.webmanajemen.com\">internal</a>\n<a href=\"http://webmanajemen.com\">internal</a>\n<a href=\"#http://webmanajemen.com\">#internal</a>\n<a href=\"?http://webmanajemen.com\">?internal</a>\n<a href=\"\">internal</a>\n");
processedExternalLinks.then(function (result) {
    (0, fs_1.writeFileSync)((0, upath_1.join)(__dirname, 'test/processedExternalLinks.html'), result);
});
// parse from file
var readFromFile = (0, fs_1.readFileSync)((0, upath_1.join)(__dirname, 'test/index.html')).toString();
if (typeof readFromFile == 'string' && readFromFile) {
    var parseFromFile = sf.parse(readFromFile);
    if (typeof parseFromFile == 'string' && parseFromFile)
        (0, fs_1.writeFileSync)((0, upath_1.join)(__dirname, 'test/index.safelinkify.html'), parseFromFile);
}
