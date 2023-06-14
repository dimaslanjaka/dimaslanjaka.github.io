'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.trueCasePath = exports.trueCasePathSync = exports.isWindows = void 0;
const fs_extra_1 = require("fs-extra");
const os_1 = require("os");
const path_1 = require("path");
const upath_1 = require("upath");
const util_1 = require("util");
const readdir = (0, util_1.promisify)(fs_extra_1.readdir);
exports.isWindows = (0, os_1.platform)() === 'win32';
const delimiter = exports.isWindows ? '\\' : '/';
exports.trueCasePathSync = trueCasePathNew({ sync: true });
exports.trueCasePath = trueCasePathNew({ sync: false });
function trueCasePathNew(opt) {
    const defaults = { sync: false };
    const trueCase = _trueCasePath(Object.assign(defaults, opt || {}));
    return (filePath, basePath, cbOpt) => {
        if (filePath.length > 3) {
            let result;
            let bPath = undefined;
            let callbackOpt = Object.assign({ unix: false }, cbOpt || {});
            if (typeof basePath === 'string') {
                bPath = basePath;
            }
            else if (typeof basePath === 'object') {
                callbackOpt = Object.assign({ unix: false }, basePath || {});
            }
            let fPath = filePath;
            if (typeof bPath === 'string')
                fPath = (0, path_1.join)(bPath, filePath);
            if ((0, fs_extra_1.existsSync)(fPath)) {
                result = trueCase(filePath, bPath);
            }
            else {
                result = fPath.trim().replace(/^[a-zA-Z]:/g, function (match) {
                    return match.toUpperCase();
                });
            }
            if (callbackOpt === null || callbackOpt === void 0 ? void 0 : callbackOpt.unix) {
                return (0, upath_1.toUnix)(result);
            }
            else {
                return result;
            }
        }
        else {
            if (typeof basePath === 'string') {
                if (opt === null || opt === void 0 ? void 0 : opt.debug)
                    console.error('failed convert case-path of', { basePath, filePath });
                return (0, path_1.join)(basePath, filePath);
            }
            else {
                if (opt === null || opt === void 0 ? void 0 : opt.debug)
                    console.error('failed convert case-path of', { filePath });
                return filePath;
            }
        }
    };
}
function getRelevantFilePathSegments(filePath) {
    return filePath.split(delimiter).filter((s) => s !== '');
}
function escapeString(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function matchCaseInsensitive(fileOrDirectory, directoryContents, filePath) {
    const caseInsensitiveRegex = new RegExp(`^${escapeString(fileOrDirectory)}$`, 'i');
    for (const file of directoryContents) {
        if (caseInsensitiveRegex.test(file))
            return file;
    }
    throw new Error(`[true-case-path]: Called with ${filePath}, but no matching file exists`);
}
function _trueCasePath({ sync }) {
    return (filePath, basePath) => {
        var _a;
        if (!(0, fs_extra_1.existsSync)(filePath))
            return basePath ? (0, path_1.join)(basePath, filePath) : filePath;
        if (basePath) {
            if (!(0, path_1.isAbsolute)(basePath)) {
                throw new Error(`[true-case-path]: basePath argument must be absolute. Received "${basePath}"`);
            }
            basePath = (0, path_1.normalize)(basePath);
        }
        filePath = (0, path_1.normalize)(filePath);
        const segments = getRelevantFilePathSegments(filePath);
        if ((0, path_1.isAbsolute)(filePath)) {
            if (basePath) {
                throw new Error('[true-case-path]: filePath must be relative when used with basePath');
            }
            basePath = exports.isWindows
                ? (_a = segments.shift()) === null || _a === void 0 ? void 0 : _a.toUpperCase() // drive letter
                : '';
        }
        else if (!basePath) {
            basePath = process.cwd();
        }
        return sync ? iterateSync(basePath, filePath, segments) : iterateAsync(basePath, filePath, segments);
    };
}
function iterateSync(basePath, filePath, segments) {
    return segments.reduce((realPath, fileOrDirectory) => realPath + delimiter + matchCaseInsensitive(fileOrDirectory, (0, fs_extra_1.readdirSync)(realPath + delimiter), filePath), basePath);
}
async function iterateAsync(basePath, filePath, segments) {
    return await segments.reduce(async (realPathPromise, fileOrDirectory) => (await realPathPromise) +
        delimiter +
        matchCaseInsensitive(fileOrDirectory, await readdir((await realPathPromise) + delimiter), filePath), basePath);
}
