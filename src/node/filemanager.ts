import * as fs from "fs";
import { default as nodePath } from "path";
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

class filemanager {
  // eslint-disable-next-line no-unused-vars
  static readdir(path: string, callback: (err: ErrnoException | null, results?: string[]) => any) {
    return walk(path, callback);
  }

  /**
   * Remove dir recursively (non-empty folders supported)
   * @param path
   */
  static rmdir(path: string) {
    fs.rmdirSync(path, { recursive: true });
  }

  /**
   * Write to file recursively
   * @param path
   * @param content
   */
  static write(path: string, content: any) {
    const dir = nodePath.dirname(path);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (typeof content != "string") {
      if (typeof content == "object" || Array.isArray(content)) {
        content = JSON.stringify(content, null, 4);
      } else {
        content = String(content);
      }
    }
    fs.writeFileSync(path, content);
  }
}

export default filemanager;
