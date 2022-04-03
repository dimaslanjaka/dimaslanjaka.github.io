import PluginError from "plugin-error";
import htmlmin from "html-minifier-terser";
import through from "through2";
import Promise from "bluebird";

export = (options: htmlmin.Options) => {
  return through.obj(function (file, enc, next) {
    if (file.isNull()) {
      next(null, file);
      return;
    }

    const minify = (
      buf: Buffer,
      _: any,
      cb: {
        (err?: any, data?: any): void;
        (arg0: any, arg1: Buffer): void;
        (err?: any, data?: any): void;
        (err?: any, data?: any): void;
      }
    ) => {
      return Promise.resolve(htmlmin.minify(buf.toString(), options))
        .then((html) => {
          const contents = Buffer.from(html);
          if (next === cb) {
            file.contents = contents;
            cb(null, file);
            return;
          }
          cb(null, contents);
          next(null, file);
        })
        .catch((err) => {
          const opts = Object.assign({}, options, { fileName: file.path });
          const error = new PluginError("gulp-html-minifier-terser", err, opts);
          if (next !== cb) {
            next(error);
            return;
          }
          cb(error);
        });
    };

    if (file.isStream()) {
      file.contents = file.contents.pipe(through(minify));
    } else {
      minify(file.contents, null, next);
    }
  });
};
