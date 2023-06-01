"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCanPush = exports.dryRun = void 0;
const src_1 = require("../../cross-spawn/src");
/**
 * check if can be pushed
 * @param originName origin name
 */
async function dryRun(cwd) {
    const dry = await (0, src_1.async)('git', ['push', '--dry-run'], { stdio: 'pipe', cwd });
    return dry.output.trim() != 'Everything up-to-date';
}
exports.dryRun = dryRun;
exports.isCanPush = { dryRun };
