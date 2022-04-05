import fs from 'fs';
import 'js-prototypes';

/**
 * Current date time
 * @return string ex> '2012-11-04 14:55:45'
 */
export function now() {
  return (
    new Date()
      //.toISOString()
      .toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta',
      })
      .replace(/T/, ' ') // replace T with a space
      .replace(/\..+/, '')
  ); // delete the dot and everything after
}

/**
 * Transform `now shortcode` to current formatted time
 * ```html
 * <!-- now() -->
 * ```
 * @param file
 * @see {@link now}
 */
export function shortcodeNow(file: string | fs.PathLike, read: string) {
  const rex = /<!-- now\(\) -->/gm;
  const matchRegex = read.match(rex);
  if (matchRegex && matchRegex.length > 0) {
    read = read.replace(rex, () => now());
    //console.log("[shortcode now][" + file.toString().replace(process.cwd(), "") + "] done");
  }
  return read;
}
