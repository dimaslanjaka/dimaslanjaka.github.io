/// <reference types="node" />
import Bluebird from 'bluebird';
import { CommonSpawnOptions } from 'child_process';
export { default as spawnAsync } from '@expo/spawn-async';
export * from '../cross-spawn/src';
export type SpawnOptions = Record<string, any> & CommonSpawnOptions;
/**
 * spawn promise
 * @param command
 * @param args
 * @param options
 * @returns
 */
export default function promiseSpawn(command: string, args?: string[] | SpawnOptions, options?: SpawnOptions): Bluebird<string>;
/**
 * spawn async
 */
export declare const spawn: typeof promiseSpawn;
/**
 * spawn async suppress errors
 * @param command
 * @param args
 * @param options
 * @returns
 */
export declare const spawnSilent: (command: string, args?: string[] | SpawnOptions, options?: SpawnOptions) => Promise<string | void>;
