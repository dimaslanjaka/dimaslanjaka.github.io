import { spawnSyncReturn } from '../../cross-spawn/src/spawn';
type ObjResult = {
    U: string;
} | {
    M: string;
} | {
    D: string;
};
/**
 * git status
 * @param opt
 * @returns raw result
 */
export declare function gitStatus(opt: {
    [key: string]: any;
    /** current working directory */
    cwd: string;
    /** true = --porcelain */
    porcelain?: boolean;
    /** show raw output instead parsed object */
    raw: true;
}): spawnSyncReturn;
/**
 * git status
 * @param opt
 * @returns parsed result
 */
export declare function gitStatus(opt: {
    [key: string]: any;
    /** current working directory */
    cwd: string;
    /** true = --porcelain */
    porcelain?: boolean;
    /** show raw output instead parsed object */
    raw: false;
}): ObjResult[];
/**
 * git status
 * @param opt
 * @returns parsed result
 */
export declare function gitStatus(opt: {
    [key: string]: any;
    /** current working directory */
    cwd: string;
    /** true = --porcelain */
    porcelain?: boolean;
}): ObjResult[];
/**
 * git status
 * @param opt
 * @returns parsed result
 */
export declare function gitStatus(opt: {
    [key: string]: any;
    /** current working directory */
    cwd: string;
}): ObjResult[];
export {};
