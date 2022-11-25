"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripAnsi = void 0;
const ansi_regex_1 = require("./ansi-regex");
function stripAnsi(str) {
    return str.replace((0, ansi_regex_1.ansiRegex)(), '');
}
exports.stripAnsi = stripAnsi;
