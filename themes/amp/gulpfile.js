'use strict';

const gulp    = require('gulp');
const plumber = require('gulp-plumber');
const cached  = require('gulp-cached');
const progeny = require('gulp-progeny');
const sass    = require('gulp-sass');
const csscomb = require('gulp-csscomb');
const cssnano = require('gulp-cssnano');
const replace = require('gulp-replace');

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
    return gulp.src(dir.styles.src)
        .pipe(plumber())
        .pipe(cached('styles'))
        .pipe(progeny())
        .pipe(sass())
        .pipe(csscomb())
        .pipe(cssnano({autoprefixer: {browsers: AUTOPREFIXER_BROWSERS}}))
        .pipe(replace(/@charset 'UTF-8';/g, ''))
        .pipe(gulp.dest(dir.styles.dst))
}

function watch() {
  gulp.watch(dir.styles.src, styles);
}

gulp.task('watch', watch);
gulp.task('default', watch);
