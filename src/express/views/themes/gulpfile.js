const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const imagemin = require('gulp-imagemin');
const minify = require('gulp-minify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const cssAddonsPath = './css/modules/';

gulp.task('css-compile-modules', (done) => {
  gulp.src('scss/**/modules/**/*.scss')
    .pipe(sass({
      outputStyle: 'nested'
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename({
      dirname: cssAddonsPath
    }))
    .pipe(gulp.dest('./dist/'));

  done();
});

// CSS Tasks
gulp.task('css-compile', gulp.series('css-compile-modules', () => {
  return gulp.src(['scss/*.scss', 'fontawesome/scss/**/*.scss'])
    .pipe(sass({
      outputStyle: 'nested'
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/css/'));
}));

gulp.task('css-minify-modules', () => {
  return gulp.src(['./dist/css/modules/*.css', '!./dist/css/modules/*.min.css'])
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/css/modules'));
});

gulp.task('css-minify', gulp.series('css-minify-modules', () => {
  return gulp.src(['./dist/css/*.css', '!./dist/css/*.min.css', '!./dist/css/bootstrap.css'])
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/css'));

}));

// JavaScript Tasks
gulp.task('js-lite-build', () => {

  const pluginsLite = getLiteJSModules();

  return gulp.src(pluginsLite.modules)
    .pipe(concat('mdb.lite.js'))
    .pipe(gulp.dest('./dist/js/'));

});

gulp.task('js-build', gulp.series('js-lite-build', () => {

  const plugins = getJSModules();

  return gulp.src(plugins.modules)
    .pipe(concat('mdb.js'))
    .pipe(gulp.dest('./dist/js/'));

}));

gulp.task('js-lite-minify', () => {
  return gulp.src(['./dist/js/mdb.lite.js'])
    .pipe(minify({
      ext: {
        // src:'.js',
        min: '.min.js'
      },
      noSource: true,
    }))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('js-minify', gulp.series('js-lite-minify', () => {
  return gulp.src(['./dist/js/mdb.js'])
    .pipe(minify({
      ext: {
        // src:'.js',
        min: '.min.js'
      },
      noSource: true
    }))
    .pipe(gulp.dest('./dist/js'));
}));

// Image Compression
gulp.task('img-compression', () => {
  return gulp.src('./img/*')
    .pipe(imagemin([
      imagemin.gifsicle({
        interlaced: true
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.optipng({
        optimizationLevel: 5
      }),
      imagemin.svgo({
        plugins: [{
          removeViewBox: true
        }, {
          cleanupIDs: false
        }
        ]
      })
    ]))
    .pipe(gulp.dest('./dist/img'));
});

// Live Server
gulp.task('live-server', () => {
  browserSync.init({
    server: {
      baseDir: './dist',
      directory: true
    },
    notify: false
  });

  gulp.watch('**/*', {
    cwd: './dist/'
  }, browserSync.reload);
});

// Watch on everything
gulp.task('mdb-go', (done) => {

  browserSync.init({
    server: {
      baseDir: './dist',
      directory: true
    },
    notify: false
  });

  gulp.watch('scss/**/*.scss', gulp.series('css-compile', (done) => {
    browserSync.reload();
    done();
  }));

  gulp.watch(['dist/css/*.css', '!dist/css/*.min.css'], gulp.series('css-minify', (done) => {
    browserSync.reload();
    done();
  }));

  gulp.watch('js/**/*.js', gulp.series('js-build', (done) => {
    browserSync.reload();
    done();
  }));

  gulp.watch(['dist/js/*.js', '!dist/js/*.min.js'], gulp.series('js-minify', () => {
    browserSync.reload();
    done();
  }));

  // gulp.watch('**/*', {
  //   cwd: './img/'
  // }, ['img-compression']);

  gulp.watch('**/*.html', (done) => {
    browserSync.reload();
    done();
  });

  done();
});

function getJSModules() {
  delete require.cache[require.resolve('./js/modules.js')];
  return require('./js/modules');
}

function getLiteJSModules() {
  delete require.cache[require.resolve('./js/modules.lite.js')];
  return require('./js/modules.lite.js');
}
