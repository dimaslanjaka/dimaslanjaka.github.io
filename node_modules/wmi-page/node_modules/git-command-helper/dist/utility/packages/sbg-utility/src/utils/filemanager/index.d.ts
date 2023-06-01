/// <reference types="node" />
import * as fs from 'fs-extra';
import * as path from 'upath';
export * from './del';
export * from './emptyDir';
export * from './getAppRootDir';
export * from './images';
export * from './normalizePath';
export { normalizePath as joinPath, normalizePath as pathJoin } from './normalizePath';
export * from './readDir';
export * from './writefile';
export { fs, path };
/**
 * create writestream (auto create dirname)
 * @param dest
 * @param options
 * @returns
 */
export declare function createWriteStream(dest: string, options?: Parameters<(typeof fs)['createWriteStream']>[1]): fs.WriteStream;
/**
 * is non-markdown file
 * @param path
 * @returns
 */
export declare const isAsset: (path: any) => boolean;
/**
 * is markdown file
 * @param path
 * @returns
 */
export declare const isMarkdown: (path: any) => boolean;
