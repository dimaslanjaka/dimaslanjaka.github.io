"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyDir = void 0;
const tslib_1 = require("tslib");
const minimatch_1 = require("minimatch");
const readDir_1 = tslib_1.__importDefault(require("./readDir"));
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
        const filter = fileList?.filter((file) => {
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
        }) || [];
        return filter;
    });
}
exports.emptyDir = emptyDir;
//const _ex = path.join(__dirname, '../..');
//emptyDir(_ex, { ignore: ['**/config/**'] });
//# sourceMappingURL=emptyDir.js.map