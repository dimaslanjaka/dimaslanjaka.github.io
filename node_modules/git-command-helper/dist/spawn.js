'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spawnSilent = exports.spawn = exports.spawnAsync = void 0;
const bluebird_1 = __importDefault(require("bluebird"));
const cross_spawn_1 = __importDefault(require("cross-spawn"));
// import { spawn as sysSpawn } from 'child_process';
const cache_stream_1 = __importDefault(require("./cache-stream"));
const noop_1 = __importDefault(require("./noop"));
var spawn_async_1 = require("@expo/spawn-async");
Object.defineProperty(exports, "spawnAsync", { enumerable: true, get: function () { return __importDefault(spawn_async_1).default; } });
/**
 * spawn promise
 * @param command
 * @param args
 * @param options
 * @returns
 */
function promiseSpawn(command, args = [], options = {}) {
    if (!command)
        throw new TypeError('command is required!');
    if (typeof args === 'string')
        args = [args];
    if (!Array.isArray(args)) {
        options = args;
        args = [];
    }
    return new bluebird_1.default((resolve, reject) => {
        const task = (0, cross_spawn_1.default)(command, args, options);
        const verbose = options.verbose || false;
        const { encoding = 'utf8' } = options;
        const stdoutCache = new cache_stream_1.default();
        const stderrCache = new cache_stream_1.default();
        if (task.stdout) {
            const stdout = task.stdout.pipe(stdoutCache);
            if (verbose)
                stdout.pipe(process.stdout);
        }
        if (task.stderr) {
            const stderr = task.stderr.pipe(stderrCache);
            if (verbose)
                stderr.pipe(process.stderr);
        }
        task.on('close', (code) => {
            if (code) {
                const e = new Error(getCache(stderrCache, encoding).toString());
                e['code'] = code;
                return reject(e);
            }
            resolve(getCache(stdoutCache, encoding).toString());
        });
        task.on('error', reject);
        // Listen to exit events if neither stdout and stderr exist (inherit stdio)
        if (!task.stdout && !task.stderr) {
            task.on('exit', (code) => {
                if (code) {
                    const e = new Error('Spawn failed');
                    e['code'] = code;
                    return reject(e);
                }
                resolve();
            });
        }
    });
}
exports.default = promiseSpawn;
function getCache(stream, encoding) {
    const buf = stream.getCache();
    stream.destroy();
    if (!encoding)
        return buf;
    return buf.toString(encoding);
}
/**
 * spawn async
 */
exports.spawn = promiseSpawn;
/**
 * spawn async suppress errors
 * @param command
 * @param args
 * @param options
 * @returns
 */
const spawnSilent = async function (command, args, options) {
    try {
        return await promiseSpawn(command, args, options);
    }
    catch (_) {
        return (0, noop_1.default)(_);
    }
};
exports.spawnSilent = spawnSilent;
//# sourceMappingURL=spawn.js.map