"use strict";
// filemanager
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMarkdown = exports.isAsset = exports.createWriteStream = exports.path = exports.fs = exports.pathJoin = exports.joinPath = void 0;
const fs = __importStar(require("fs-extra"));
exports.fs = fs;
const path = __importStar(require("upath"));
exports.path = path;
__exportStar(require("./del"), exports);
__exportStar(require("./emptyDir"), exports);
__exportStar(require("./getAppRootDir"), exports);
__exportStar(require("./images"), exports);
__exportStar(require("./normalizePath"), exports);
var normalizePath_1 = require("./normalizePath");
Object.defineProperty(exports, "joinPath", { enumerable: true, get: function () { return normalizePath_1.normalizePath; } });
Object.defineProperty(exports, "pathJoin", { enumerable: true, get: function () { return normalizePath_1.normalizePath; } });
__exportStar(require("./readDir"), exports);
__exportStar(require("./writefile"), exports);
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
