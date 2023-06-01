"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.del = void 0;
const bluebird_1 = __importDefault(require("bluebird"));
const fs_extra_1 = __importDefault(require("fs-extra"));
/**
 * delete folder async
 * @param path
 * @returns
 */
function del(path) {
    return new bluebird_1.default((resolve) => {
        const rmOpt = { recursive: true, force: true };
        if (fs_extra_1.default.existsSync(path)) {
            fs_extra_1.default.rm(path, rmOpt).then(resolve).catch(resolve);
            /*if (statSync(path).isDirectory()) {
              rmdir(path, { maxRetries: 10 }).then(resolve).catch(resolve);
            } else {
              rm(path, rmOpt).then(resolve).catch(resolve);
            }*/
        }
        else {
            resolve(new Error(path + ' not found'));
        }
    });
}
exports.del = del;
