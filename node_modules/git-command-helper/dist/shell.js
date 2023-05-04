"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shell = void 0;
const hexo_util_1 = require("hexo-util");
/**
 * asynchronous spawner
 * @param cmd
 * @param args
 * @param opt
 * @returns
 */
async function shell(cmd, args, opt) {
    let useOpt = {
        cwd: __dirname,
        verbose: false,
        supress: false
    };
    if (opt) {
        useOpt = Object.assign(useOpt, opt);
    }
    if (useOpt.verbose)
        console.log('executing', cmd, ...args);
    try {
        return await (0, hexo_util_1.spawn)(cmd, args, useOpt);
    }
    catch (e) {
        if (!useOpt.supress) {
            if (e instanceof Error)
                return console.log(e.message);
            return console.trace(e);
        }
    }
}
exports.shell = shell;
