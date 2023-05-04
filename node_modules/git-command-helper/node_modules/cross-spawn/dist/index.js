'use strict';
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var cp = require('child_process');
var parse = require('./lib/parse');
var enoent = require('./lib/enoent');
/**
 * @description
 * @param {string} command - Command.
 * @param {string[]|import('child_process').SpawnOptions} args - Arguments.
 * @param {import('child_process').SpawnOptions} [options] - Spawn Options.
 * @returns {import('child_process').ChildProcess} Return Promise.
 */
function spawn(command, args, options) {
    // Parse the arguments
    var parsed = parse(command, args, options);
    // Spawn the child process
    var spawned = cp.spawn(parsed.command, parsed.args, parsed.options);
    // Hook into child process "exit" event to emit an error if the command
    // does not exists, see: https://github.com/IndigoUnited/node-cross-spawn/issues/16
    enoent.hookChildProcess(spawned, parsed);
    return spawned;
}
/**
 * @description
 * @param {string} command - Command.
 * @param {string[]} args - Arguments.
 * @param {import('child_process').SpawnOptions} [options] - Spawn Options.
 * @returns {ReturnType<typeof cp.spawnSync>} Return Promise.
 */
function spawnSync(command, args, options) {
    // Parse the arguments
    var parsed = parse(command, args, options);
    // Spawn the child process
    var result = cp.spawnSync(parsed.command, parsed.args, parsed.options);
    // Analyze if the command does not exist, see: https://github.com/IndigoUnited/node-cross-spawn/issues/16
    result.error =
        result.error || enoent.verifyENOENTSync(result.status, parsed);
    return result;
}
/**
 * Spawn asynchronously.
 * @description
 * @param {string} command - Command.
 * @param {string[]} args - Arguments.
 * @param {import('child_process').SpawnOptions} options - Spawn Options.
 * @returns {Promise<{ stdout: string, stderr: string, err: string | null }>} Return Promise.
 */
function spawnAsync(command, args, options) {
    return new Promise(function (resolve) {
        var stdout = '';
        var stderr = '';
        var child = spawn(command, args, options);
        // Capture stdout
        if (child.stdout && 'on' in child.stdout) {
            child.stdout.setEncoding('utf8');
            child.stdout.on('data', function (data) {
                stdout += data;
            });
        }
        // Capture stderr
        if (child.stderr && 'on' in child.stdout) {
            child.stderr.setEncoding('utf8');
            child.stderr.on('data', function (data) {
                stderr += data;
            });
        }
        child.on('close', function (code, signal) {
            // Should probably be 'exit', not 'close'
            /* if (code !== 0) {
                console.log('[ERROR]', command, ...args, 'dies with code', code, 'signal', signal);
            }*/
            // Process completed
            resolve({
                stdout: stdout,
                stderr: stderr,
                err: code !== 0 ?
                    __spreadArray(__spreadArray([
                        command
                    ], args, true), [
                        'dies with code',
                        code,
                        'signal',
                        signal,
                    ], false).join(' ') :
                    null,
            });
        });
        /*
        child.on('error', function (err) {
            // Process creation failed
            resolve(err);
        });*/
    });
}
module.exports = spawn;
module.exports.spawn = spawn;
module.exports.sync = spawnSync;
module.exports.async = spawnAsync;
module.exports._parse = parse;
module.exports._enoent = enoent;
