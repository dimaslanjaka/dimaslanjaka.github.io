/// <reference types="node" />
import { SpawnOptions } from 'child_process';
import { Readable } from 'stream';
import promiseSpawn from './spawn';
export declare class spawner {
    static spawn: typeof promiseSpawn;
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
    static promise(options: null | SpawnOptions, cmd: string, ...args: string[]): Promise<{
        code: number;
        stdout: string[] | Readable;
        stderr: string[] | Readable;
    }>;
}
export default spawner;
export declare const spawn: typeof promiseSpawn;
