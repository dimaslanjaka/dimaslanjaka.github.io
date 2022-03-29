'use strict';
// https://www.npmjs.com/package/gulp-rename
import Stream from 'stream';
import Path from 'path';

interface ParsedPath {
  dirname: string;
  basename: string;
  extname: string;
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

// return NodeJS.ReadWriteStream
export default function gulpRename(obj: string | Options | ((path: ParsedPath, file: File) => ParsedPath | void), options?: PluginOptions) {
  options = options || {};

  const stream = new Stream.Transform({ objectMode: true });

  function parsePath(path: string) {
    const extname = options.multiExt ? Path.basename(path).slice(Path.basename(path).indexOf('.')) : Path.extname(path);
    return {
      dirname: Path.dirname(path),
      basename: Path.basename(path, extname),
      extname: extname,
    };
  }

  stream._transform = function (originalFile, unused, callback) {
    const file = originalFile.clone({ contents: false });
    let parsedPath = parsePath(file.relative);
    let path: string;

    if (typeof obj === 'string' && obj !== '') {
      path = obj;
    } else if (typeof obj === 'function') {
      const newParsedPath = obj(parsedPath, file);
      if (typeof newParsedPath === 'object' && newParsedPath !== null) {
        parsedPath = newParsedPath;
      }

      path = Path.join(parsedPath.dirname, parsedPath.basename + parsedPath.extname);
    } else if (typeof obj === 'object' && obj !== undefined && obj !== null) {
      const dirname = 'dirname' in obj ? obj.dirname : parsedPath.dirname,
        prefix = obj.prefix || '',
        suffix = obj.suffix || '',
        basename = 'basename' in obj ? obj.basename : parsedPath.basename,
        extname = 'extname' in obj ? obj.extname : parsedPath.extname;

      path = Path.join(dirname, prefix + basename + suffix + extname);
    } else {
      callback(new Error('Unsupported renaming parameter type supplied'), undefined);
      return;
    }

    file.path = Path.join(file.base, path);

    // Rename sourcemap if present
    if (file.sourceMap) {
      file.sourceMap.file = file.relative;
    }

    callback(null, file);
  };

  return stream;
}

//module.exports = gulpRename;
