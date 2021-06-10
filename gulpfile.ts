// noinspection ES6PreferShortImport

import * as gulp from "gulp";
import markdown from "gulp-markdown";
import ngrok from "./src/ngrok";
import webserver from "gulp-webserver";
import { create, stream } from "browser-sync";

const PORT = 3000;

gulp.task("ngrok", function () {
  return ngrok(PORT, "1Szs4cJp7MoUlFPT3nyRjD5P05v_3BREWhqf8z2NdcNHMneUm");
});

function gWeb() {
  return gulp.src("./build/_posts/").pipe(
    webserver({
      host: "localhost",
      port: PORT,
      livereload: {
        enable: true, // need this set to true to enable livereload
        filter: function (fileName) {
          return !fileName.match(/.map$/);
        },
      },
      directoryListing: true,
      open: true,
      //fallback: "./dist/index.html",
    })
  );
}

// Static server
function browserSyncStart() {
  create().init({
    server: {
      baseDir: "./build/_posts",
      directory: true,
    },
    port: PORT,
    host: "localhost",
  });
}

gulp.task("md", function () {
  let md = gulp.src("src-posts/**/*.md").pipe(markdown());
  md.pipe(gulp.dest("build/_posts"));
  md.pipe(stream());
  return md;
});

gulp.task("md-watch", function () {
  gulp.watch("src-posts/**/*.md", gulp.series("md"));
});

gulp.task("webserver-browser-sync", gulp.parallel("ngrok", browserSyncStart, "md-watch"));
gulp.task("webserver-gulp", gulp.series(gWeb));
gulp.task("default", gulp.series("webserver-browser-sync"));
