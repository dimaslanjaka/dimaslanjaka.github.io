import git from './git';
import submodule from './submodule';
/**
 * get git instance
 * @param key
 * @returns
 */
export declare function getInstance<T extends git | submodule>(key: string): T;
/**
 * set git instance
 * @param key
 * @param instance
 */
export declare function setInstance(key: string, instance: git | submodule): void;
/**
 * check git instance
 * @param key
 * @returns
 */
export declare function hasInstance(key: string): boolean;
