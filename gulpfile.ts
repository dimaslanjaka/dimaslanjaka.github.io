import gulp from "gulp";
import "./src/gulp/tasks/article-copy";
import { post_generated_dir, post_public_dir } from "./src/types/_config";
import fs from "fs";

gulp.task("default", gulp.series("copy"));
gulp.task("clean", (done) => {
  return fs.rm(post_generated_dir, { recursive: true }, (e) => {
    if (e) console.error(e);
    return fs.rm(post_public_dir, { recursive: true }, done);
  });
});
