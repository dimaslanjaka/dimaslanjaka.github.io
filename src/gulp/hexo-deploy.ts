import { exec } from "child_process";
import * as config from "./hexo-config";

exec("git init", { cwd: config.public_dir }, (err, stdout, stderr) => {
  exec(
    "git remote set-url origin git@github.com:dimaslanjaka/dimaslanjaka.github.io.git",
    { cwd: config.public_dir },
    (err, stdout, stderr) => {
      exec("git add .", { cwd: config.public_dir }, (err, stdout, stderr) => {
        exec("git commit -m 'update'", { cwd: config.public_dir }, (err, stdout, stderr) => {
          exec("git push -u origin master", { cwd: config.public_dir }, (err, stdout, stderr) => {
            console.log(stderr);
          });
        });
      });
    }
  );
});
