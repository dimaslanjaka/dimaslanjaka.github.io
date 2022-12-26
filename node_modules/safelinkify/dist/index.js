"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var parseQuery_1 = __importDefault(require("./parseQuery"));
var resolveQueryUrl_1 = __importDefault(require("./resolveQueryUrl"));
var safelink_1 = __importDefault(require("./safelink"));
var _global_safelinkify = (typeof window !== 'undefined' ? window : global);
var safelinkify;
(function (safelinkify) {
    safelinkify.resolveQueryUrl = resolveQueryUrl_1.default;
    safelinkify.parseQuery = parseQuery_1.default;
    safelinkify.safelink = safelink_1.default;
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = safelinkify;
    }
    _global_safelinkify.safelinkify = safelinkify;
    _global_safelinkify.safelink = safelinkify.safelink;
})(safelinkify || (safelinkify = {}));
_global_safelinkify.safelinkify = safelinkify;
_global_safelinkify.safelink = safelink_1.default;
exports.default = safelinkify;
