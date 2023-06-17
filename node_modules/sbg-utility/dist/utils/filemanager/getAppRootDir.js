"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppRootDir = void 0;
const tslib_1 = require("tslib");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const upath_1 = tslib_1.__importDefault(require("upath"));
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
//# sourceMappingURL=getAppRootDir.js.map