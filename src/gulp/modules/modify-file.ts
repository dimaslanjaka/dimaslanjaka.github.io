/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
'use strict';
import through, { FileObject } from 'through2';

/**
 * @see {@link https://www.npmjs.com/package/gulp-modify-file}
 */
export default function modifyFile(fn: (content: string | Buffer, path: Buffer | string, file: FileObject) => any) {
  return through.obj(function (file, enc, cb) {
    const contents = fn(String(file.contents), file.path, file) || file.contents;
    file.contents = !Buffer.isBuffer(contents) ? Buffer.from(contents) : contents;
    cb(null, file);
  });
}
