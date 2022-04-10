// fix all hyperlinks endsWith .md
// [test](test.md) -> [test](test.html)
const regex = /\[.*\]\(.*(.md)\)/gm;
/**
 * Replace hyperlinks endswith .md with .html
 * @param content body string
 * @returns
 */
export default function replaceMD2HTML(content: string) {
  if (regex.exec(content)) {
    content = content.replace(regex, function (wholeMatch, index1) {
      // act here or after the loop...
      //console.log(wholeMatch);
      return wholeMatch.replace(index1, '.html');
    });
  }
  return content;
}
