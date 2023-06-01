"use strict";
/** git config */
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitConfig = void 0;
const __1 = require("..");
class gitConfig {
    constructor(opt) {
        this.cwd = opt.cwd;
        this.git = opt instanceof __1.git ? opt : new __1.git(opt.cwd);
    }
    /**
     * custom spawn
     * @param args cli argument without `git config`
     */
    custom(...args) {
        return this.git.spawn('git', [...args]);
    }
    ignoreCase(toBe) {
        return this.custom('core.ignorecase', String(toBe));
    }
    /**
     * set end of line all files
     * @param type
     * @returns
     */
    eol(type) {
        return this.custom('core.eol', type);
    }
    /**
     * The `git config core.autocrlf` command is used to change how Git handles line endings. It takes a single argument.
     * @param toBe true - Configure Git to ensure line endings in files you checkout are correct for Windows.
     * @returns
     */
    autocrlf(toBe) {
        return this.custom('core.autocrlf', String(toBe));
    }
}
exports.gitConfig = gitConfig;
