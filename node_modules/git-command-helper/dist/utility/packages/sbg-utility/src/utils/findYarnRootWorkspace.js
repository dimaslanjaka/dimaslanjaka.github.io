"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findYarnRootWorkspace = void 0;
const fs_1 = require("fs");
const micromatch_1 = __importDefault(require("micromatch"));
const path_1 = require("path");
/**
 * search yarn root workspace folder
 * @param ctx option with property `base_dir`
 */
function findYarnRootWorkspace(ctx) {
    const baseDir = ctx.base_dir;
    /**
     * extract workspaces from package.json
     * @param manifest
     * @returns
     */
    const extractWorkspaces = function (manifest) {
        const workspaces = (manifest || {}).workspaces;
        return (workspaces && workspaces.packages) || (Array.isArray(workspaces) ? workspaces : null);
    };
    /**
     * read package.json from given folder
     * @param dir
     * @returns
     */
    const readPackageJSON = function (dir) {
        const file = (0, path_1.join)(dir, 'package.json');
        if ((0, fs_1.existsSync)(file)) {
            return JSON.parse((0, fs_1.readFileSync)(file).toString());
        }
    };
    let previous = 'THIS INITIATOR VALUE WILL NEVER EXECUTED';
    let current = (0, path_1.normalize)(baseDir);
    // loop searching
    do {
        const manifest = readPackageJSON(current);
        if (!manifest)
            continue;
        const workspaces = extractWorkspaces(manifest);
        if (workspaces) {
            const relativePath = (0, path_1.relative)(current, baseDir);
            if (relativePath === '' || (0, micromatch_1.default)([relativePath], workspaces).length > 0) {
                return current;
            }
            return null;
        }
        previous = current;
        current = (0, path_1.dirname)(current);
    } while (current !== previous);
    return null;
}
exports.findYarnRootWorkspace = findYarnRootWorkspace;
exports.default = findYarnRootWorkspace;
