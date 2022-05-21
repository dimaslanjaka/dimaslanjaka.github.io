
import color from '../../node/color';
// fix all hyperlinks endsWith .md
// [test](test.md) -> [test](test.html)
const regex = /\[([^\]]+)\]\(([^)]+(.md))\)/gim;
const logname = color['Blizzard Blue']('[replaceMD2HTML]');

/**
 * Replace hyperlinks endswith .md with .html
 * @param content body string
 * @returns
 */
export default function replaceMD2HTML(content: string) {
  if (content.isMatch(regex)) {
    content = content.replace(regex, function (wholeMatch, _index1, index2, index3) {
      // act here or after the loop...
      //console.log(index2, index3);
      const toReplace = index2;
      const replacement = index2.replace(new RegExp(index3 + '$'), '.html');
      console.log(logname, color.redBright(toReplace), '->', color.greenBright(replacement));
      //return wholeMatch.replace(index3, '.html');
      return wholeMatch.replace(toReplace, replacement);
    });
  }
  return content;
}
