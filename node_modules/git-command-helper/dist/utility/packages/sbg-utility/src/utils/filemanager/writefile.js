"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writefile = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const upath_1 = __importDefault(require("upath"));
/**
 * sync write to file recursively (auto create dirname)
 * @param file
 * @param content
 * @param opt
 */
function writefile(file, content, opt = {}) {
    // create dirname when not exist
    if (!fs_extra_1.default.existsSync(upath_1.default.dirname(file)))
        fs_extra_1.default.mkdirSync(upath_1.default.dirname(file), Object.assign({ recursive: true }, opt));
    const result = {
        file,
        append: false
    };
    // transform object
    if (typeof content === 'object') {
        content = JSON.stringify(content, null, 2);
    }
    if (opt.append) {
        result.append = true;
        fs_extra_1.default.appendFileSync(file, content);
    }
    else {
        fs_extra_1.default.writeFileSync(file, content);
    }
    if (opt.async)
        return Promise.resolve(result);
    return result;
}
exports.writefile = writefile;
