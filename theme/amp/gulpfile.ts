'use strict';

import { src as _src, dest, watch as _watch, task } from 'gulp';
import plumber from 'gulp-plumber';
import cached from 'gulp-cached';
import progeny from 'gulp-progeny';
import sass from 'gulp-sass';
import csscomb from 'gulp-csscomb';
import cssnano from 'gulp-cssnano';
import replace from 'gulp-replace';

const dir = {
    styles : {
        src : 'source/scss/*.scss',
        dst : 'source/css'
    }
}

const AUTOPREFIXER_BROWSERS = [
    '>0.25%',
    'not ie 11',
    'not op_mini all'
]

// Compile SASS to CSS
function styles() {
    return _src(dir.styles.src)
        .pipe(plumber())
        .pipe(cached('styles'))
        .pipe(progeny())
        .pipe(sass())
        .pipe(csscomb())
        .pipe(cssnano({autoprefixer: {browsers: AUTOPREFIXER_BROWSERS}}))
        .pipe(replace(/@charset 'UTF-8';/g, ''))
        .pipe(dest(dir.styles.dst))
}

function watch() {
  _watch(dir.styles.src, styles);
}

task('watch', watch);
task('default', styles);
