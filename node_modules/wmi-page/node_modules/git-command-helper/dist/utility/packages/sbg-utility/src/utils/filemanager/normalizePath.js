"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinSolve = exports.normalizePath = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const upath_1 = __importDefault(require("upath"));
const case_path_1 = require("./case-path");
/**
 * UNIX join path with true-case-path
 * @description normalize path and make drive letter uppercase
 * @param str
 * @returns Unix Style Path
 */
function normalizePath(...str) {
    const join = upath_1.default.join(...str);
    if (fs_extra_1.default.existsSync(join)) {
        const casePath = (0, case_path_1.trueCasePathSync)(join);
        return upath_1.default.toUnix(casePath);
    }
    else {
        return join;
    }
}
exports.normalizePath = normalizePath;
/**
 * UNIX join path with auto create dirname when not exists
 * @param path
 * @returns
 */
function joinSolve(...paths) {
    const merge = normalizePath(...paths);
    if (!fs_extra_1.default.existsSync(upath_1.default.dirname(merge))) {
        fs_extra_1.default.mkdirSync(upath_1.default.dirname(merge), { recursive: true });
    }
    return merge;
}
exports.joinSolve = joinSolve;
exports.default = normalizePath;
