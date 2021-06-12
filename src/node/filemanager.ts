import * as fs from "fs";
import path from "path";
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
      file = path.resolve(dir, file);
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

class filemanager {
  // eslint-disable-next-line no-unused-vars
  static readdir(path: string, callback: (err: ErrnoException | null, results?: string[]) => any) {
    return walk(path, callback);
  }
}

export default filemanager;
