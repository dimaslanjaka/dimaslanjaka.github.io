// noinspection ES6PreferShortImport

import * as gulp from "gulp";
import * as path from "path";
import transformPosts, { transformPostBody } from "./src/markdown/transformPosts";
import * as fs from "fs";

const prodPostDir = path.join(__dirname, "source/_posts");
const devPostDir = path.join(__dirname, "build/_posts");

function emptyDir(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      let filex = path.join(directory, file);
      fs.unlink(filex, (err) => {
        if (err) throw err;
      });
    }
  });
}

gulp.task("article:dev", function (done) {
  emptyDir(devPostDir);
  transformPostBody("build/_posts");
  done();
});

gulp.task("article:dist", function (done) {
  emptyDir(prodPostDir);
  transformPosts("source/_posts");
  done();
});

gulp.task("default", gulp.series("article:dev", "article:dist"));
