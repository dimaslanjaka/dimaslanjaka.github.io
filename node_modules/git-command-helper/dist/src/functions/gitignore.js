"use strict";
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
exports.getGitignoreFiles = exports.getAllIgnoresConfig = exports.isIgnored = exports.getIgnores = void 0;
const bluebird_1 = __importDefault(require("bluebird"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const glob = __importStar(require("glob"));
const ignore_1 = __importDefault(require("ignore"));
const upath_1 = __importDefault(require("upath"));
const case_path_1 = require("../../utility/packages/sbg-utility/src/utils/filemanager/case-path");
const getGithubRootDir_1 = require("./getGithubRootDir");
/**
 * get all ignored files by .gitignore
 * @param param0
 * @returns
 */
const getIgnores = async ({ cwd = process.cwd() }) => {
    const searchDir = cwd;
    const searchDirRootGit = await (0, getGithubRootDir_1.getGithubRootDir)({ cwd: searchDir });
    if (!searchDirRootGit)
        throw new Error('cwd/search dir is not git');
    const ignores = await getAllIgnoresConfig({ cwd: searchDir });
    const ig = (0, ignore_1.default)().add(ignores);
    const files = await glob.glob('**', {
        // Adds a / character to directory matches.
        mark: true,
        cwd: searchDir,
        ignore: ['**/node_modules/**', '**/docs/**'],
        posix: true
    });
    return bluebird_1.default.all(files)
        .map(async (file) => {
        const absolute = (0, case_path_1.trueCasePathSync)(upath_1.default.resolve(searchDir, file));
        const dirname = upath_1.default.dirname(absolute);
        const rootGitOfFile = await (0, getGithubRootDir_1.getGithubRootDir)({ cwd: dirname });
        // fail when root git is different
        if (searchDirRootGit !== rootGitOfFile)
            return '';
        const relative = upath_1.default.relative(rootGitOfFile, absolute);
        if (ig.ignores(relative)) {
            return {
                absolute,
                relative: '/' + relative
            };
        }
        else {
            return '';
        }
    })
        .filter((item) => typeof item === 'object');
};
exports.getIgnores = getIgnores;
/**
 * is file ignored by `.gitignore`?
 * @param filePath `absolute` file path, but `relative` path must have `options.cwd`
 * @param options
 * @returns
 */
async function isIgnored(filePath, options) {
    const defaults = Object.assign({ cwd: upath_1.default.dirname(filePath) }, options || {});
    if (defaults.cwd === '.')
        defaults.cwd = process.cwd();
    // fix UNIX style
    if (fs_extra_1.default.existsSync(defaults.cwd))
        defaults.cwd = (0, case_path_1.trueCasePathSync)(defaults.cwd, { unix: true });
    /** git root directory */
    const gitRoot = (await (0, getGithubRootDir_1.getGithubRootDir)(defaults)) || '';
    /** setup ignore module */
    const patterns = await getAllIgnoresConfig({ cwd: gitRoot });
    const ig = (0, ignore_1.default)().add(patterns);
    const relative = upath_1.default.relative(gitRoot, filePath);
    if (fs_extra_1.default.existsSync(upath_1.default.join(gitRoot, filePath)) || relative.startsWith('.')) {
        // filePath parameter is relative to gitRoot
        return ig.ignores(filePath.replace(/^[./]+/g, ''));
    }
    return ig.ignores(relative);
}
exports.isIgnored = isIgnored;
/**
 * get and parse all `.gitignore` files
 */
async function getAllIgnoresConfig(options) {
    const files = await getGitignoreFiles(options);
    const lines = files
        .map((file) => fs_extra_1.default
        .readFileSync(file, 'utf-8')
        .split(/\r?\n/gm)
        .map((str) => str.trim()))
        .flat()
        .filter((str) => str.length > 0 && !str.startsWith('#'));
    return lines;
}
exports.getAllIgnoresConfig = getAllIgnoresConfig;
/**
 * get all `.gitignore` files
 * @param searchDir
 * @returns
 */
function getGitignoreFiles(opt) {
    const searchDirRootGit = (0, getGithubRootDir_1.getGithubRootDir)(opt);
    return new bluebird_1.default((res) => {
        const ignore = ['**/node_modules/**'];
        if (Array.isArray(opt.ignore)) {
            ignore.push(...opt.ignore);
        }
        else if (typeof opt.ignore === 'string') {
            ignore.push(opt.ignore);
        }
        bluebird_1.default.resolve(glob.glob('**/.gitignore', Object.assign({ cwd: opt.cwd }, opt, {
            posix: true,
            ignore
        })))
            .then((result) => {
            return bluebird_1.default.all(result.map(async (filePath) => {
                const absolute = upath_1.default.join(opt.cwd, filePath);
                const dirname = upath_1.default.dirname(absolute);
                const rootGitOfFile = await (0, getGithubRootDir_1.getGithubRootDir)({ cwd: dirname });
                if (rootGitOfFile !== (await searchDirRootGit))
                    return;
                return (0, case_path_1.trueCasePathSync)(absolute);
            })).filter((o) => typeof o !== 'undefined');
        })
            .then((o) => res(o));
    });
}
exports.getGitignoreFiles = getGitignoreFiles;
