"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chain = void 0;
const tslib_1 = require("tslib");
const ansi_colors_1 = tslib_1.__importDefault(require("ansi-colors"));
const stream_1 = tslib_1.__importDefault(require("stream"));
const logger_1 = tslib_1.__importDefault(require("./logger"));
/**
 * Chainable function runner
 * @param schedule array of function objects
 */
async function chain(schedule) {
    // NodeJS.ReadWriteStream | Promise<any>
    const run = function (instance) {
        return new Promise(function (resolve) {
            const logname = ansi_colors_1.default.blueBright('chain') + '.' + ansi_colors_1.default.yellowBright('run');
            if (instance.opt?.before) {
                instance.opt.before();
            }
            const obj = instance.callback.call && instance.callback.call(null);
            if (isReadableStream(obj) && obj instanceof stream_1.default.Stream) {
                // Logger.log('readable stream');
                return obj.once('end', async function () {
                    if (instance.opt?.after) {
                        await instance.opt.after();
                        return resolve(this);
                    }
                    else {
                        return resolve(this);
                    }
                });
            }
            else if (obj instanceof stream_1.default.Writable) {
                logger_1.default.log('writable stream');
            }
            else if (isPromise(obj)) {
                //Logger.log('promises');
                return obj.then(async function () {
                    if (instance.opt?.after) {
                        await instance.opt.after();
                        return resolve(this);
                    }
                    else {
                        return resolve(this);
                    }
                });
            }
            else {
                if (typeof instance.callback !== 'function') {
                    logger_1.default.log(logname, 'cannot determine method instances');
                }
            }
            resolve.bind(this)(chain.bind(this));
        });
    };
    while (schedule.length > 0) {
        const instance = schedule.shift();
        if (typeof instance !== 'undefined')
            await run(instance);
    }
}
exports.chain = chain;
/**
 * check object is Promises
 * @param p
 * @returns
 */
function isPromise(p) {
    return ((p && String(Object.prototype.toString.call(p)).toLowerCase() === '[object promise]') ||
        // check ES6 Promises
        (p &&
            typeof p.constructor === 'function' &&
            Function.prototype.toString.call(p.constructor).replace(/\(.*\)/, '()') ===
                Function.prototype.toString
                    .call(/*native object*/ Function)
                    .replace('Function', 'Promise') // replacing Identifier
                    .replace(/\(.*\)/, '()')) || // removing possible FormalParameterList
        // my own experiment
        (p && String(Function.prototype.toString.call(p.constructor)).startsWith('function Promise(')));
}
/**
 * check object is readable stream
 * @param obj
 * @returns
 */
function isReadableStream(obj) {
    return obj instanceof stream_1.default.Stream && typeof (obj._read === 'function') && typeof (obj._readableState === 'object');
}
//# sourceMappingURL=chain.js.map