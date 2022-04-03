import 'js-prototypes';
import chalk from 'chalk';
import { cwd, dirname, existsSync, join, readFileSync } from '../../node/filemanager';

const logname = chalk.bgBlue.whiteBright('[include]');

/**
 * Process `shortcode include` to included in file, shortcode below:
 * ```html
 * <!-- include file.ext -->
 * ```
 */
function parseShortCodeInclude(file: string, str: string) {
  const regex = /<!--\s+?include\s+?(.+?)\s+?-->/gim;
  let m: RegExpExecArray;
  let found = false;

  while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }

    const allmatch = m[0];
    const bracketmatch = m[1];

    // search from file directory
    const directFile = join(dirname(file.toString()), bracketmatch);
    //const directFile2 = join ()
    if (existsSync(directFile)) {
      console.info(`${logname} found from direct ${directFile}`);
      const directRead = readFileSync(directFile).toString();
      str = str.replace(allmatch, directRead);
      found = true;
    } else {
      // search from workspace directory
      const rootFile = join(cwd(), bracketmatch);
      if (existsSync(rootFile)) {
        console.info(`${logname} found from direct ${rootFile}`);
        const rootRead = readFileSync(rootFile).toString();
        str = str.replace(allmatch, rootRead);
        found = true;
      } else {
        console.error(chalk.redBright('[include][error]'), "couldn't find any file from root", rootFile);
        console.error(chalk.redBright('[include][error]'), "couldn't find any file from direct", directFile);
        console.log(chalk.redBright('[include][error]'), chalk.magenta('1'), dirname(file.toString()))
        console.log(chalk.redBright('[include][error]'), chalk.magenta('2'), bracketmatch)
        console.log(chalk.redBright('[include][error]'), chalk.magenta('3'), join(dirname(file), bracketmatch))
      }
    }
  }

  // match shortcode and found otherwise repeat
  if (found && str.match(regex)) return parseShortCodeInclude(file, str);
  return str;
}
export default parseShortCodeInclude;
