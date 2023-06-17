/// <reference types="node" />
import fs from 'fs-extra';
export interface writefileOpt extends fs.MakeDirectoryOptions {
    append?: boolean | undefined | null;
    async?: boolean | undefined | null;
}
export interface writefileResult {
    file: string;
    append: boolean;
}
export type strORobj = string | Record<string, any>;
/**
 * sync write to file recursively (auto create dirname)
 * @param file
 * @param content
 */
export declare function writefile(file: string, content: strORobj): writefileResult;
export declare function writefile(file: string, content: strORobj, opt: {
    append: boolean;
    async: undefined | null;
}): writefileResult;
/**
 * async write to file recursively (auto create dirname)
 * @param file
 * @param content
 * @param opt
 */
export declare function writefile(file: string, content: strORobj, opt: {
    async: true;
}): Promise<writefileResult>;
/**
 * async write to file recursively (auto create dirname)
 * @param file
 * @param content
 * @param opt
 */
export declare function writefile(file: string, content: strORobj, opt: {
    async: true;
    append: boolean | undefined | null;
}): Promise<writefileResult>;
/**
 * sync write to file recursively (auto create dirname)
 * @param file
 * @param content
 * @param opt
 */
export declare function writefile(file: string, content: strORobj, opt: {
    async?: false | undefined | null;
    append?: boolean;
}): writefileResult;
