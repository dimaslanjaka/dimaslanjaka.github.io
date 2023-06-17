"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sbgDebug = exports.debug = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
/**
 * debug helper
 * @param name
 * @returns
 */
function debug(name) {
    return (0, debug_1.default)(name);
}
exports.debug = debug;
exports.default = debug;
/**
 * debug with default name `sbg`
 * @returns
 */
function sbgDebug() {
    return (0, debug_1.default)('sbg');
}
exports.sbgDebug = sbgDebug;
//# sourceMappingURL=debug.js.map