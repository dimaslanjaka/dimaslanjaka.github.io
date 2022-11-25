import Bluebird from 'bluebird';
import sysSpawn from 'cross-spawn';
declare type originalOpt = Parameters<typeof sysSpawn>[2];
export declare type SpawnOptions = Record<string, any> & originalOpt;
export default function promiseSpawn(command: string, args?: string[] | SpawnOptions, options?: SpawnOptions): Bluebird<string>;
export declare const spawn: typeof promiseSpawn;
export {};
