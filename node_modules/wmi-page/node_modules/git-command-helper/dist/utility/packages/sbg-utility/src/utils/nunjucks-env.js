"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envNunjucks = void 0;
const hexo_util_1 = require("hexo-util");
const nunjucks_1 = __importDefault(require("nunjucks"));
function envNunjucks(loader, opts) {
    const env = new nunjucks_1.default.Environment(loader, opts);
    env.addFilter('uriencode', (str) => {
        return (0, hexo_util_1.encodeURL)(str);
    });
    env.addFilter('noControlChars', (str) => {
        return str.replace(/[\x00-\x1F\x7F]/g, ''); // eslint-disable-line no-control-regex
    });
    // Extract date from datetime
    env.addFilter('formatDate', (input) => {
        return input.toISOString().substring(0, 10);
    });
    return env;
}
exports.envNunjucks = envNunjucks;
exports.default = envNunjucks;
