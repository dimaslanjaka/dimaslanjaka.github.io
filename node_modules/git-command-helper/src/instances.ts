import git from './git';
import submodule from './submodule';

const instances: Record<string, git | submodule> = {};

/**
 * get git instance
 * @param key
 * @returns
 */
export function getInstance<T extends git | submodule>(key: string) {
  return instances[key] as T;
}

/**
 * set git instance
 * @param key
 * @param instance
 */
export function setInstance(key: string, instance: git | submodule) {
  instances[key] = instance;
}

/**
 * check git instance
 * @param key
 * @returns
 */
export function hasInstance(key: string) {
  return typeof instances[key] !== 'undefined';
}
