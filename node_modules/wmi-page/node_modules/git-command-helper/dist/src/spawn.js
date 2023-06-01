'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spawnSilent = exports.spawn = exports.spawnAsync = void 0;
const bluebird_1 = __importDefault(require("bluebird"));
const sysSpawn = __importStar(require("../cross-spawn/src/index"));
var spawn_async_1 = require("@expo/spawn-async");
Object.defineProperty(exports, "spawnAsync", { enumerable: true, get: function () { return __importDefault(spawn_async_1).default; } });
__exportStar(require("../cross-spawn/src"), exports);
// import { spawn as sysSpawn } from 'child_process';
const lodash_1 = __importDefault(require("lodash"));
const cache_stream_1 = __importDefault(require("./cache-stream"));
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
        const task = sysSpawn.spawn(command, args, options);
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
    catch (_err) {
        return lodash_1.default.noop(_err);
    }
};
exports.spawnSilent = spawnSilent;
