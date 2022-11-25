"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitSubmodule = exports.submodule = void 0;
const bluebird_1 = __importDefault(require("bluebird"));
const debug_1 = __importDefault(require("debug"));
const fs_1 = require("fs");
const path_1 = require("path");
const extract_submodule_1 = __importDefault(require("./extract-submodule"));
const git_1 = __importDefault(require("./git"));
const spawner_1 = require("./spawner");
const _log = (0, debug_1.default)("git-command-helper");
class submodule {
    constructor(cwd) {
        this.github = [];
        this.cwd = cwd;
        this.hasConfig = (0, fs_1.existsSync)((0, path_1.join)(this.cwd, ".gitmodules"));
    }
    spawnOpt(opt = {}) {
        return Object.assign({ cwd: this.cwd, stdio: "pipe" }, opt);
    }
    hasSubmodule() {
        return (0, fs_1.existsSync)((0, path_1.join)(this.cwd, ".gitmodules"));
    }
    /**
     * git submodule update
     * @param args custom arguments
     * @param optionSpawn
     * @returns
     */
    update(args = [], optionSpawn = { stdio: "inherit" }) {
        const arg = ["submodule", "update"];
        if (Array.isArray(args)) {
            args.forEach((str) => arg.push(str));
        }
        else {
            arg.push("-i", "-r");
        }
        return (0, spawner_1.spawn)("git", arg, this.spawnOpt(optionSpawn));
    }
    /**
     * Update all submodule with cd method
     * @param reset do git reset --hard origin/branch ?
     */
    safeUpdate(reset = false) {
        return new bluebird_1.default((resolve) => {
            const info = this.get();
            const doUp = () => {
                return new bluebird_1.default((resolveDoUp) => {
                    let { branch, github, root, url } = info[0];
                    //console.log("safe", info[0]);
                    if (!github) {
                        github = new git_1.default(root);
                    }
                    const doReset = () => github.reset(branch);
                    const doPull = () => github.pull(["origin", branch, "--recurse-submodule"]);
                    // update from remote name origin
                    github.setremote(url, "origin").then(() => {
                        // force checkout branch instead commit hash
                        github.setbranch(branch, true).then(() => {
                            if (reset) {
                                // reset then pull
                                doReset().then(doPull).then(resolveDoUp);
                            }
                            else {
                                // pull
                                doPull().then(resolveDoUp);
                            }
                        });
                    });
                });
            };
            const iterate = () => {
                return new bluebird_1.default((resolveIt) => {
                    doUp()
                        .then(() => {
                        info.shift();
                    })
                        .then(() => {
                        if (info.length > 0) {
                            return iterate().then(resolveIt);
                        }
                        else {
                            resolveIt();
                        }
                    });
                });
            };
            if (info.length > 0) {
                resolve(iterate());
            }
        });
    }
    /**
     * git submodule status
     * @param optionSpawn
     * @returns
     */
    status(optionSpawn = { stdio: "inherit" }) {
        return (0, spawner_1.spawn)("git", ["submodule", "status"], this.spawnOpt(optionSpawn));
    }
    /**
     * git add all each submodule
     * @param pathOrArg ex: `-A`
     * @returns
     */
    addAll(pathOrArg) {
        return (0, spawner_1.spawn)("git", ["submodule", "foreach", "git", "add", pathOrArg]);
    }
    commitAll(msg) {
        return (0, spawner_1.spawn)("git", ["submodule", "foreach", "git", "commit", "-am", msg]);
    }
    /**
     * get submodule informations
     * @returns
     */
    get() {
        if (!this.hasSubmodule())
            throw new Error("This directory not have submodule installed");
        const extract = (0, extract_submodule_1.default)((0, path_1.join)(this.cwd, ".gitmodules"));
        return extract.map((item) => {
            return Object.assign({ branch: "master", github: null }, item);
        });
        /*
        return Bluebird.all(extract).map((info) => {
            return new Bluebird((resolve: (result: Submodule) => any) => {
                const { url, root, branch } = info;
                const currentBranch = branch || "master"; // default master branch
                setupGit({
                    url,
                    branch: currentBranch,
                    baseDir: root,
                }).then((github) => {
                    resolve(Object.assign(info, { github }));
                });
            });
        });
        */
    }
}
exports.submodule = submodule;
exports.default = submodule;
exports.gitSubmodule = submodule;
