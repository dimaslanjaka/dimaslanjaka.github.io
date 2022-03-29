import yaml from "yaml";
import { readFileSync } from "fs";
import path from "path";
import readDir from "./readDir";
import minimatch from "minimatch";
import writeFile from "./writeFile";
import minifyHtml from "./html";
import compress_img from "./img";

const root = path.join(__dirname, "../../../");
const config = yaml.parse(readFileSync(path.join(root, "_config.yml")).toString());
const public_dir = path.join(root, config.public_dir);
//const source_dir = path.join(root, config.source_dir);
let exclude = [];
if (Array.isArray(config.skip_render)) exclude = exclude.concat(config.skip_render);
if (Array.isArray(config.exclude)) exclude = exclude.concat(config.exclude);

//console.log(config.public_dir, config.source_dir);

//compress_img([path.join(public_dir, "/**/*.{jpg,jpeg,webp,png,gif,svg}")], path.join(public_dir, "compressed"));

readDirW(require("./img3"));

// eslint-disable-next-line no-unused-vars
function readDirW(cb: (value: string[]) => string[] | PromiseLike<string[]>) {
  let logTxt = "";
  readDir(public_dir)
    .then(function (files: string[]) {
      if (Array.isArray(files)) {
        return files.filter((file) => {
          for (let i = 0; i < exclude.length; i++) {
            const ex = path.join(public_dir, exclude[i]);

            // if file match direct glob pattern
            const matchGlobPattern = minimatch(file, ex, { matchBase: true });
            //console.log(match, ex, file.replace(root, ""));
            if (matchGlobPattern) {
              logTxt += ex + " " + file.replace(root, "") + "\n";
              return false;
            }

            // if pattern isn't glob
            if (!ex.includes("*")) {
              // test path start with substring
              const startStr = ex.replace(public_dir, "");
              const Str = file.replace(public_dir, "");
              const matchStartStr = Str.startsWith(startStr);
              if (matchStartStr) {
                //console.log(Str, startStr, matchStartStr);
                logTxt += ex + " " + file.replace(root, "") + "\n";
                return false;
              }
            }
          }
          //console.log(minimatch(file, exclude[0], { matchBase: true }), file, exclude[0]);
          return true;
        });
      }
    })
    .then(cb);
}
