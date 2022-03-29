/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as fs from 'fs';
import { default as nodePath } from 'path';
import ErrnoException = NodeJS.ErrnoException;

/**
 * Directory iterator recursive
 * @param dir
 * @param done
 */
// eslint-disable-next-line no-unused-vars
const walk = function (dir, done: (err: ErrnoException | null, results?: string[]) => any) {
  let results = [];
  fs.readdir(dir, function (err, list) {
    if (err) return done(err);
    let pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function (file) {
      file = nodePath.resolve(dir, file);
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
  readdirSync: (path, callback) => {
    return walk(path, callback);
  },

  /**
   * Remove dir recursively (non-empty folders supported)
   * @param path
   */
  rmdirSync: (path: fs.PathLike, options: fs.RmDirOptions = {}) => {
    return fs.rmdirSync(path, Object.assign({ recursive: true }, options));
  },

  /**
   * Write to file recursively
   * @param path
   * @param content
   */
  write: (path: fs.PathLike, content: any) => {
    const dir = nodePath.dirname(path.toString());
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

export default filemanager;
export const writeFileSync = filemanager.write;
export const { write, readdirSync, rmdirSync, mkdirSync } = filemanager;
export const { existsSync, readFileSync, appendFileSync } = fs;
export const { basename, dirname, join, relative, extname } = nodePath;
