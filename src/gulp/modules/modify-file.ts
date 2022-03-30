/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
'use strict';
import Vinyl from 'vinyl';
import through from 'through2';

/**
 * @see {@link https://www.npmjs.com/package/gulp-modify-file}
 */
export default function modifyFile(fn: (content: string | Buffer, path: Buffer | string, file: Vinyl) => any) {
  return through.obj(function (file, enc, cb) {
    const contents = fn(String(file.contents), file.path, file) || file.contents;

    if (Buffer.isBuffer(file)) {
      (<any>file).contents = Buffer.from(contents);
    }

    cb(null, file);
  });
}
