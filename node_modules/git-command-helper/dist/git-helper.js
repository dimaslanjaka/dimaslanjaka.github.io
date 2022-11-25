"use strict";
/* eslint-disable no-control-regex */
/**
 * NodeJS GitHub Helper
 * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.git = void 0;
const fs_1 = require("fs");
const hexo_util_1 = require("hexo-util");
const shell_1 = require("./shell");
const submodule_1 = __importDefault(require("./submodule"));
/**
 * GitHub Command Helper For NodeJS
 */
class git {
    constructor(dir) {
        this.cwd = dir;
        this.submodule = new submodule_1.default(dir);
        this.isExist();
    }
    fetch(arg, optionSpawn = { stdio: 'inherit' }) {
        let args = [];
        if (Array.isArray(arg))
            args = args.concat(arg);
        return (0, hexo_util_1.spawn)('git', ['fetch'].concat(args), this.spawnOpt(optionSpawn));
    }
    pull(arg, optionSpawn = { stdio: 'inherit' }) {
        let args = [];
        if (Array.isArray(arg))
            args = args.concat(arg);
        return (0, hexo_util_1.spawn)('git', ['pull'].concat(args), this.spawnOpt(optionSpawn));
    }
    /**
     * git commit
     * @param msg commit messages
     * @param optionSpawn
     * @returns
     */
    commit(msg, optionSpawn = { stdio: 'inherit' }) {
        return (0, hexo_util_1.spawn)('git', ['commit', '-m', msg], this.spawnOpt(optionSpawn));
    }
    push(force = false, optionSpawn = { stdio: 'inherit' }) {
        let args = ['push'];
        if (force)
            args = args.concat('-f');
        return (0, hexo_util_1.spawn)('git', args, this.spawnOpt(optionSpawn));
    }
    spawnOpt(opt = {}) {
        return Object.assign({ cwd: this.cwd }, opt);
    }
    /**
     * git add
     * @param path specific path or argument -A
     * @param optionSpawn
     * @returns
     */
    add(path, optionSpawn = { stdio: 'inherit' }) {
        return (0, hexo_util_1.spawn)('git', ['add', path], this.spawnOpt(optionSpawn));
    }
    isExist() {
        this.exist = (0, fs_1.existsSync)(this.cwd);
        return this.exist;
    }
    setcwd(v) {
        this.cwd = v;
    }
    setemail(v) {
        this.email = v;
        (0, shell_1.shell)('git', ['config', 'user.email', this.email], this.spawnOpt());
    }
    setuser(v) {
        this.user = v;
        (0, shell_1.shell)('git', ['config', 'user.name', this.user], this.spawnOpt());
    }
    setremote(v) {
        this.remote = v instanceof URL ? v.toString() : v;
    }
    setbranch(v) {
        this.branch = v;
    }
    /**
     * Reset to latest commit of remote branch
     * @param branch
     */
    reset(branch = this.branch) {
        (0, shell_1.shell)('git', ['reset', '--hard', 'origin/' + branch || this.branch], {
            stdio: 'inherit',
            cwd: this.cwd
        });
    }
}
exports.git = git;
exports.default = git;
