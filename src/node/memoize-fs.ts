import { resolve } from 'path';
import color from './color';
import { cacheDir, existsSync, join, readFileSync, rm, write } from './filemanager';
import { md5 } from './md5-file';

type Func = (...args: any[]) => any;
interface ObjectCached {
  type: any;
  content: any;
}

class memoizer {
  cache = {};
  memoize = <F extends Func>(fn: F): F => {
    const self = this;
    return ((...args: any[]) => {
      const find = this.getCacheFilePath(fn, ...args);

      if (existsSync(find)) {
        const read: ObjectCached = JSON.parse(readFileSync(find, 'utf-8'));
        if (this.verbose) console.log(color.greenBright('Fetching from cache'));
        return read.content;
      } else {
        if (this.verbose) console.log(color.Red('Calculating result'));
        const result = fn(...args);
        const content: ObjectCached = {
          type: self.determineType(result),
          content: result,
        };
        write(find, content);
        return result;
      }
    }) as F;
  };
  /**
   * @see {@link memoizer.memoize}
   */
  fn = this.memoize;
  /**
   * cache directory
   */
  cacheDir = join(cacheDir, 'memoize-fs');
  verbose = false;
  /**
   * determine function return type
   * @param arg
   * @returns
   */
  determineType(arg: any) {
    if (typeof arg == 'object') {
      if (Array.isArray(arg)) return 'array';
      return 'object';
    }
    return typeof arg;
  }
  /**
   * clear cache function
   * @param fn
   */
  clear(fn: Func, ...args: any[]) {
    const argpath = this.getCacheFilePath(fn, ...args);
    const fnpath = this.getCacheFilePath(fn);

    if (existsSync(fnpath)) {
      if (this.verbose) console.log('found fn');
      rm(fnpath, { recursive: true });
    }
    if (existsSync(argpath)) {
      if (this.verbose) console.log('found fn args');
      rm(argpath, { recursive: true });
    }
  }
  /**
   * get function cache file
   * @param fn
   * @param args
   * @returns
   */
  getCacheFilePath(fn: Func, ...args: any[]) {
    const args1 = String(args);
    return ((...args: any[]) => {
      let pathStr = this.determinefn(fn);
      if (args1.length) pathStr += '/' + md5(String(args1));
      if (args.length) pathStr += '/' + md5(String(args));
      const path = resolve(join(this.cacheDir, pathStr));
      if (this.verbose) console.log(path, existsSync(path));
      return path;
    })();
  }
  /**
   * determine function
   * @param fn
   * @param _args
   * @returns
   */
  private determinefn(fn: Func, ..._args: any[]) {
    const fnStr = String(fn);
    return md5(fnStr);
  }
}
export default memoizer;

const mem = new memoizer();

export const memoizeFs = mem.memoize;
