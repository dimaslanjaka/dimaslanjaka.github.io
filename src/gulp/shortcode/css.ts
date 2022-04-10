import 'js-prototypes';
import chalk from 'chalk';
import { cwd, dirname, existsSync, join, readFileSync } from '../../node/filemanager';
import { root } from '../../types/_config';

const logname = chalk.blue('[css]');
/**
 * Parse shortcode css
 * ```html
 * <!-- css /path/file.css -->
 * ```
 * @param file file path
 * @param str body content
 * @returns
 */
export function shortcodeCss(file: string, str: string) {
  const log = [logname];
  const regex = /<!--\s+?css\s+?(.+?)\s+?-->/gim;
  const execs = Array.from(str.matchAll(regex));
  execs.forEach((m) => {
    const htmlTag = m[0];
    const includefile = m[1];
    const dirs = {
      directFile: join(dirname(file.toString()), includefile),
      cwdFile: join(cwd(), includefile),
      rootFile: join(root, includefile),
    };
    for (const key in dirs) {
      if (Object.prototype.hasOwnProperty.call(dirs, key)) {
        const filepath = dirs[key];
        if (existsSync(filepath)) {
          console.log(...log, chalk.greenBright(`[${key}]`), file);
          const read = readFileSync(filepath, 'utf-8');
          str = str.replace(htmlTag, () => `<style>${read}</style>`);
          //console.log('match tag', str.match(new RegExp(htmlTag, 'm'))[0]);
          //write(tmp('shortcode', 'script.txt'), mod).then(console.log);
          break;
        }
      }
    }
  });
  return str;
}
