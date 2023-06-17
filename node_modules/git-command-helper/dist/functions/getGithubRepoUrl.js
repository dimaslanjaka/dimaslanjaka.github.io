"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGithubRepoUrl = void 0;
const sbg_utility_1 = require("sbg-utility");
const safe_url_1 = require("../utils/safe-url");
const getGithubCurrentBranch_1 = require("./getGithubCurrentBranch");
const getGithubRemote_1 = require("./getGithubRemote");
const getGithubRootDir_1 = require("./getGithubRootDir");
/**
 * Get github url for single file or folder
 * @param path path subfolder or file
 * @returns safe url
 */
async function getGithubRepoUrl(path, opt = { cwd: process.cwd() }) {
    path = (0, sbg_utility_1.trueCasePathSync)(path);
    const root = (0, sbg_utility_1.trueCasePathSync)((await (0, getGithubRootDir_1.getGithubRootDir)(opt)) || '');
    const remote = ((await (0, getGithubRemote_1.getGithubRemote)(null, opt)) || '').replace(/(.git|\/)$/i, '');
    let url = new URL(remote);
    url.pathname += '/tree/' + (await (0, getGithubCurrentBranch_1.getGithubCurrentBranch)(opt)) + path.replace(root, '');
    /**
     * url from repository url
     */
    const remoteURL = (0, safe_url_1.safeURL)(url.toString());
    url = new URL(remote);
    url.pathname += '/raw/' + (await (0, getGithubCurrentBranch_1.getGithubCurrentBranch)(opt)) + path.replace(root, '');
    /**
     * url raw file
     */
    const rawURL = (0, safe_url_1.safeURL)(url.toString());
    return {
        remoteURL,
        rawURL
    };
}
exports.getGithubRepoUrl = getGithubRepoUrl;
