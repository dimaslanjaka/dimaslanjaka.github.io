// install
// npm i gulp-cache gulp-imagemin imagemin-pngquant imagemin-zopfli imagemin-mozjpeg imagemin-giflossy -f
// node node_modules/jpegtran-bin/lib/install.js
// node node_modules/gifsicle/lib/install.js
// node node_modules/zopflipng-bin/lib/install.js
// node node_modules/mozjpeg/lib/install.js
// node node_modules/giflossy/lib/install.js
// node node_modules/pngquant-bin/lib/install.js

import cache from "gulp-cache";
import imagemin from "gulp-imagemin";
import imageminPngquant from "imagemin-pngquant";
import imageminZopfli from "imagemin-zopfli";
import imageminMozjpeg from "imagemin-mozjpeg"; //need to run 'brew install libpng'
import imageminGiflossy from "imagemin-giflossy";
import gulp from "gulp";

//compress all images
gulp.task("imagemin", function () {
  return gulp
    .src(["app/**/*.{gif,png,jpg}"])
    .pipe(
      cache(
        imagemin([
          //png
          imageminPngquant({
            speed: 1,
            quality: [0.95, 1], //lossy settings
          }),
          imageminZopfli({
            more: true,
            // iterations: 50 // very slow but more effective
          }),
          //gif
          // imagemin.gifsicle({
          //     interlaced: true,
          //     optimizationLevel: 3
          // }),
          //gif very light lossy, use only one of gifsicle or Giflossy
          imageminGiflossy({
            optimizationLevel: 3,
            optimize: 3, //keep-empty: Preserve empty transparent frames
            lossy: 2,
          }),
          //svg
          imagemin.svgo({
            plugins: [
              {
                removeViewBox: false,
              },
            ],
          }),
          //jpg lossless
          imagemin.jpegtran({
            progressive: true,
          }),
          //jpg very light lossy, use vs jpegtran
          imageminMozjpeg({
            quality: 90,
          }),
        ])
      )
    )
    .pipe(gulp.dest("dist"));
});
