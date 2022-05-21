/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
'use strict';
import through from 'through2';
import { toUnix } from 'upath';
import { cwd } from '../../types/_config';

/**
 * gulp debug to print result of `gulp.src`
 * @example
 * gulp.src('src/**', { cwd: project_cwd }).pipe(gulpDebugSrc());
 */
export function gulpDebugSrc() {
  return through.obj(function (file, enc, next) {
    if (file.isNull() || file.isStream()) {
      return next();
    }
    console.log(toUnix(file.path).replace(cwd(), ''));
    next(null, file);
  });
}
export default gulpDebugSrc;
