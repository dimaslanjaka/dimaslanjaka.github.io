'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gulpDom = exports.gulpDomPath = exports.customPath = void 0;
const jsdom_1 = __importDefault(require("jsdom"));
const plugin_error_1 = __importDefault(require("plugin-error"));
const through2_1 = __importDefault(require("through2"));
const upath_1 = __importDefault(require("upath"));
const case_path_1 = require("../utils/filemanager/case-path");
const pluginName = 'gulp-dom';
const path = {
    join: (...str) => upath_1.default.toUnix((0, case_path_1.trueCasePathSync)(upath_1.default.join(...str))),
    dirname: (str) => upath_1.default.toUnix((0, case_path_1.trueCasePathSync)(upath_1.default.dirname(str))),
    toUnix: (str) => upath_1.default.toUnix((0, case_path_1.trueCasePathSync)(str))
};
exports.customPath = path;
exports.gulpDomPath = path;
/**
 * gulp-dom
 * @param mutator callback
 * @returns
 * @example
 * const gulp = require('gulp');
    gulp.task('html', function() {
        return gulp.src('./src/index.html')
            .pipe(gulpDom(function(){
                return this.querySelectorAll('body')[0].setAttribute('data-version', '1.0');
            }))
            .pipe(gulp.dest('./public/'));
    });
 */
function gulpDom(mutator) {
    const stream = through2_1.default.obj(function (file, _enc, callback) {
        if (file.isNull()) {
            return callback(null, file);
        }
        if (file.isStream()) {
            return stream.emit('error', new plugin_error_1.default(pluginName, 'Streaming not supported'));
        }
        if (file.isBuffer()) {
            try {
                const dom = new jsdom_1.default.JSDOM(file.contents.toString('utf8'));
                const mutated = mutator.call(dom.window.document, file.path);
                file.contents = Buffer.from(typeof mutated === 'string' ? mutated : dom.serialize());
                callback(null, file);
                dom.window.close();
            }
            catch (e) {
                if (e instanceof Error) {
                    console.log(e.message);
                }
                console.log(pluginName, 'drop file', file.path);
                // drop file
                callback();
            }
        }
    });
    return stream;
}
exports.gulpDom = gulpDom;
exports.default = gulpDom;
