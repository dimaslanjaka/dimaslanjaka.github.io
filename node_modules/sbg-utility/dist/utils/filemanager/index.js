"use strict";
// filemanager
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMarkdown = exports.isAsset = exports.createWriteStream = exports.path = exports.fs = exports.pathJoin = exports.joinPath = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs-extra"));
exports.fs = fs;
const path = tslib_1.__importStar(require("upath"));
exports.path = path;
tslib_1.__exportStar(require("./del"), exports);
tslib_1.__exportStar(require("./emptyDir"), exports);
tslib_1.__exportStar(require("./getAppRootDir"), exports);
tslib_1.__exportStar(require("./images"), exports);
tslib_1.__exportStar(require("./normalizePath"), exports);
var normalizePath_1 = require("./normalizePath");
Object.defineProperty(exports, "joinPath", { enumerable: true, get: function () { return normalizePath_1.normalizePath; } });
Object.defineProperty(exports, "pathJoin", { enumerable: true, get: function () { return normalizePath_1.normalizePath; } });
tslib_1.__exportStar(require("./readDir"), exports);
tslib_1.__exportStar(require("./writefile"), exports);
/**
 * create writestream (auto create dirname)
 * @param dest
 * @param options
 * @returns
 */
function createWriteStream(dest, options) {
    if (!fs.existsSync(path.dirname(dest)))
        fs.mkdirSync(path.dirname(dest));
    return fs.createWriteStream(dest, options);
}
exports.createWriteStream = createWriteStream;
/**
 * is non-markdown file
 * @param path
 * @returns
 */
const isAsset = (path) => /.(js|css|scss|njk|ejs|png|jpe?g|gif|svg|webp|json|html|txt)$/.test(String(path));
exports.isAsset = isAsset;
/**
 * is markdown file
 * @param path
 * @returns
 */
const isMarkdown = (path) => /.(md)$/i.test(String(path));
exports.isMarkdown = isMarkdown;
//# sourceMappingURL=index.js.map