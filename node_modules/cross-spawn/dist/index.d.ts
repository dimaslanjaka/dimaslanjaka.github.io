/// <reference types="node" />
export = spawn;
/**
 * @description
 * @param {string} command - Command.
 * @param {string[]|import('child_process').SpawnOptions} args - Arguments.
 * @param {import('child_process').SpawnOptions} [options] - Spawn Options.
 * @returns {import('child_process').ChildProcess} Return Promise.
 */
declare function spawn(command: string, args: string[] | import('child_process').SpawnOptions, options?: import('child_process').SpawnOptions): import('child_process').ChildProcess;
declare namespace spawn {
    export { spawn, spawnSync as sync, spawnAsync as async, parse as _parse, enoent as _enoent };
}
/**
 * @description
 * @param {string} command - Command.
 * @param {string[]} args - Arguments.
 * @param {import('child_process').SpawnOptions} [options] - Spawn Options.
 * @returns {ReturnType<typeof cp.spawnSync>} Return Promise.
 */
declare function spawnSync(command: string, args: string[], options?: import('child_process').SpawnOptions): ReturnType<typeof cp.spawnSync>;
/**
 * Spawn asynchronously.
 * @description
 * @param {string} command - Command.
 * @param {string[]} args - Arguments.
 * @param {import('child_process').SpawnOptions} options - Spawn Options.
 * @returns {Promise<{ stdout: string, stderr: string, err: string | null }>} Return Promise.
 */
declare function spawnAsync(command: string, args: string[], options: import('child_process').SpawnOptions): Promise<{
    stdout: string;
    stderr: string;
    err: string | null;
}>;
import parse = require("./lib/parse");
import enoent = require("./lib/enoent");
import cp = require("child_process");
//# sourceMappingURL=index.d.ts.map