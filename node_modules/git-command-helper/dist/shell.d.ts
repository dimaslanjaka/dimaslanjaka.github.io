/// <reference types="node" />
/// <reference types="node" />
import { SpawnOptions } from 'child_process';
export type ShellOptions = SpawnOptions & {
    verbose?: boolean;
    supress?: boolean;
};
/**
 * asynchronous spawner
 * @param cmd
 * @param args
 * @param opt
 * @returns
 */
export declare function shell(cmd: string, args: string[], opt?: ShellOptions): Promise<string | void | Buffer>;
