"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spawn = exports.spawner = void 0;
const child_process_1 = require("child_process");
const spawn_1 = __importDefault(require("./spawn"));
class spawner {
    /**
     * promises spawn
     * @param options
     * @param cmd
     * @param args
     * @returns
     * @example
     * spawner.promise({}, 'git', 'log', '-n', '1').then(console.log);
     * spawner.promise({stdio:'pipe'}, 'git', 'submodule', 'status').then(console.log);
     */
    static promise(options = null, cmd, ...args) {
        return new Promise((resolve, reject) => {
            // default option inherit
            if (options === null) {
                options = {
                    cwd: __dirname,
                    stdio: 'inherit'
                };
            }
            const stdouts = [];
            const stderrs = [];
            const child = (0, child_process_1.spawn)(cmd, args, options);
            // use event hooks to provide a callback to execute when data are available:
            if (child.stdout !== null) {
                child.stdout.on('data', function (data) {
                    stdouts.push(data.toString().trim());
                });
            }
            if (child.stderr !== null) {
                child.stderr.on('data', function (data) {
                    stderrs.push(data.toString().trim());
                });
            }
            child.on('close', function (code) {
                // Should probably be 'exit', not 'close'
                // *** Process completed
                return resolve({
                    code: code,
                    stdout: stdouts.length > 0 ? stdouts : child.stdout,
                    stderr: stderrs.length > 0
                        ? stderrs
                        : stdouts.length === 0
                            ? child.stderr
                            : null
                });
            });
            child.on('error', function (err) {
                // *** Process creation failed
                return reject({ args: args, err: err });
            });
        });
    }
}
exports.spawner = spawner;
spawner.spawn = spawn_1.default;
exports.default = spawner;
exports.spawn = spawner.spawn;
//# sourceMappingURL=spawner.js.map