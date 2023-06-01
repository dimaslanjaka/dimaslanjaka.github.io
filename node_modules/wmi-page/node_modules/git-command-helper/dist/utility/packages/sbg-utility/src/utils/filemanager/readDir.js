"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readDirAsync = exports.readDir = void 0;
const bluebird_1 = __importDefault(require("bluebird"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const upath_1 = __importDefault(require("upath"));
/**
 * read directory recursive callback
 * @param dir
 * @returns
 */
const readDir = function (dir, done) {
    let results = [];
    fs_extra_1.default.readdir(dir, function (err, list) {
        if (err)
            return done(err);
        let i = 0;
        (function next() {
            let file = list[i++];
            if (!file)
                return done(undefined, results);
            file = upath_1.default.resolve(dir, file);
            fs_extra_1.default.stat(file, function (err, stat) {
                if (!err && stat && stat.isDirectory()) {
                    (0, exports.readDir)(file, function (err, res) {
                        if (!err && Array.isArray(res))
                            results = results.concat(res);
                        next();
                    });
                }
                else {
                    results.push(file);
                    next();
                }
            });
        })();
    });
};
exports.readDir = readDir;
/**
 * read directory recursive async
 * @param dir
 * @returns
 */
const readDirAsync = function (dir) {
    return new bluebird_1.default((resolve, reject) => {
        (0, exports.readDir)(dir, function (err, files) {
            if (err)
                reject(err);
            resolve(files);
        });
    });
};
exports.readDirAsync = readDirAsync;
exports.default = exports.readDir;
