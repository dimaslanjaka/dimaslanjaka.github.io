"use strict";
/* eslint-disable no-control-regex */
/**
 * NodeJS GitHub Helper
 * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitCommandHelper = exports.gitHelper = exports.git = exports.setupGit = void 0;
const bluebird_1 = __importDefault(require("bluebird"));
const fs_1 = require("fs");
const os_1 = require("os");
const path_1 = require("path");
const git_info_1 = __importDefault(require("./git-info"));
const helper_1 = __importDefault(require("./helper"));
const extension = __importStar(require("./index-exports"));
const instances_1 = require("./instances");
const latestCommit_1 = require("./latestCommit");
const noop_1 = __importDefault(require("./noop"));
const shell_1 = require("./shell");
const spawn_1 = require("./spawn");
const submodule_1 = __importDefault(require("./submodule"));
/**
 * Setup git with branch and remote url resolved automatically
 * @param param0
 * @returns
 */
async function setupGit({ branch, url, baseDir, email = null, user = null }) {
    const github = new exports.gitHelper(baseDir);
    github.remote = url;
    try {
        if (!(await github.isExist())) {
            await github.init();
        }
        await github.setremote(url);
        await github.setbranch(branch);
        if (email)
            await github.setemail(email);
        if (user)
            await github.setuser(user);
    }
    catch (e) {
        console.trace(e);
    }
    return github;
}
exports.setupGit = setupGit;
/**
 * GitHub Command Helper For NodeJS
 */
class git {
    /**
     *
     * @param gitdir
     * @param branch
     */
    constructor(gitdir, branch = 'master') {
        this.shell = shell_1.shell;
        this.helper = helper_1.default;
        this.noop = noop_1.default;
        this.ext = extension;
        // exports infos
        this.infos = git_info_1.default;
        this.getGithubBranches = git_info_1.default.getGithubBranches;
        this.getGithubCurrentBranch = git_info_1.default.getGithubCurrentBranch;
        this.getGithubRemote = git_info_1.default.getGithubRemote;
        this.getGithubRootDir = git_info_1.default.getGithubRootDir;
        this.getGithubRepoUrl = git_info_1.default.getGithubRepoUrl;
        this.cwd = gitdir;
        if (typeof this.branch === 'string')
            this.branch = branch;
        if (!(0, fs_1.existsSync)(this.cwd)) {
            throw new Error((gitdir || 'git directory') + ' not found');
        }
        this.submodule = new submodule_1.default(gitdir);
        if (!(0, instances_1.hasInstance)(gitdir))
            (0, instances_1.setInstance)(gitdir, this);
    }
    /**
     * get latest commit hash
     * @param customPath
     * @param options
     * @returns
     */
    latestCommit(customPath, options) {
        return (0, latestCommit_1.latestCommit)(customPath, this.spawnOpt(options));
    }
    async info() {
        const opt = this.spawnOpt({ stdio: 'pipe' });
        return {
            root: await this.getGithubRootDir(opt),
            remote: await this.getremote(['-v']),
            branch: await this.getbranch(),
            status: await this.status()
        };
    }
    /**
     * git config --global --add safe.directory PATH_FOLDER
     */
    addSafe() {
        return (0, spawn_1.spawnSilent)('git', 'config --global --add safe.directory'.split(' ').concat([this.cwd]), this.spawnOpt({ stdio: 'inherit' }))
            .catch(git.noop)
            .finally(() => console.log(this.cwd, 'added to safe directory'));
    }
    /**
     * call spawn async
     * @param cmd
     * @param args
     * @param spawnOpt
     * @returns
     */
    spawn(cmd, args, spawnOpt) {
        return (0, spawn_1.spawn)(cmd, args, this.spawnOpt(spawnOpt || { stdio: 'pipe' }));
    }
    /**
     * setup merge on pull strategy
     * @returns
     */
    setAutoRebase() {
        return (0, spawn_1.spawn)('git', ['config', 'pull.rebase', 'false']);
    }
    /**
     * setup end of line LF
     * @link https://stackoverflow.com/a/13154031
     * @returns
     */
    setForceLF() {
        return (0, spawn_1.spawn)('git', ['config', 'core.autocrlf', 'false']);
    }
    /**
     * git fetch
     * @param arg argument git-fetch, ex ['--all']
     * @param optionSpawn
     * @returns
     */
    fetch(arg, optionSpawn = { stdio: 'inherit' }) {
        let args = [];
        if (Array.isArray(arg))
            args = args.concat(arg);
        if (args.length === 0) {
            args.push('origin', this.branch);
        }
        // return default git fetch when branch not set
        if (!this.branch)
            return (0, spawn_1.spawn)('git', ['fetch'], this.spawnOpt(optionSpawn));
        // remove non-string paramters
        args = ['fetch'].concat(args).filter((str) => typeof str === 'string' && str.length > 0);
        return (0, spawn_1.spawn)('git', args, this.spawnOpt(optionSpawn));
    }
    /**
     * git pull
     * @param arg example: `['--recurse-submodule']`
     * @param optionSpawn
     * @returns
     */
    async pull(arg, optionSpawn = { stdio: 'inherit' }) {
        let args = [];
        if (Array.isArray(arg))
            args = args.concat(arg);
        if (args.length === 0) {
            args.push('origin', this.branch);
        }
        const opt = this.spawnOpt(optionSpawn || { stdio: 'inherit' });
        try {
            return await (0, spawn_1.spawn)('git', ['pull'].concat(args), opt);
        }
        catch (e) {
            if (e instanceof Error) {
                if (opt.stdio === 'inherit')
                    console.log(e.message);
                return e.message;
            }
        }
    }
    /**
     * git pull accept merge from remote (accept all incoming changes)
     * @see https://stackoverflow.com/a/21777677
     * @see https://www.folkstalk.com/tech/git-accept-incoming-changes-for-all-with-code-examples/
     */
    async pullAcceptTheirs(optionSpawn = { stdio: 'inherit' }) {
        await this.pull(['-X', 'theirs'], optionSpawn);
        await this.spawn('git', ['checkout', '--theirs', '.'], optionSpawn);
    }
    /**
     * git commit
     * @param mode -am, -m, etc
     * @param msg commit messages
     * @param optionSpawn
     * @returns
     */
    commit(msg, mode = 'm', optionSpawn = { stdio: 'inherit' }) {
        if (!mode.startsWith('-'))
            mode = '-' + mode;
        return new bluebird_1.default((resolve, reject) => {
            const opt = this.spawnOpt(optionSpawn);
            const child = (0, spawn_1.spawn)('git', ['commit', mode, msg], opt);
            if (opt.stdio !== 'inherit') {
                child.then((str) => {
                    resolve(str);
                });
            }
            else {
                resolve();
            }
            child.catch(reject);
        });
    }
    /**
     * add and commit file
     * @param path
     * @param msg
     * @param mode am/m
     * @returns
     */
    addAndCommit(path, msg, mode = 'm') {
        return new bluebird_1.default((resolve, reject) => {
            this.add(path, { stdio: 'pipe' }).then((_) => this.commit(msg, mode, { stdio: 'pipe' }).then(resolve).catch(reject));
        });
    }
    /**
     * bulk add and commit
     * @param options array of `path` and `msg` commit message
     * @returns
     */
    commits(options) {
        const self = this;
        const errors = [];
        async function run() {
            if (options.length > 0) {
                try {
                    try {
                        await self.addAndCommit(options[0].path, options[0].msg || 'update ' + options[0].path + ' ' + new Date());
                    }
                    catch (e) {
                        errors.push(e);
                    }
                }
                finally {
                    options.shift();
                    await run();
                }
            }
        }
        return new bluebird_1.default((resolve) => {
            run().then(() => resolve(errors));
        });
    }
    /**
     * git push
     * @param force
     * @param optionSpawn
     * @returns
     */
    async push(force = false, optionSpawn = { stdio: 'inherit' }) {
        let args = ['push'];
        if (force)
            args = args.concat('-f');
        const opt = this.spawnOpt(optionSpawn);
        try {
            return await (0, spawn_1.spawn)('git', args, opt);
        }
        catch (e) {
            if (e instanceof Error) {
                if (opt.stdio === 'inherit') {
                    console.log(e.message);
                }
                //console.log(e.message);
                if (/^error: failed to push some refs to/gim.test(e.message)) {
                    if (/the tip of your current branch is behind/gim.test(e.message)) {
                        return await this.push(true, opt);
                    }
                }
            }
        }
    }
    /**
     * check if can be pushed
     * @param originName origin name
     */
    async canPush(originName = 'origin', branchName = this.branch) {
        // git push --dry-run
        if (branchName) {
            await (0, spawn_1.spawn)('git', ['push', '-u', originName || 'origin', branchName || this.branch, '--dry-run'], this.spawnOpt({ stdio: 'pipe' }));
        }
        // repository is not up to date
        const changed = !(await this.isUpToDate());
        // repostory file changes status
        const staged = await this.status();
        // test git push --dry-run
        const dry = await (0, spawn_1.spawnAsync)('git', ['push', '--dry-run'], this.spawnOpt({ stdio: 'pipe' }));
        // console.log({ staged, changed, dry: dry.output.join(EOL).trim() != 'Everything up-to-date' });
        // return repository is not up to date
        return changed && staged.length === 0 && dry.output.join(os_1.EOL).trim() != 'Everything up-to-date';
    }
    /**
     * Spawn option default stdio pipe
     * @param opt
     * @returns
     */
    spawnOpt(opt = {}) {
        return Object.assign({ cwd: this.cwd, stdio: 'pipe' }, opt);
    }
    /**
     * check has any file changed
     */
    async hasChanged() {
        const status = await this.status();
        return status.length > 0;
    }
    /**
     * git add
     * @param path specific path or argument -A
     * @param optionSpawn
     * @returns
     */
    add(path, optionSpawn = { stdio: 'inherit' }) {
        return (0, spawn_1.spawn)('git', ['add', path], this.spawnOpt(optionSpawn));
    }
    /**
     * git checkout
     * @param branchName
     * @param optionSpawn
     * @returns
     */
    async checkout(branchName, optionSpawn = { stdio: 'inherit' }) {
        return await (0, spawn_1.spawn)('git', ['checkout', branchName], this.spawnOpt(optionSpawn || {}));
    }
    /**
     * get current branch informations
     * @returns
     */
    async getbranch() {
        return await (0, spawn_1.spawn)('git', ['branch'], this.spawnOpt({ stdio: 'pipe' })).then((str) => str
            .split(/\n/)
            .map((str) => str.split(/\s/).map((str) => str.trim()))
            .filter((str) => str.length > 0)
            .map((item) => {
            return {
                active: item.length > 1,
                branch: item[1]
            };
        })
            .filter((item) => typeof item.branch === 'string' && item.branch.trim().length > 0));
    }
    /**
     * Check if current repository is up to date with origin/remote
     * @returns
     */
    isUpToDate() {
        const rgUpToDate = /^your branch is up to date with/gim;
        return new bluebird_1.default((resolve) => {
            (0, spawn_1.spawn)('git', ['status'], this.spawnOpt({ stdio: 'pipe' })).then((stdout) => {
                resolve(rgUpToDate.test(stdout));
            });
        });
    }
    /**
     * git status
     * @returns
     */
    status() {
        const rgMod = /^\s*(modified|added|deleted):/gim;
        const rgChanged = /^\s*(changes not staged for commit|changes to be committed):/gim;
        const rgUntracked = /^untracked files:([\s\S]*?)\n\n/gim;
        return new bluebird_1.default((resolve, reject) => {
            (0, spawn_1.spawn)('git', ['status'], this.spawnOpt({ stdio: 'pipe' }))
                .then((response) => {
                // check changed
                if (rgChanged.test(response)) {
                    // modded, added, deleted
                    const result = response
                        .split('\n')
                        .map((str) => str.trim())
                        .filter((str) => rgMod.test(str))
                        .map((str) => {
                        const split = str.split(/:\s+/);
                        return {
                            changes: split[0],
                            path: (split[1] || '').replace(/\(.*\)$/, '').trim()
                        };
                    });
                    resolve(result);
                }
                // untracked
                const result = (Array.from(response.match(rgUntracked) || [])[0] || '')
                    .split(/\n/)
                    .map((str) => str.trim())
                    .filter((str) => {
                    return !/^\(use/gim.test(str) && str.length > 0;
                })
                    .map((str) => {
                    if (!str.includes(':'))
                        return {
                            changes: 'untracked',
                            path: str
                        };
                })
                    .filter((str) => typeof str === 'object');
                resolve(result);
            })
                .catch(reject);
        });
    }
    /**
     * git init
     * @returns
     */
    async init(spawnOpt = { stdio: 'inherit' }) {
        if (!(0, fs_1.existsSync)((0, path_1.join)(this.cwd, '.git')))
            (0, fs_1.mkdirSync)((0, path_1.join)(this.cwd, '.git'), { recursive: true });
        return (0, spawn_1.spawnSilent)('git', ['init'], this.spawnOpt(spawnOpt)).catch(noop_1.default);
    }
    /**
     * Check if git folder exists
     * @returns
     */
    isExist() {
        return new bluebird_1.default((resolve, reject) => {
            const folderExist = (0, fs_1.existsSync)((0, path_1.join)(this.cwd, '.git'));
            (0, spawn_1.spawn)('git', ['status'], this.spawnOpt({ stdio: 'pipe' }))
                .then((result) => {
                const match1 = /changes not staged for commit/gim.test(result);
                this.exist = match1 && folderExist;
                resolve(this.exist);
            })
                .catch(reject);
        });
    }
    setcwd(v) {
        this.cwd = v;
    }
    setemail(v) {
        this.email = v;
        return (0, spawn_1.spawn)('git', ['config', 'user.email', this.email], this.spawnOpt());
    }
    setuser(v) {
        this.user = v;
        return (0, spawn_1.spawn)('git', ['config', 'user.name', this.user], this.spawnOpt());
    }
    /**
     * set remote url
     * @param v
     * @param name custom object name
     * @returns
     * @example
     * // default
     * git add remote origin https://
     * // custom name
     * git add remote customName https://
     */
    async setremote(v, name, spawnOpt = {}) {
        this.remote = v instanceof URL ? v.toString() : v;
        const opt = this.spawnOpt(Object.assign({ stdio: 'pipe' }, spawnOpt || {}));
        try {
            return await (0, spawn_1.spawn)('git', ['remote', 'add', name || 'origin', this.remote], opt);
        }
        catch (_a) {
            return await helper_1.default.suppress(() => (0, spawn_1.spawn)('git', ['remote', 'set-url', name || 'origin', this.remote], opt));
        }
    }
    /**
     * get remote information
     * @param args
     * @returns
     */
    async getremote(args) {
        try {
            const res = await (0, spawn_1.spawn)('git', ['remote'].concat(args || ['-v']), this.spawnOpt({ stdio: 'pipe' }));
            const result = {
                fetch: {
                    origin: '',
                    url: ''
                },
                push: {
                    origin: '',
                    url: ''
                }
            };
            res
                .split(/\n/gm)
                .filter((split) => split.length > 0)
                .map((splitted) => {
                let key = null;
                const nameUrl = splitted.split(/\t/).map((str) => {
                    const rg = /\((.*)\)/gm;
                    if (rg.test(str))
                        return str
                            .replace(rg, (_whole, v1) => {
                            key = v1;
                            return '';
                        })
                            .trim();
                    return str.trim();
                });
                if (key !== null) {
                    result[key] = {
                        origin: nameUrl[0],
                        url: nameUrl[1]
                    };
                }
                else {
                    throw new Error('key never assigned');
                }
            });
            return result;
        }
        catch (_a) {
            //
        }
    }
    checkLock() {
        return (0, fs_1.existsSync)((0, path_1.join)(this.cwd, '.git/index.lock'));
    }
    /**
     * set branch (git checkout branchName)
     * @param branchName
     * @returns
     */
    async setbranch(branchName, force = false, spawnOpt) {
        this.branch = branchName;
        const args = ['checkout'];
        if (force)
            args.push('-f');
        args.push(this.branch);
        const _checkout = await (0, spawn_1.spawn)('git', args, this.spawnOpt(spawnOpt || { stdio: 'pipe' })).catch((e) => console.log('cannot checkout', this.branch, e.message));
        // git branch --set-upstream-to=origin/<branch> gh-pages
        const _setUpstream = await (0, spawn_1.spawn)('git', ['branch', '--set-upstream-to=origin/' + this.branch, this.branch], this.spawnOpt(spawnOpt || { stdio: 'pipe' })).catch((e) => console.log('cannot set upstream', this.branch, e.message));
        //
        return _checkout;
    }
    /**
     * Reset to latest commit of remote branch
     * @param branch
     */
    reset(branch = this.branch) {
        return (0, spawn_1.spawn)('git', ['reset', '--hard', 'origin/' + branch || this.branch], {
            stdio: 'inherit',
            cwd: this.cwd
        });
    }
}
git.shell = shell_1.shell;
git.helper = helper_1.default;
git.noop = noop_1.default;
git.ext = extension;
exports.git = git;
exports.default = git;
exports.gitHelper = git;
exports.gitCommandHelper = git;
