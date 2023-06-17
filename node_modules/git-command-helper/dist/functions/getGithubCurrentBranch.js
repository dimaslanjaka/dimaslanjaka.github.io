"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGithubCurrentBranch = void 0;
const lodash_1 = __importDefault(require("lodash"));
const spawn_1 = require("../spawn");
/**
 * get current branch
 * @returns
 */
async function getGithubCurrentBranch(opt = {}) {
    try {
        const result = await (0, spawn_1.spawnAsync)('git', ['branch', '--show-current'], opt);
        return result.stdout.trim();
    }
    catch (err) {
        return lodash_1.default.noop(err);
    }
}
exports.getGithubCurrentBranch = getGithubCurrentBranch;
