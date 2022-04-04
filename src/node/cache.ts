import chalk from 'chalk';
import { root } from '../types/_config';
import { existsSync, join, mkdirSync, readFileSync, write } from './filemanager';
import logger from './logger';
import { md5, md5FileSync } from './md5-file';
import scheduler from './scheduler';

interface Objek {
  [key: string]: any;
}
export const dbFolder = join(root, 'databases');

/**
 * @summary IN FILE CACHE.
 * @description Save cache to file (not in-memory), cache will be restored on next process restart.
 */
export default class CacheFile {
  md5Cache: Objek = {};
  dbFile: string;
  private currentHash: string;
  constructor(hash = null) {
    this.currentHash = hash;
    if (!hash) {
      const stack = new Error().stack.split('at')[2];
      hash = md5(stack);
    }
    if (!existsSync(dbFolder)) mkdirSync(dbFolder);
    this.dbFile = join(dbFolder, 'db-' + hash + '.json');
    let db = existsSync(this.dbFile) ? readFileSync(this.dbFile, 'utf-8') : {};
    if (typeof db != 'object') {
      try {
        db = JSON.parse(db.toString());
      } catch (e) {
        logger.error('cache database lost');
        logger.error(e);
      }
    }
    if (typeof db == 'object') {
      this.md5Cache = db;
    }
  }
  setCache = (key: string, value: any) => this.set(key, value);
  /**
   * resolve long text on key
   */
  resolveKey(key: string) {
    // if key is file path
    if (existsSync(key)) return key;
    // if key is long text
    if (key.length > 32) {
      // search uuid
      const regex = /uuid:.*([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/gm;
      const m = regex.exec(key);
      if (typeof m[1] == 'string') return m[1];
      // return first 32 byte text
      return key.substring(0, 32);
    }
    return key;
  }
  set(key: string, value: any) {
    const self = this;
    key = this.resolveKey(key);
    this.md5Cache[key] = value;
    // save cache on process exit
    scheduler.add('writeCacheFile-' + this.currentHash, () => {
      logger.log(chalk.magentaBright(self.currentHash), 'saved cache', self.dbFile);
      write(self.dbFile, JSON.stringify(self.md5Cache));
    });
  }
  has(key: string): boolean {
    key = this.resolveKey(key);
    return typeof this.md5Cache[key] !== undefined;
  }
  /**
   * Get cache by key
   * @param key
   * @param fallback
   * @returns
   */
  get(key: string, fallback = null) {
    key = this.resolveKey(key);
    const Get = this.md5Cache[key];
    if (Get === undefined) return fallback;
    return Get;
  }
  getCache = (key: string, fallback = null) => this.get(key, fallback);
  /**
   * Check file is changed with md5 algorithm
   * @param path0
   * @returns
   */
  isFileChanged(path0: string): boolean {
    if (typeof path0 != 'string') {
      //console.log("", typeof path0, path0);
      return true;
    }
    try {
      // get md5 hash from path0
      const pathMd5 = md5FileSync(path0);
      // get index hash
      const savedMd5 = this.md5Cache[path0 + '-hash'];
      const result = savedMd5 != pathMd5;
      if (result) {
        // set, if file hash is not found
        this.md5Cache[path0 + '-hash'] = pathMd5;
      }
      return result;
    } catch (e) {
      return true;
    }
  }
}
