"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGithubRootDir = void 0;
const sbg_utility_1 = require("sbg-utility");
const upath_1 = __importDefault(require("upath"));
const spawn_1 = require("../spawn");
/**
 * get root directory of local repository
 * * see {@link https://stackoverflow.com/a/957978}
 * @returns
 */
async function getGithubRootDir(opt = {}) {
    if (!opt.cwd)
        opt.cwd = process.cwd();
    try {
        const result = await (0, spawn_1.spawnAsync)('git', ['rev-parse', '--show-toplevel'], opt);
        return upath_1.default.toUnix((0, sbg_utility_1.trueCasePathSync)(result.stdout.trim()));
    }
    catch (err) {
        if (opt.throwable)
            throw err;
    }
}
exports.getGithubRootDir = getGithubRootDir;
