/// <reference types="node" />
/// <reference types="hexo/dist/hexo/router" />
export declare const customPath: {
    join: (...str: string[]) => string;
    dirname: (str: string) => string;
    toUnix: (str: string) => string;
};
export declare const gulpDomPath: {
    join: (...str: string[]) => string;
    dirname: (str: string) => string;
    toUnix: (str: string) => string;
};
/**
 * Callback/Mutator
 * * this: jsdom
 * * path: current file.path
 */
export type GulpDomCallback = (/** jsdom bind */ this: Document, /** current file path */ path: string) => any;
/**
 * gulp-dom
 * @param mutator callback
 * @returns
 * @example
 * const gulp = require('gulp');
    gulp.task('html', function() {
        return gulp.src('./src/index.html')
            .pipe(gulpDom(function(){
                return this.querySelectorAll('body')[0].setAttribute('data-version', '1.0');
            }))
            .pipe(gulp.dest('./public/'));
    });
 */
export declare function gulpDom(mutator: GulpDomCallback): import("stream").Transform;
export default gulpDom;
