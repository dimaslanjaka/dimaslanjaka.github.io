import { toUnix } from 'upath';
import { write } from '../node/filemanager';
import { md5 } from '../node/md5-file';
import { tmp } from '../types/_config';

export const EOL = '\n';

/**
 * Error markdown logger
 */
export default class ErrorMarkdown {
  result: {
    [key: string]: any;
  } = {};
  name: string;
  message: string;
  stack?: string;
  filelog: string;

  constructor(obj?: Record<string, unknown> | string, hash?: string) {
    // assign the error class name in your custom error (as a shortcut)
    this.name = this.constructor.name;

    // capturing the stack trace keeps the reference to your error class
    Error.captureStackTrace(this, this.constructor);
    const e = new Error();
    const frame = e.stack.split('\n')[2]; // change to 3 for grandparent func
    //const lineNumber = frame.split(':').reverse()[1];
    //const functionName = frame.split(' ')[5];
    this.filelog = tmp('errors', md5(hash ? hash : toUnix(frame))) + '.md';
    this.message = 'error messages log at ' + this.filelog;

    if (typeof obj == 'object') {
      if (!Array.isArray(obj)) {
        for (const key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            this.result[key] = value;
          }
        }
      }
      this.writeLog();
    }
    return this;
  }
  /**
   * add log property
   * @param k
   * @param v
   * @returns
   */
  add(k: string | number, v: any) {
    this.result[k] = v;
    this.writeLog();
    return this;
  }
  /**
   * log writter
   * @returns
   */
  writeLog() {
    write(this.filelog, this.toString());
    return this;
  }
  getFileLog() {
    return this.filelog;
  }
  /**
   * Remove property log
   * @param k
   * @returns
   */
  remove(k: string | number) {
    delete this.result[k];
    this.writeLog();
    return this;
  }
  toString() {
    const object = this.result;
    const separator = EOL + '/'.repeat(10) + EOL;
    let result = '';
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        let value = object[key];
        if (typeof value == 'object') {
          value = '```json\n' + JSON.stringify(value, null, 2) + '\n```\n';
        }
        result += separator + key + separator + EOL.repeat(2) + value;
      }
    }
    return result;
  }
}
