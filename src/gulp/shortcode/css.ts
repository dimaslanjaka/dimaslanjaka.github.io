import fs from 'fs';
import path from 'path';
import 'js-prototypes';

/**
 * Parse shortcode css
 * ```html
 * <!-- css /path/file.css -->
 * ```
 * @param file file path
 * @param read body content
 * @returns
 */
export function shortcodeCss(file: string, read: string) {
  const matchFile = read.match(/\<\!\-\-\s+?css\s+?.+?\s+?\-\-\>/gm);
  if (matchFile && matchFile.length > 0) {
    matchFile.forEach(function (readied) {
      const match = readied.match(/\<\!\-\-\s+?css\s+?(.+?)\s+?\-\-\>/);
      //console.log("matched ", match);
      if (match && match.length > 1) {
        const directFile = path.join(path.dirname(file), match[1]);
        const directFind = fs.existsSync(directFile);
        if (directFind) {
          //console.log("[direct] Processing shortcode " + directFile);
          const directRead = fs.readFileSync(directFile).toString();
          read = read.replace(match[0], `<style>${directRead}</style>`);
          //fs.writeFileSync(file, directReplace);
          //console.log("[shortcode css] " + file.replace(process.cwd(), "") + " include style successfully");
        } else {
          //console.error("[shortcode css] " + match[1] + " not inline with " + file.replace(process.cwd(), ""));
          const rootFind = path.join(process.cwd(), match[1]);
          if (fs.existsSync(rootFind)) {
            //console.log("[shortcode css][root] Processing shortcode " + directFile);
            const rootRead = fs.readFileSync(rootFind).toString();
            read = read.replace(match[0], `<style>${rootRead}</style>`);
            //fs.writeFileSync(file, rootReplace);
            //console.log("[shortcode css] " + file.replace(process.cwd(), "") + " include style successfully");
          }
        }
      }
    });
  }
  return read;
}
