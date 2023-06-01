"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitSubmodule = exports.submodule = void 0;
const bluebird_1 = __importDefault(require("bluebird"));
const fs_extra_1 = require("fs-extra");
const promises_1 = require("fs/promises");
const upath_1 = require("upath");
const spawner_1 = require("./spawner");
const extract_submodule_1 = __importDefault(require("./utils/extract-submodule"));
class submodule {
    constructor(cwd) {
        /** git-command-helper class */
        this.github = {};
        this.cwd = cwd;
        this.hasConfig = (0, fs_extra_1.existsSync)((0, upath_1.join)(this.cwd, '.gitmodules'));
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
        await (0, promises_1.rm)((0, upath_1.join)(this.cwd, '.git/modules', (0, upath_1.toUnix)(path)), { recursive: true, force: true });
        await (0, spawner_1.spawn)('git', ['rm', '-f', (0, upath_1.toUnix)(path)], { cwd: this.cwd, stdio: 'pipe' });
    }
    /**
     * check has submodule
     * @returns
     */
    hasSubmodule() {
        const gitmodules = (0, upath_1.join)(this.cwd, '.gitmodules');
        const exist = (0, fs_extra_1.existsSync)(gitmodules);
        // check empty .gitmodules
        if (exist) {
            const size = (0, fs_extra_1.statSync)(gitmodules).size;
            return size > 0;
        }
        return exist;
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
            const infos = this.get();
            const doUp = () => {
                return new bluebird_1.default((resolveDoUp) => {
                    if (!infos[0])
                        return;
                    const github = infos[0];
                    const { branch, remote } = infos[0].github;
                    const doReset = () => github.reset(branch);
                    const doPull = () => github.pull(['origin', branch, '--recurse-submodule']);
                    // update from remote name origin
                    if (typeof remote === 'string') {
                        github.setremote(remote, 'origin').then(() => {
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
                    }
                });
            };
            const iterate = () => {
                return new bluebird_1.default((resolveIt) => {
                    doUp()
                        .then(() => {
                        infos.shift();
                    })
                        .then(() => {
                        if (infos.length > 0) {
                            return iterate().then(resolveIt);
                        }
                        else {
                            resolveIt();
                        }
                    });
                });
            };
            if (infos.length > 0) {
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
        const extract = (0, extract_submodule_1.default)((0, upath_1.join)(this.cwd, '.gitmodules'));
        for (let i = 0; i < extract.length; i++) {
            const item = extract[i];
            if (!item)
                continue;
            this.github[item.cwd] = item.github;
        }
        return extract;
    }
}
exports.submodule = submodule;
exports.default = submodule;
exports.gitSubmodule = submodule;
