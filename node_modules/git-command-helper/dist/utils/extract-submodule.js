"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const ini_1 = __importDefault(require("ini"));
const upath_1 = require("upath");
const git_1 = __importDefault(require("../git"));
/**
 * extract submodule to object
 * @param gitmodulesPath
 */
function extractSubmodule(gitmodulesPath) {
    const config = ini_1.default.parse(fs_extra_1.default.readFileSync(gitmodulesPath).toString());
    return Object.keys(config).map((key) => {
        if (key.startsWith('submodule')) {
            const submodule = config[key];
            submodule.cwd = (0, upath_1.join)((0, upath_1.dirname)(String(gitmodulesPath)), submodule.path);
            const github = new git_1.default(submodule);
            submodule.github = github;
            return submodule;
        }
    });
}
exports.default = extractSubmodule;
