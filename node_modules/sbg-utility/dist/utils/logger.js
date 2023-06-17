"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const tslib_1 = require("tslib");
const fs_extra_1 = require("fs-extra");
const slugify_1 = tslib_1.__importDefault(require("slugify"));
const upath_1 = require("upath");
const configs = tslib_1.__importStar(require("../config"));
const filemanager_1 = require("./filemanager");
const jest_1 = require("./jest");
let FOLDER = (0, upath_1.join)(process.cwd(), 'tmp/logs');
let cwd = process.cwd();
// disable console.log on jest
if ((0, jest_1.areWeTestingWithJest)()) {
    const log = console.log;
    console.log = function (...args) {
        if (typeof configs.getConfig === 'function') {
            const cfg = configs.getConfig();
            FOLDER = (0, upath_1.join)(cfg.cwd, 'tmp/logs/');
            cwd = cfg.cwd;
        }
        const stack = (new Error('').stack || '').split(/\r?\n/gm);
        let msg = (stack || [])[3] || '';
        if (msg.includes(__filename)) {
            msg = (stack || [])[2] || '';
        }
        // log(stack[2], stack[4]);
        const filename = (0, slugify_1.default)((0, upath_1.toUnix)(msg).replace((0, upath_1.toUnix)(cwd), ''), {
            lower: true,
            trim: true,
            replacement: '-',
            strict: true
        });
        const header = `\n\n ${new Date()} \n\n`;
        const write = (0, filemanager_1.writefile)((0, upath_1.join)(FOLDER, filename + '.log'), header + args.join('\n\n'), { append: true });
        log(write.file);
    };
}
const _log = typeof hexo === 'undefined' ? console : Object.assign({ log: console.log }, hexo.log);
/**
 * @example
 * const console = Logger
 * Logger.log('hello world'); // should be written in <temp folder>/logs/[trace-name].log
 */
class Logger {
    static log(...args) {
        _log.log(...args);
        this.tracer(...args);
    }
    static info(...args) {
        _log.info.apply(null, args);
        this.tracer(...args);
    }
    static error(...args) {
        _log.error.apply(null, args);
        this.tracer(...args);
    }
    static tracer(...args) {
        const error = new Error();
        const split = error.stack?.split(/\r?\n/gm).map((str) => {
            const split2 = str.trim().split(' ');
            return {
                name: split2[1],
                path: split2[2]?.replace(/\\+/gm, '/').replace(/^\(/, '').replace(/\)$/, '')
                //trace: error.stack
            };
        });
        if (split) {
            split.splice(0, 3);
            let logfile;
            let templ;
            // anonymous caller
            if (typeof split[0].path === 'undefined' && split[1].path.includes('anonymous')) {
                const id = split[1].name;
                const path = split[0].name;
                const base = (0, upath_1.basename)(path.split(':')[0].length === 1 ? path.split(':')[0] + ':' + path.split(':')[1] : path.split(':')[0]);
                logfile = (0, upath_1.join)(FOLDER, (0, slugify_1.default)(id, { trim: true }) + '-' + (0, slugify_1.default)(base, { trim: true }) + '.log');
                if (!(0, fs_extra_1.existsSync)(logfile)) {
                    (0, filemanager_1.writefile)(logfile, '');
                }
                templ = `${'='.repeat(20)}\nfile: ${path}\ndate: ${new Date()}\n${'='.repeat(20)}\n\n`;
                args.forEach((o) => {
                    if (o === null)
                        o = 'null';
                    if (typeof o === 'object') {
                        try {
                            o = JSON.stringify(o, null, 2);
                        }
                        catch {
                            //
                        }
                    }
                    templ += String(o) + '\n\n';
                });
                (0, fs_extra_1.appendFileSync)(logfile, templ);
            }
            // Logger.log(split);
        }
    }
}
exports.Logger = Logger;
exports.default = Logger;
//# sourceMappingURL=logger.js.map