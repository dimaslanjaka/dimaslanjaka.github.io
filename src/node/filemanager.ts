/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as fs from 'fs';
import { default as nodePath } from 'path';
import upath from 'upath';
import ErrnoException = NodeJS.ErrnoException;
import { cwd as nodeCwd } from 'process';
import 'js-prototypes';
import Bluebird = require('bluebird');
import glob = require('glob');

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
const walk = function (dir: fs.PathLike, done: (err: ErrnoException | null, results?: string[]) => any) {
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
  readdirSync: (path: fs.PathLike, callback: (err: ErrnoException, results?: string[]) => any) => {
    return walk(path, callback);
  },

  /**
   * Remove dir recursively (non-empty folders supported)
   * @param path
   */
  rmdirSync: (path: fs.PathLike, options: fs.RmOptions = {}) => {
    if (fs.existsSync(path)) return fs.rmSync(path, Object.assign({ recursive: true }, options));
  },

  /**
   * Write to file recursively
   * @param path
   * @param content
   */
  write: (path: fs.PathLike, content: any) => {
    const dir = modPath.dirname(path.toString());
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (typeof content != 'string') {
      if (typeof content == 'object' || Array.isArray(content)) {
        content = JSON.stringify(content, null, 4);
      } else {
        content = String(content);
      }
    }
    fs.writeFileSync(path, content);
  },

  /**
   * Make directory recursive default
   * @param path
   * @param options
   * @returns
   */
  mkdirSync: (path: fs.PathLike, options: fs.MakeDirectoryOptions = {}) => {
    return fs.mkdirSync(path, Object.assign({ recursive: true }, options));
  },
};

export function removeMultiSlashes(str: string) {
  return str.replace(/(\/)+/g, '$1');
}

export const globSrc = function (pattern: string, opts: glob.IOptions = {}) {
  return new Bluebird((resolve: (arg: string[]) => any, reject) => {
    const opt: glob.IOptions = Object.assign({ cwd: cwd(), dot: true, matchBase: true }, opts);
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
export const dirname = (str: string) => removeMultiSlashes(upath.toUnix(upath.dirname(str)));
export const resolve = (str: string) => removeMultiSlashes(upath.toUnix(upath.resolve(str)));
export const join = (...str: string[]) => removeMultiSlashes(upath.toUnix(nodePath.join(...str)));
export const { write, readdirSync, rmdirSync, mkdirSync } = filemanager;
export const fsreadDirSync = fs.readdirSync;
export const { existsSync, readFileSync, appendFileSync, statSync } = fs;
export const { basename, relative, extname } = upath;
export const PATH_SEPARATOR = modPath.sep;
