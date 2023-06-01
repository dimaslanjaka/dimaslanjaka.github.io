"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gulpLog = exports.gulpDebug = void 0;
const ansi_colors_1 = __importDefault(require("ansi-colors"));
const os_1 = require("os");
const through2_1 = __importDefault(require("through2"));
const upath_1 = require("upath");
const filemanager_1 = require("../utils/filemanager");
const hash_1 = require("../utils/hash");
const logger_1 = __importDefault(require("../utils/logger"));
const scheduler_1 = __importDefault(require("../utils/scheduler"));
function gulpDebug(filename) {
    var _a;
    const caller = (0, hash_1.data_to_hash_sync)('md5', ((_a = new Error('get caller').stack) === null || _a === void 0 ? void 0 : _a.split(/\r?\n/gim).filter((str) => /(dist|src)/i.test(str))[1]) || '').slice(0, 5);
    const pid = process.pid;
    const logname = 'gulp-' + ansi_colors_1.default.gray('debug');
    return through2_1.default.obj(function (file, _enc, cb) {
        // Logger.log(ansiColors.yellowBright('gulp-debug'), process.pid, toUnix(file.path.replace(process.cwd(), '')));
        // dump
        const dumpfile = (0, upath_1.join)(process.cwd(), 'tmp/dump/gulp-debug', filename || `${caller}-${pid}.log`);
        (0, filemanager_1.writefile)(dumpfile, `${(0, upath_1.toUnix)(file.path.replace(process.cwd(), ''))}` + os_1.EOL, {
            append: true
        });
        scheduler_1.default.add(`${logname} dump ${ansi_colors_1.default.cyan(caller)} pid ${ansi_colors_1.default.yellow(String(pid))}`, () => console.log(logname, dumpfile));
        if (typeof this.push === 'function')
            this.push(file);
        cb(null, file);
    });
}
exports.gulpDebug = gulpDebug;
/**
 * log all files
 * @returns
 */
function gulpLog(logname = '') {
    return through2_1.default.obj(function (file, _enc, cb) {
        logger_1.default.log(ansi_colors_1.default.yellowBright('gulp-log'), logname, (0, upath_1.toUnix)(file.path.replace(process.cwd(), '')), String(file.contents).length);
        if (typeof this.push === 'function')
            this.push(file);
        cb(null, file);
    });
}
exports.gulpLog = gulpLog;
exports.default = gulpDebug;
