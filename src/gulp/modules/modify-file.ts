/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
'use strict';
import through from 'through2';
import { toUnix } from 'upath';
import vinyl from 'vinyl';

/**
 * @see {@link https://www.npmjs.com/package/gulp-modify-file}
 */
export function modifyFile(fn: (content: string | Buffer, path: Buffer | string, file: vinyl) => any) {
  return through.obj(function (file, enc, cb) {
    const contents = fn(String(file.contents), toUnix(file.path), file) || file.contents;
    file.contents = !Buffer.isBuffer(contents) ? Buffer.from(contents) : contents;
    cb(null, file);
  });
}
export default modifyFile;
