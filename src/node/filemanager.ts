/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Bluebird from 'bluebird';
import findCacheDir from 'find-cache-dir';
import * as fs from 'fs';
import { default as nodePath } from 'path';
import { cwd as nodeCwd } from 'process';
import upath from 'upath';
import { removeEmpties } from './array-utils';
import ErrnoException = NodeJS.ErrnoException;

import glob = require('glob');
/**
 * node_modules/.cache/${name}
 */
export const cacheDir = findCacheDir({ name: 'dimaslanjaka' });

export type Mutable<T> = {
  -readonly [k in keyof T]: T[k];
};
const modPath = nodePath as Mutable<typeof nodePath>;
//modPath.sep = '/';

/**
 * Directory iterator recursive
 * @param dir
 * @param done
 */
// eslint-disable-next-line no-unused-vars
const walk = function (
  dir: fs.PathLike,
  done: (err: ErrnoException | null, results?: string[]) => any
) {
  let results = [];
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    let pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function (file) {
      file = modPath.resolve(dir.toString(), file);
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function (err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

const filemanager = {
  // eslint-disable-next-line no-unused-vars
  readdirSync: (
    path: fs.PathLike,
    callback: (err: ErrnoException, results?: string[]) => any
  ) => {
    return walk(path, callback);
  },

  /**
   * Remove dir or file recursive synchronously (non-empty folders supported)
   * @param path
   */
  rmdirSync: (path: fs.PathLike, options: fs.RmOptions = {}) => {
    if (fs.existsSync(path))
      return fs.rmSync(path, Object.assign({ recursive: true }, options));
  },

  /**
   * remove dir or file recursive asynchronously
   * @param path
   * @param options
   * @param callback
   * @returns
   */
  rm: (
    path: fs.PathLike,
    options: fs.RmOptions | fs.NoParamCallback = {},
    callback?: fs.NoParamCallback
  ) => {
    if (fs.existsSync(path)) {
      if (typeof options == 'function') {
        return fs.rm(path, { recursive: true }, options);
      } else if (typeof options == 'object') {
        return fs.rm(
          path,
          Object.assign({ recursive: true }, options),
          typeof callback == 'function'
            ? callback
            : () => {
                // no callback? do nothing
              }
        );
      }
    }
  },

  /**
   * Write to file recursively (synchronous)
   * @param path
   * @param content
   * @returns Promise.resolve(path);
   * @example
   * // write directly
   * const input = write('/folder/file.txt', {'a':'v'});
   * // log here
   * console.log('written successfully');
   * // or log using async
   * input.then((file)=> console.log('written to', file));
   */
  write: (path: fs.PathLike, content: any) => {
    const dir = modPath.dirname(path.toString());
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (typeof content != 'string') {
      if (typeof content == 'object') {
        content = JSON.stringify(content, null, 4);
      } else {
        content = String(content);
      }
    }
    fs.writeFileSync(path, content);
    return Bluebird.resolve(path);
  },

  /**
   * Make directory recursive default (only not exists dir)
   * @param path
   * @param options
   * @returns
   */
  mkdirSync: (path: fs.PathLike, options: fs.MakeDirectoryOptions = {}) => {
    if (!existsSync(path))
      return fs.mkdirSync(path, Object.assign({ recursive: true }, options));
  }
};

export function removeMultiSlashes(str: string) {
  return str.replace(/(\/)+/g, '$1');
}

export const globSrc = function (pattern: string, opts: glob.IOptions = {}) {
  return new Bluebird((resolve: (arg: string[]) => any, reject) => {
    const opt: glob.IOptions = Object.assign(
      { cwd: cwd(), dot: true, matchBase: true },
      opts
    );
    glob(pattern, opt, function (err, files) {
      if (err) {
        return reject(err);
      }
      resolve(files.map(upath.toUnix));
    });
  });
};

export default filemanager;
export const normalize = upath.normalize;
export const writeFileSync = filemanager.write;
export const cwd = () => upath.toUnix(nodeCwd());
export const dirname = (str: string) =>
  removeMultiSlashes(upath.toUnix(upath.dirname(str)));
interface ResolveOpt {
  [key: string]: any;
  /**
   * validate path exists, otherwise null
   */
  validate?: boolean;
}
/**
 * @see {@link upath.resolve}
 * @param str
 * @param opt
 * @returns
 */
export const resolve = (str: string, opt: ResolveOpt | any = {}) => {
  const res = removeMultiSlashes(upath.toUnix(upath.resolve(str)));
  opt = Object.assign(
    {
      validate: false
    },
    opt
  );
  if (opt.validate) {
    if (existsSync(res)) return res;
    return null;
  }
  return res;
};
/**
 * nullable read file synchronous
 * @param path
 * @param opt
 * @returns
 */
export function read(
  path: string,
  opt?: Parameters<typeof fs.readFileSync>[1]
): ReturnType<typeof fs.readFileSync> | null {
  if (existsSync(path)) return readFileSync(path, opt);
}
/**
 * smart join to unix path
 * * removes empty/null/undefined
 * @param str
 * @returns
 */
export const join = (...str: any[]) => {
  str = removeEmpties(str.map((s) => String(s)));
  return removeMultiSlashes(upath.toUnix(nodePath.join(...str)));
};
export const { write, readdirSync, rmdirSync, rm, mkdirSync } = filemanager;
export const fsreadDirSync = fs.readdirSync;
export const { existsSync, readFileSync, appendFileSync, statSync } = fs;
export const { basename, relative, extname } = upath;
export const PATH_SEPARATOR = modPath.sep;
