import fs from "fs";
import path from "path";
const { is } = require("../js/is");
let options = {
  dir: path.join(process.cwd(), "build/storage"),
};

type OptionsFlags<Type> = {
  // eslint-disable-next-line no-unused-vars
  [Property in keyof Type]: boolean;
};

type All = string | null | object | Array<any> | number | boolean | undefined | unknown;

class Storage {
  private static fix() {
    if (!fs.existsSync(options.dir)) fs.mkdirSync(options.dir, { recursive: true });
  }

  /**
   * Set storage item
   * @param key
   * @param value
   */
  set(key: string, value: any) {
    Storage.fix();
    let file = path.join(options.dir, `${key}.json`);
    let content;
    if (typeof value == "object" || Array.isArray(value)) {
      content = JSON.stringify(value, null, 4);
    } else if (typeof value == "string") {
      content = value;
    } else {
      content = String(value);
    }
    fs.writeFileSync(file, content);
  }

  /**
   * Get storage item
   * @param key
   * @param fallback
   */
  get(key: string, fallback?: All): OptionsFlags<All> {
    Storage.fix();
    let file = path.join(options.dir, `${key}.json`);
    let content;
    if (fs.existsSync(file)) {
      let str = fs.readFileSync(file, { encoding: "utf-8" });
      if (is.json(str)) {
        content = JSON.parse(str);
      } else {
        content = str;
      }
      if (content.length == 0) {
        content = fallback;
      }
    } else {
      content = fallback;
    }
    return content;
  }
}

export default Storage;
