"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.latestCommit = void 0;
const deepmerge_ts_1 = require("deepmerge-ts");
const spawner_1 = __importDefault(require("./spawner"));
/**
 * get latest commit hash (support get last commit hash from file)
 * * git log --pretty=tformat:%H -n 1 path
 * * git log --pretty=tformat:%h -n 1 path
 * * git rev-parse HEAD
 * * git rev-parse --short HEAD
 * @param path get latest commit of specific folder, retain null for process.cwd()
 * @param options spawn options
 * @returns
 * @example
 * // get last commit of this dir
 * latestCommit(null, { cwd: __dirname }).then(console.log);
 * // get last commit of single file
 * latestCommit(path.join(__dirname, 'path/to/folder/file')).then(console.log);
 */
const latestCommit = async (path, options = {}) => {
    const default_options = {
        cwd: process.cwd()
    };
    options = (0, deepmerge_ts_1.deepmerge)(default_options, options);
    const short = options.short || true;
    const args = [];
    if (!path) {
        // get last commit hash of cwd
        args.push('rev-parse');
        if (short)
            args.push('--short');
        args.push('HEAD');
    }
    else {
        // get last commit hash of specific path
        args.push('log');
        if (!short) {
            args.push('--pretty=tformat:%H');
        }
        else {
            args.push('--pretty=tformat:%h');
        }
        args.push('-n');
        args.push('1');
        args.push(path);
    }
    const res = await spawner_1.default.promise(options, 'git', ...args);
    return res.stdout[0];
};
exports.latestCommit = latestCommit;
