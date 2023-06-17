"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGithubBranches = void 0;
const lodash_1 = __importDefault(require("lodash"));
const spawn_1 = require("../spawn");
/**
 * get current branch informations
 * @returns
 */
async function getGithubBranches(opt = {}) {
    try {
        const result = await (0, spawn_1.spawnAsync)('git', ['branch'], opt);
        return result.stdout
            .trim()
            .split(/\n/)
            .map((str) => str.split(/\s/).map((str_1) => str_1.trim()))
            .filter((str_2) => str_2.length > 0)
            .map((item) => {
            return {
                active: item.length > 1,
                branch: item[1]
            };
        })
            .filter((item_1) => typeof item_1.branch === 'string');
    }
    catch (err) {
        return lodash_1.default.noop(err);
    }
}
exports.getGithubBranches = getGithubBranches;
