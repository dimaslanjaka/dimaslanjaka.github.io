"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sbgDebug = exports.debug = void 0;
const debug_1 = __importDefault(require("debug"));
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
