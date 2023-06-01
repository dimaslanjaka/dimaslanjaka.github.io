import git from './git';
import submodule from './submodule';

const instances: Record<string, any> = {};

/**
 * get git instance
 * @param key
 * @returns
 */
export function getInstance<T>(key: string) {
  return instances[key] as T;
}

/**
 * set git instance
 * @param key
 * @param instance
 */
export function setInstance<T>(key: string, instance: git | submodule | T) {
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
