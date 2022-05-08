'use strict';
// https://www.npmjs.com/package/gulp-rename
import Stream from 'stream';
import { toUnix } from 'upath';
import vinyl from 'vinyl';
import { basename, dirname, join, extname as ExtName } from '../../node/filemanager';

interface ParsedPath {
  dirname: string;
  basename: string;
  extname: string;
  fullpath: string;
}

interface Options {
  dirname?: string | undefined;
  basename?: string | undefined;
  extname?: string | undefined;
  prefix?: string | undefined;
  suffix?: string | undefined;
}

interface PluginOptions {
  multiExt?: boolean | undefined;
}

/**
 * Gulp rename
 * @param obj
 * @param options
 * @returns NodeJS.ReadWriteStream
 * @see {@link https://www.npmjs.com/package/gulp-rename}
 */
export default function gulpRename(
  obj: string | Options | ((path: ParsedPath, file: vinyl.BufferFile) => ParsedPath | void),
  options?: PluginOptions
) {
  options = options || {};

  const stream = new Stream.Transform({ objectMode: true });

  function parsePath(path: string, fullpath?: string) {
    const extname = options.multiExt ? basename(path).slice(basename(path).indexOf('.')) : ExtName(path);
    return {
      dirname: dirname(path),
      basename: basename(path, extname),
      extname: extname,
      fullpath: toUnix(fullpath),
    };
  }

  stream._transform = function (originalFile: vinyl.BufferFile, unused, callback) {
    const file = originalFile.clone({ contents: false });
    let parsedPath = parsePath(file.relative, originalFile.history[0]);
    let path: string;

    if (typeof obj === 'string' && obj !== '') {
      path = obj;
    } else if (typeof obj === 'function') {
      const newParsedPath = obj(parsedPath, file);
      if (typeof newParsedPath === 'object' && newParsedPath !== null) {
        parsedPath = newParsedPath;
      }

      path = join(parsedPath.dirname, parsedPath.basename + parsedPath.extname);
    } else if (typeof obj === 'object') {
      const dirname = 'dirname' in obj ? obj.dirname : parsedPath.dirname,
        prefix = obj.prefix || '',
        suffix = obj.suffix || '',
        basename = 'basename' in obj ? obj.basename : parsedPath.basename,
        extname = 'extname' in obj ? obj.extname : parsedPath.extname;

      path = join(dirname, prefix + basename + suffix + extname);
    } else {
      callback(new Error('Unsupported renaming parameter type supplied'), undefined);
      return;
    }

    file.path = join(file.base, path);

    // Rename sourcemap if present
    if (file.sourceMap) {
      file.sourceMap.file = file.relative;
    }

    callback(null, file);
  };

  return stream;
}

//module.exports = gulpRename;
