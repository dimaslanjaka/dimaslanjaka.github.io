"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixCaseSensitive = void 0;
const gitConfig_1 = require("./gitConfig");
/**
 * fix case-sensitive conflict
 * @see {@link https://stackoverflow.com/a/55541435/6404439}
 * @param cwd
 * @param messageCommit
 */
async function fixCaseSensitive(cwd, messageCommit) {
    const config = new gitConfig_1.gitConfig({ cwd });
    await config.ignoreCase(false);
    await config.git.spawn('git', ['rm', '-r', '--cached', '.']);
    await config.git.spawn('git', ['commit', '-a', '-m', messageCommit ? messageCommit : 'fix: file name casing']);
}
exports.fixCaseSensitive = fixCaseSensitive;
