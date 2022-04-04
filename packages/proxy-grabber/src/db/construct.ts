import path, { dirname } from 'path';
import 'js-prototypes';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';

class DBConstructor {
  folder: string;
  debug = false;
  /**
   * Database File Constructor
   * @param folder folder to save entire databases
   */
  constructor(folder: string) {
    this.folder = folder;
  }
  /**
   * check if data key on table exists
   * @param key
   * @returns
   */
  exists(key: string) {
    return existsSync(this.locationfile(key));
  }
  /**
   * add data to table
   * @param key
   * @param value
   */
  push(key: string, value: any) {
    let content: string;
    content = typeof value + ':' + Buffer.from(value.toString()).toString('base64');
    if (Array.isArray(value)) {
      content = 'array:' + Buffer.from(JSON.stringify(value)).toString('base64');
    } else if (typeof value == 'object') {
      content = typeof value + ':' + Buffer.from(JSON.stringify(value)).toString('base64');
    } else if (typeof value == 'number') {
      if (isInt(value)) {
        content = 'number:' + Buffer.from(value.toString()).toString('base64');
      } else if (isFloat(value)) {
        content = 'float:' + Buffer.from(value.toString()).toString('base64');
      }
    }

    this.save(key, content);
  }
  private save(key: string, content: any) {
    if (!existsSync(dirname(this.locationfile(key)))) mkdirSync(dirname(this.locationfile(key)), { recursive: true });
    writeFileSync(this.locationfile(key), content);
  }
  /**
   * Edit database key
   * @param key
   * @param newValue
   * @param by
   * @returns
   */
  edit<T, K extends T>(key: string, newValue: T, by?: K) {
    if (typeof by == 'object') {
      const get = this.get(key);
      if (Array.isArray(get)) {
        /**
         * get index array, if (-1) = not found
         */
        const getIndex = get.findIndex((predicate: object) => {
          // if object by === predicate
          if (objectEquals(predicate, by)) return true;
          const keysBy = Object.keys(by);
          let resultLoop = true;
          for (let index = 0; index < keysBy.length; index++) {
            const keyBy = keysBy[index];
            // if not match, it return false (true && false)
            resultLoop = resultLoop && predicate[keyBy] === by[keyBy];
          }
          if (resultLoop) return true;
        });
        if (getIndex > -1) {
          // set new value
          get[getIndex] = newValue;
          this.push(key, get);
          return true;
        } else {
          if (this.debug) console.error('cannot find index ' + key, by);
          return false;
        }
      }
    } else if (!by) {
      this.push(key, newValue);
      return true;
    }
    return false;
  }

  /**
   * get table database by key
   * @param key key table
   * @param fallback fallback value if not exists
   * @returns
   * @example
   * const nonExists = db.exists('/data-not-exists', 'default value');
   * console.log(nonExists); // default value
   */
  get<T>(
    key: string,
    fallback?: T,
  ): null | T | string | ReturnType<typeof JSON.parse> | ReturnType<typeof parseInt> | ReturnType<typeof parseFloat> {
    const ada = this.exists(key);
    if (!ada) {
      if (fallback) return fallback;
      return null;
    }
    const content = readFileSync(this.locationfile(key)).toString().split(':');
    const value = Buffer.from(content[1], 'base64').toString('ascii');

    switch (content[0]) {
      case 'object':
      case 'array':
        return JSON.parse(value);
      case 'float':
        return parseFloat(value);
      case 'number':
        return parseInt(value);
      default:
        return value;
    }
  }

  private locationfile(key: string) {
    return path.join(this.folder, key);
  }
}

function objectEquals(x, y) {
  'use strict';

  if (x === null || x === undefined || y === null || y === undefined) {
    return x === y;
  }
  // after this just checking type of one would be enough
  if (x.constructor !== y.constructor) {
    return false;
  }
  // if they are functions, they should exactly refer to same one (because of closures)
  if (x instanceof Function) {
    return x === y;
  }
  // if they are regexps, they should exactly refer to same one (it is hard to better equality check on current ES)
  if (x instanceof RegExp) {
    return x === y;
  }
  if (x === y || x.valueOf() === y.valueOf()) {
    return true;
  }
  if (Array.isArray(x) && x.length !== y.length) {
    return false;
  }

  // if they are dates, they must had equal valueOf
  if (x instanceof Date) {
    return false;
  }

  // if they are strictly equal, they both need to be object at least
  if (!(x instanceof Object)) {
    return false;
  }
  if (!(y instanceof Object)) {
    return false;
  }

  // recursive object equality check
  const p = Object.keys(x);
  return (
    Object.keys(y).every(function (i) {
      return p.indexOf(i) !== -1;
    }) &&
    p.every(function (i) {
      return objectEquals(x[i], y[i]);
    })
  );
}

export = DBConstructor;
