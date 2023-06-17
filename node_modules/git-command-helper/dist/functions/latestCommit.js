"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.latestCommit = void 0;
const spawner_1 = __importDefault(require("../spawner"));
/**
 * get latest commit hash (support get last commit hash from file)
 * * git log --pretty=tformat:%H -n 1 path
 * * git log --pretty=tformat:%h -n 1 path
 * * git rev-parse HEAD
 * * git rev-parse --short HEAD
 * @param filePath get latest commit of specific folder, retain null for process.cwd()
 * @param options spawn options
 * @returns
 * @example
 * // get last commit of this dir
 * latestCommit(null, { cwd: __dirname }).then(console.log);
 * // get last commit of single file
 * latestCommit(path.join(__dirname, 'path/to/folder/file')).then(console.log);
 */
const latestCommit = async (filePath, options = {}) => {
    const default_options = {
        cwd: process.cwd()
    };
    options = Object.assign(default_options, options);
    const shortHashFormat = typeof options.short === 'undefined' || options.short === null ? true : options.short;
    const args = [];
    if (!filePath) {
        // get last commit hash of cwd
        args.push('rev-parse');
        if (shortHashFormat)
            args.push('--short');
        args.push('HEAD');
    }
    else {
        // get last commit hash of specific path
        args.push('log');
        // determine short or long hash format
        args.push('--pretty=tformat:%' + (shortHashFormat ? 'h' : 'H'));
        args.push('-n');
        args.push('1');
        args.push(filePath);
    }
    const res = await spawner_1.default.promise(options, 'git', ...args);
    if (res.stdout) {
        const result = res.stdout[0];
        //console.log('git', ...args, result);
        return result;
    }
    else {
        return undefined;
    }
};
exports.latestCommit = latestCommit;
