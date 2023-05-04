"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCanPush = exports.dryRun = void 0;
const spawn_async_1 = __importDefault(require("@expo/spawn-async"));
const os_1 = require("os");
/**
 * check if can be pushed
 * @param originName origin name
 */
async function dryRun(cwd) {
    const dry = await (0, spawn_async_1.default)('git', ['push', '--dry-run'], { stdio: 'pipe', cwd });
    return dry.output.join(os_1.EOL).trim() != 'Everything up-to-date';
}
exports.dryRun = dryRun;
exports.isCanPush = { dryRun };
