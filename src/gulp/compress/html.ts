import minimatch from "minimatch";
import * as htmlMin from "html-minifier-terser";
import * as htmlMin2 from "html-minifier";
import { readFileSync } from "fs";
import writeFile from "./writeFile";
import path from "path";

const once = false;

export default function (files: string[]) {
  // Filter routes to select all html files.
  const routes = files.filter(function (path0) {
    return minimatch(path0, "**/*.{htm,html}", { nocase: true });
  });

  routes.forEach((file) => {
    const html = readFileSync(file).toString();
    htmlMin
      .minify(html)
      .then((minifiedHtml) => {
        const saved = html.length === 0 ? 0 : (((html.length - minifiedHtml.length) / html.length) * 100).toFixed(2);
        writeFile(file, minifiedHtml);
      })
      .catch((err) => {
        if (err) {
          const errFile = path.join("build/gulp/html/", file.replace(process.cwd(), ""));
          let errTxt = "";
          errTxt += file + "\n\n";
          errTxt += err.message;
          writeFile(errFile, errTxt);
        }
      });
  });
}
