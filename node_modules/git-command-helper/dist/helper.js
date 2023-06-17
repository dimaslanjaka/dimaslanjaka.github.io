"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class helper {
    /**
     * Suppress Catch of async function or catch of errors
     * @param cb
     * @returns null = failed (catch caught)
     */
    static async suppress(cb) {
        try {
            //return await Bluebird.resolve(cb).then((res) => res);
            if (this.isPromise(cb)) {
                return await cb();
            }
            else {
                return cb();
            }
        }
        catch (e) {
            return e;
        }
    }
    /**
     * is variable promise function?
     * @param p
     * @returns
     */
    static isPromise(p) {
        //console.log(Object.prototype.toString.call(p));
        return p && /\[object (Promise|AsyncFunction)\]/i.test(Object.prototype.toString.call(p));
    }
}
exports.default = helper;
