// noinspection ES6PreferShortImport
import * as path from "path";
import * as fs from "fs";
import "../../../packages/hexo-seo/packages/js-prototypes/src/String";

/**
 * Process `shortcode include` to included in file, shortcode below:
 * ```html
 * <!-- include file.ext -->
 * ```
 */
function parseShortCodeInclude(file: string | fs.PathLike, str: string) {
  const regex = /\<\!\-\-\s+?include\s+?(.+?)\s+?\-\-\>/gim;
  let m: RegExpExecArray;

  while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    const allmatch = m[0];
    const bracketmatch = m[1];

    // search from file directory
    const directFile = path.join(path.dirname(file.toString()), bracketmatch);
    if (fs.existsSync(directFile)) {
      const directRead = fs.readFileSync(directFile).toString();
      str = str.replace(allmatch, directRead);
    } else {
      // search from workspace directory
      const rootFile = path.join(process.cwd(), bracketmatch);
      if (fs.existsSync(rootFile)) {
        const rootRead = fs.readFileSync(rootFile).toString();
        str = str.replace(allmatch, rootRead);
      }
    }
  }

  // repeat if still has include shortcode
  if (str.match(regex)) return parseShortCodeInclude(file, str);
  return str;
}
export default parseShortCodeInclude;
