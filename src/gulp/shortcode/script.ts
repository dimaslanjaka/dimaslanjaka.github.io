import fs from "fs";
import path from "path";
import "../../../packages/hexo-seo/packages/js-prototypes/src/String";

/**
 * Parse shortcode script
 * ```html
 * <!-- script /path/file.js -->
 * ```
 * @param file markdown file
 * @returns
 */
export function shortcodeScript(file: string, read: string) {
  const matchFile = read.match(/\<\!\-\-\s+?script\s+?.+?\s+?\-\-\>/gm);
  if (matchFile && matchFile.length > 0) {
    matchFile.forEach(function (readied) {
      const match = readied.match(/\<\!\-\-\s+?script\s+?(.+?)\s+?\-\-\>/);
      //console.log("matched ", match);
      if (match && match.length > 1) {
        const directFile = path.join(path.dirname(file), match[1]);
        const directFind = fs.existsSync(directFile);
        if (directFind) {
          //console.log("[shortcode script][direct] Processing shortcode " + directFile);
          const directRead = fs.readFileSync(directFile).toString();
          read = read.replace(match[0], `<script>${directRead}</script>`);
          //console.log(file.replace(process.cwd(), "") + " include script successfully");
        } else {
          //console.error("[shortcode script] " + match[1] + " not inline with " + file.replace(process.cwd(), ""));
          const rootFind = path.join(process.cwd(), match[1]);
          if (fs.existsSync(rootFind)) {
            //console.log("[shortcode script][root] Processing shortcode " + directFile);
            const rootRead = fs.readFileSync(rootFind).toString();
            read = read.replace(match[0], `<script>${rootRead}</script>`);
            //console.log("[shortcode script] " + file.replace(process.cwd(), "") + " include script successfully");
          }
        }
      }
    });
  }
  return read;
}
