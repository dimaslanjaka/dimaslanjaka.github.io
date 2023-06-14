/// <reference types="node" />
/// <reference types="node" />
import fs from 'fs-extra';
import './JSON';
export interface PersistentCacheOpt {
    /**
     * folder cache
     * @description The base directory where `persistent-cache` will save its caches.
     *
     * Defaults to the main modules directory
     */
    base: string;
    /**
     * cache instance name
     * @description The name of the cache. Determines the name of the created folder where the data is stored, which is just `base + name`.
     *
     * Defaults to `cache`
     */
    name: string;
    /**
     * expired in milliseconds
     * @description The amount of milliseconds a cache entry should be valid for. If not set, cache entries are not invalidated (stay until deleted).
     *
     * Defaults to `undefined` (infinite)
     */
    duration: number;
    /**
     * Whether the cache should use memory caching or not (mirrors all cache data in the ram,
     * saving disk I/O and increasing performance).
     *
     * Defaults to `true`
     */
    memory: boolean;
    /**
     * Whether the cache should be persistent, aka if it should write its data to the disk
     * for later use or not. Set this to `false` to create a memory-only cache.
     *
     * Defaults to `true`
     */
    persist: boolean;
}
export declare class persistentCache implements PersistentCacheOpt {
    base: string;
    name: string;
    duration: number;
    memory: boolean;
    persist: boolean;
    memoryCache: Record<string, any>;
    constructor(options?: Partial<PersistentCacheOpt>);
    /**
     * add cache deferred callback
     * @param key
     * @param data
     * @param cb
     * @returns
     */
    put(key: string, data: any, cb: {
        (e: Error | NodeJS.ErrnoException): any;
        (e: Error | NodeJS.ErrnoException, ...args: any[]): any;
    } | null | undefined): any;
    /**
     * add cache sync
     * @param key
     * @param data
     * @returns boolean=success, any=error
     */
    putSync(key: string, data: any): any | boolean;
    setSync: (key: string, data: any) => any | boolean;
    /**
     * add cache async
     * @param key
     * @param data
     * @returns
     */
    set(key: string, data: any): Promise<unknown>;
    /**
     * get cache by key synchronously
     * @param name
     * @param fallback
     * @returns
     */
    getSync<T>(name: string, fallback?: T): T;
    get<T>(name: string, fallback?: T): Promise<T>;
    get<T>(name: string, fallback?: (e: Error | undefined | null, entry?: T) => any): void;
    /**
     * delete cache
     * @param name cache key
     * @param cb
     */
    deleteEntry(name: string, cb: fs.NoParamCallback): void;
    /**
     * delete cache sync
     * @param name cache key
     * @returns
     */
    deleteEntrySync(name: string): void;
    getCacheDir(): string;
    /**
     * remove current cache directory
     * @param cb
     * @returns
     */
    unlink(cb: {
        (e: Error, ...args: any[]): any;
        (e: Error, ...args: any[]): any;
    }): void;
    private transformFileNameToKey;
    /**
     * get all cache keys
     * @param cb
     * @returns
     */
    keys(cb: (e: Error | null, ...args: any[]) => any): any;
    /**
     * get cache keys sync
     * @returns
     */
    keysSync(): string[];
    /**
     * get all values
     * @returns
     */
    valuesSync(): unknown[];
    buildFilePath(name: string): string;
    buildCacheEntry(data: any): {
        cacheUntil: number;
        data: any;
    };
}
type safeCbParam = null | undefined | {
    (e: Error, ...args: any[]): any;
    (...args: any[]): any;
};
/**
 * safe callback
 * @param cb
 * @returns
 */
export declare function safeCb(cb: safeCbParam): (...args: any[]) => any;
export {};
