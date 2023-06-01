"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forceEolLF = void 0;
const gitConfig_1 = require("./gitConfig");
/**
 * force end of line LF
 * @param cwd
 */
async function forceEolLF(cwd) {
    const config = new gitConfig_1.gitConfig({ cwd });
    // set the EOL
    await config.eol('lf');
    // compatibility for windows
    await config.autocrlf(true);
    // update index
    await config.git.spawn('git', ['checkout-index', '-r', '--all']);
}
exports.forceEolLF = forceEolLF;
