import git from './git';
import submodule from './submodule';
/**
 * get git instance
 * @param key
 * @returns
 */
export declare function getInstance<T>(key: string): T;
/**
 * set git instance
 * @param key
 * @param instance
 */
export declare function setInstance<T>(key: string, instance: git | submodule | T): void;
/**
 * check git instance
 * @param key
 * @returns
 */
export declare function hasInstance(key: string): boolean;
