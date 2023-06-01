"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gulpCached = exports.getShaFile = void 0;
const crypto_1 = __importDefault(require("crypto"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const os_1 = require("os");
const persistent_cache_1 = require("persistent-cache");
const through2_1 = __importDefault(require("through2"));
const upath_1 = require("upath");
const _config_1 = require("../config/_config");
const filemanager_1 = require("../utils/filemanager");
const hash_1 = require("../utils/hash");
/**
 * calculate sha1sum of file
 * @param file
 * @returns
 */
function getShaFile(file) {
    if (fs_extra_1.default.statSync(file).isDirectory())
        return null;
    const testFile = fs_extra_1.default.readFileSync(file);
    const sha1sum = crypto_1.default.createHash('sha1').update(testFile).digest('hex');
    return sha1sum;
}
exports.getShaFile = getShaFile;
function cacheLib(options) {
    const config = (0, _config_1.getConfig)();
    options = Object.assign({ name: 'gulp-cached', base: (0, upath_1.join)(config.cwd, 'tmp'), prefix: '' }, options);
    return (0, persistent_cache_1.persistentCache)(options);
}
/**
 * * [source idea](https://github.com/gulp-community/gulp-cached/blob/8e8d13cb07b17113ff94700e87f136eeaa1f1340/index.js#L35-L44)
 * @param options
 * @returns
 */
function gulpCached(options = {}) {
    var _a;
    const caches = cacheLib(options);
    //const logname = 'gulp-' + ansiColors.grey('cached');
    const pid = process.pid;
    let caller;
    if (options.name) {
        caller = options.name;
    }
    else {
        caller =
            (0, hash_1.data_to_hash_sync)('md5', ((_a = new Error('get caller').stack) === null || _a === void 0 ? void 0 : _a.split(/\r?\n/gim).filter((str) => /(dist|src)/i.test(str))[1]) || '').slice(0, 5) +
                '-' +
                pid;
    }
    return through2_1.default.obj(function (file, _enc, next) {
        var _a, _b;
        // skip directory
        if (file.isDirectory())
            return next(null, file);
        const cacheKey = (0, hash_1.md5)(file.path);
        const sha1sum = getShaFile(file.path);
        /**
         * Checks if file has been changed by comparing its current SHA1
         * hash with the one in cache, if present. Returns true if the
         * file hasChanged, false if not.
         */
        const isChanged = () => {
            const currentHash = caches.getSync(cacheKey, '');
            const newHash = getShaFile(file.path);
            // If no hash exists for file, consider file has changed
            // cache has expired or cache file has been deleted
            if (!currentHash) {
                return true;
            }
            // Cache exists and hashes differ
            if (currentHash && currentHash !== newHash) {
                return true;
            }
            // check destination when cache exist
            if (options.dest && options.cwd) {
                const destPath = (0, upath_1.join)((0, upath_1.toUnix)(options.dest), (0, upath_1.toUnix)(file.path).replace((0, upath_1.toUnix)(options.cwd), ''));
                return fs_extra_1.default.existsSync(destPath);
            }
            // File has not changed, leave cache as-
            return false;
        };
        const paths = {
            dest: (0, upath_1.toUnix)(((_a = options.dest) === null || _a === void 0 ? void 0 : _a.replace(process.cwd(), '')) || ''),
            cwd: (0, upath_1.toUnix)(((_b = options.cwd) === null || _b === void 0 ? void 0 : _b.replace(process.cwd(), '')) || ''),
            source: (0, upath_1.toUnix)(file.path.replace(process.cwd(), ''))
        };
        // dump
        const dumpfile = (0, upath_1.join)(process.cwd(), 'tmp/dump/gulp-cached', `${caller}.log`);
        (0, filemanager_1.writefile)(dumpfile, `"${paths.source}" is cached ${isChanged()} with dest validation ${options.dest && options.cwd ? 'true' : 'false'}` + os_1.EOL, {
            append: true
        });
        /*scheduler.add(`${logname} dump ${ansiColors.cyan(caller)} pid ${ansiColors.yellow(String(pid))}`, () =>
          console.log(logname, dumpfile)
        );*/
        if (isChanged()) {
            // not cached
            caches.setSync(cacheKey, sha1sum);
            // push modified file
            if (typeof this.push === 'function')
                this.push(file);
            return next();
        }
        else {
            // cached
            // drop non-modified data
            return next();
        }
    });
}
exports.gulpCached = gulpCached;
exports.default = gulpCached;
