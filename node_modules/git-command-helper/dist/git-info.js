"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGithubCurrentBranch = exports.getGithubBranches = exports.getGithubRepoUrl = exports.getGithubRemote = exports.getGithubRootDir = void 0;
const true_case_path_1 = require("true-case-path");
const noop_1 = __importDefault(require("./noop"));
const spawn_1 = require("./spawn");
/**
 * get root directory of local repository
 * * see {@link https://stackoverflow.com/a/957978}
 * @returns
 */
async function getGithubRootDir(opt = {}) {
    try {
        const result = await (0, spawn_1.spawnAsync)('git', 'rev-parse --show-toplevel'.split(' '), opt);
        return result.stdout.trim();
    }
    catch (err) {
        return (0, noop_1.default)(err);
    }
}
exports.getGithubRootDir = getGithubRootDir;
/**
 * get origin url
 * * see {@link https://stackoverflow.com/a/4090938}
 * @param name remote name in config, default `origin`
 * @returns
 */
async function getGithubRemote(name = 'origin', opt = {}) {
    try {
        if (!name)
            name = 'origin';
        const result = await (0, spawn_1.spawnAsync)('git', `config --get remote.${name}.url`.split(' '), opt);
        return result.stdout.trim();
    }
    catch (err) {
        return (0, noop_1.default)(err);
    }
}
exports.getGithubRemote = getGithubRemote;
/**
 * Get github url for single file or folder
 * @param path path subfolder or file
 */
async function getGithubRepoUrl(path, opt = {}) {
    path = (0, true_case_path_1.trueCasePathSync)(path);
    const root = (0, true_case_path_1.trueCasePathSync)((await getGithubRootDir(opt)) || '');
    const remote = ((await getGithubRemote(null, opt)) || '').replace(/(.git|\/)$/i, '');
    let url = new URL(remote);
    url.pathname += '/tree/' + (await getGithubCurrentBranch(opt)) + path.replace(root, '');
    const remoteURL = url.toString();
    url = new URL(remote);
    url.pathname += '/raw/' + (await getGithubCurrentBranch(opt)) + path.replace(root, '');
    const rawURL = url.toString();
    return {
        remoteURL,
        rawURL
    };
}
exports.getGithubRepoUrl = getGithubRepoUrl;
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
        return (0, noop_1.default)(err);
    }
}
exports.getGithubBranches = getGithubBranches;
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
        return (0, noop_1.default)(err);
    }
}
exports.getGithubCurrentBranch = getGithubCurrentBranch;
const GithubInfo = {
    getGithubCurrentBranch,
    getGithubRemote,
    getGithubRepoUrl,
    getGithubRootDir,
    getGithubBranches
};
exports.default = GithubInfo;
