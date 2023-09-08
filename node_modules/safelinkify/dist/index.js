"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.safelink = exports.parseQuery = exports.resolveQueryUrl = void 0;
var parseQuery_1 = __importDefault(require("./parseQuery"));
var resolveQueryUrl_1 = __importDefault(require("./resolveQueryUrl"));
var safelink_1 = __importDefault(require("./safelink"));
var _global_safelinkify = (typeof window !== 'undefined' ? window : global);
var vars = { safelink: safelink_1.default, parseQuery: parseQuery_1.default, resolveQueryUrl: resolveQueryUrl_1.default };
exports.resolveQueryUrl = resolveQueryUrl_1.default;
exports.parseQuery = parseQuery_1.default;
exports.safelink = safelink_1.default;
exports.default = vars;
if (typeof module !== 'undefined' && module.exports) {
    module.exports = vars;
}
_global_safelinkify.safelink = safelink_1.default;
//
