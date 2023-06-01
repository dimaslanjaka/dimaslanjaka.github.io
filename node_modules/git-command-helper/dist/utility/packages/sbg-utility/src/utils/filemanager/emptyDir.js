"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyDir = void 0;
const minimatch_1 = require("minimatch");
const readDir_1 = __importDefault(require("./readDir"));
/**
 * empty dir with filters
 * @param dir
 * @param param1
 */
function emptyDir(dir, { ignore }) {
    (0, readDir_1.default)(dir, function (err, fileList) {
        if (err)
            throw err;
        // const filterFn = (pattern: string) => minimatch.filter(pattern, { matchBase: true });
        const filter = (fileList === null || fileList === void 0 ? void 0 : fileList.filter((file) => {
            for (let i = 0; i < ignore.length; i++) {
                const pattern = ignore[i];
                if (typeof pattern === 'string') {
                    const match = (0, minimatch_1.minimatch)(file, pattern, { matchBase: true, dot: true });
                    // console.log(file.replace(dir, ''), pattern, match);
                    // filter file if matched
                    if (match)
                        return false;
                }
                else {
                    // filter file if matched
                    if (pattern.test(file))
                        return false;
                }
            }
            return true;
        })) || [];
        return filter;
    });
}
exports.emptyDir = emptyDir;
//const _ex = path.join(__dirname, '../..');
//emptyDir(_ex, { ignore: ['**/config/**'] });
