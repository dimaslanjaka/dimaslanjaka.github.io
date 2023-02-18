"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitSubmodule = exports.submodule = void 0;
const bluebird_1 = __importDefault(require("bluebird"));
const debug_1 = __importDefault(require("debug"));
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const upath_1 = require("upath");
const extract_submodule_1 = __importDefault(require("./extract-submodule"));
const git_1 = __importDefault(require("./git"));
const instances_1 = require("./instances");
const spawner_1 = require("./spawner");
const _log = (0, debug_1.default)('git-command-helper');
class submodule {
    constructor(cwd) {
        this.github = {};
        this.cwd = cwd;
        this.hasConfig = (0, fs_1.existsSync)((0, path_1.join)(this.cwd, '.gitmodules'));
    }
    spawnOpt(opt = {}) {
        return Object.assign({ cwd: this.cwd, stdio: 'pipe' }, opt);
    }
    /**
     * add submodule
     */
    async add(opt) {
        if (!opt.remote)
            throw new Error('submodule remote url required');
        if (!opt.dest)
            throw new Error('submodule destination required');
        const args = ['submodule', 'add'];
        if (opt.branch)
            args.push('-b', opt.branch);
        args.push(opt.remote);
        args.push(opt.dest);
        await (0, spawner_1.spawn)('git', args, { cwd: this.cwd, stdio: 'pipe' });
    }
    /**
     * remove submodule
     * @param path path to submodule
     */
    async remove(path) {
        await (0, spawner_1.spawn)('git', ['submodule', 'deinit', '-f', (0, upath_1.toUnix)(path)], { cwd: this.cwd, stdio: 'pipe' });
        await (0, promises_1.rm)((0, path_1.join)(this.cwd, '.git/modules', (0, upath_1.toUnix)(path)), { recursive: true, force: true });
        await (0, spawner_1.spawn)('git', ['rm', '-f', (0, upath_1.toUnix)(path)], { cwd: this.cwd, stdio: 'pipe' });
    }
    /**
     * check has submodule
     * @returns
     */
    hasSubmodule() {
        return (0, fs_1.existsSync)((0, path_1.join)(this.cwd, '.gitmodules'));
    }
    /**
     * git submodule update
     * @param args custom arguments
     * @param optionSpawn
     * @returns
     */
    update(args = [], optionSpawn = { stdio: 'inherit' }) {
        const arg = ['submodule', 'update'];
        if (Array.isArray(args)) {
            args.forEach((str) => arg.push(str));
        }
        else {
            arg.push('-i', '-r');
        }
        return (0, spawner_1.spawn)('git', arg, this.spawnOpt(optionSpawn));
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
                    let { github } = info[0];
                    const { branch, root, url } = info[0];
                    //console.log("safe", info[0]);
                    if (!github) {
                        github = new git_1.default(root);
                    }
                    const doReset = () => github.reset(branch);
                    const doPull = () => github.pull(['origin', branch, '--recurse-submodule']);
                    // update from remote name origin
                    github.setremote(url, 'origin').then(() => {
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
    status(optionSpawn = { stdio: 'inherit' }) {
        return (0, spawner_1.spawn)('git', ['submodule', 'status'], this.spawnOpt(optionSpawn));
    }
    /**
     * git add all each submodule
     * @param pathOrArg ex: `-A`
     * @returns
     */
    addAll(pathOrArg) {
        return (0, spawner_1.spawn)('git', ['submodule', 'foreach', 'git', 'add', pathOrArg]);
    }
    commitAll(msg) {
        return (0, spawner_1.spawn)('git', ['submodule', 'foreach', 'git', 'commit', '-am', msg]);
    }
    /**
     * get submodule informations
     * @returns
     */
    get() {
        if (!this.hasSubmodule())
            return []; //throw new Error('This directory not have submodule installed');
        const extract = (0, extract_submodule_1.default)((0, path_1.join)(this.cwd, '.gitmodules'));
        for (let i = 0; i < extract.length; i++) {
            const item = extract[i];
            if (!(0, instances_1.hasInstance)(item.root))
                (0, instances_1.setInstance)(item.root, new git_1.default(item.root));
            const github = (0, instances_1.getInstance)(item.root);
            this.github[item.root] = github;
            extract[i] = Object.assign({ branch: 'master', github }, item);
        }
        return extract.map(function (item) {
            return Object.assign({ branch: 'master', github: null }, item);
        });
    }
}
exports.submodule = submodule;
exports.default = submodule;
exports.gitSubmodule = submodule;
//# sourceMappingURL=submodule.js.map