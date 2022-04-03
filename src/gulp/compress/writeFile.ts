import * as fs from "fs";
import { dirname } from "path";

/**
 * Write file recursive
 * @param file
 * @param content
 * @param append
 */
export default function (file, content, append = false) {
  if (!fs.existsSync(dirname(file))) {
    fs.mkdirSync(dirname(file), { recursive: true });
  }
  if (append) {
    return fs.appendFileSync(file, content);
  }
  return fs.writeFileSync(file, content);
}
