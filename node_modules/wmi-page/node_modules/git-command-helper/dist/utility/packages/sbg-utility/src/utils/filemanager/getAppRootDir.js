"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppRootDir = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const upath_1 = __importDefault(require("upath"));
const case_path_1 = require("./case-path");
function getAppRootDir() {
    let currentDir = __dirname;
    while (!fs_extra_1.default.existsSync(upath_1.default.join(currentDir, 'package.json'))) {
        currentDir = upath_1.default.join(currentDir, '..');
    }
    return upath_1.default.toUnix((0, case_path_1.trueCasePathSync)(currentDir));
}
exports.getAppRootDir = getAppRootDir;
exports.default = getAppRootDir;
