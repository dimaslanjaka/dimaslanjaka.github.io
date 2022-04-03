// fix all hyperlinks endsWith .md
// [test](test.md) -> [test](test.html)
import * as fs from "fs";
const regex = /\[.*\]\(.*(.md)\)/gm;
/**
 * Replace hyperlinks endswith .md with .html
 * @param read body string
 * @returns
 */
export default function replaceMD2HTML(file: string, read: string) {
  if (regex.exec(read)) {
    read = read.replace(regex, function (wholeMatch, index1) {
      // act here or after the loop...
      //console.log(wholeMatch);
      return wholeMatch.replace(index1, ".html");
    });
  }
  return read;
}
