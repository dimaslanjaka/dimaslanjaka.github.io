import filemanager from "../node/filemanager";
import path, { join } from "path";
import * as fs from "fs";
import toHtml from "./toHtml";
import yaml from "yaml";
import notranslate from "../translator/notranslate";
import crypto from "crypto";
import { readFileSync } from "fs";
import chalk from "chalk";
import YAML from "yaml";
import { Hexo_Config } from "../../types/_config";

export interface LooseObject {
  [key: string]: any;
}

export type parsePostReturn = LooseObject & {
  /**
   * Article metadata
   */
  metadataString?: string;
  fileTree?: {
    /**
     * post file from src-posts
     */
    source?: string;
    /**
     * post file from public_dir _config.yml
     */
    public?: string;
  };
  /**
   * _config.yml
   */
  config?: Hexo_Config | null;
  /**
   * Article metadata
   */
  metadata?: LooseObject & {
    /**
     * Article language code
     */
    lang: string;
    /**
     * Article title
     */
    title: string;
    subtitle: string;
    uuid?: string;
    updated?: string;
    date: string;
    description?: string;
    tags: string[];
    category: string[];
    photos?: string[];
    cover?: string;
    thumbnail?: string;
  };
  /**
   * Article body
   */
  body?: string;
};

/**
 * UUID V4 Generator
 * @param fromString generate based on string (unique based on this string)
 * @returns ex: a2d6fee8-369b-bebc-3d8e-b8ff2faf40d3
 */
export function uuidv4(fromString?: string) {
  let original = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"; // length 8-4-4-4-12
  if (fromString) {
    const hash = md5(fromString);
    original = original
      .replace(/^xxxxxxxx-xxxx/, hash.slice(0, 8) + "-" + hash.slice(9, 13))
      .replace(/xxx-xxxxxxxxxxxx$/, hash.slice(14, 17) + "-" + hash.slice(18, 30));
  }
  return original.replace(/[xy]/g, function (c) {
    if (!fromString) {
      const r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    } else {
      const r = 0;
      let v = r | 0x8;
      if (c == "y") v = (r & 0x3) | 0x8;
      return v.toString(16);
    }
  });
}

/**
 * PHP MD5 Equivalent
 * @param data
 * @returns
 */
export function md5(data: string) {
  return crypto.createHash("md5").update(data).digest("hex");
}

/**
 * Parse Hexo markdown post (structured with yaml and universal markdown blocks)
 * * return metadata {string & object} and body
 * * return null == failed
 * @param text file or string text
 */
export function parsePost(text: string): parsePostReturn | null {
  ///const regex = /---([\s\S]*?)---/;
  const regex = /^---([\s\S]*?)---[\n\s\S]\n/gim;
  let m: RegExpExecArray | { [Symbol.replace](string: string, replaceValue: string): string }[];
  /**
   * source file if `text` is file
   */
  const originalArg = text;
  const isFile = fs.existsSync(text) && fs.statSync(text).isFile();
  if (isFile) {
    text = readFileSync(text).toString();
  }

  // determine and parse _config.yml
  let config_file: string;
  let config_yml: Hexo_Config;
  if (fs.existsSync(join(process.cwd(), "_config.yml"))) {
    config_file = join(process.cwd(), "_config.yml");
  }
  if (config_file) {
    config_yml = YAML.parse(readFileSync(config_file, "utf-8"));
  }

  try {
    while ((m = regex.exec(text)) !== null) {
      //if (originalArg.includes("Pets")) console.log(m);
      if (m[0]) {
        let meta: parsePostReturn["metadata"] = yaml.parse(m[1]); // header post
        //if (originalArg.includes("Pets")) console.log(meta);
        if (!meta.uuid) {
          let uid = m[0];
          if (meta.title && meta.webtitle) {
            uid = meta.title + meta.webtitle;
          } else if (meta.subtitle) {
            uid = meta.subtitle;
          } else if (meta.excerpt) {
            uid = meta.excerpt;
          } else if (meta.title) {
            uid = meta.title;
          }
          meta.uuid = uuidv4(uid);
          meta = Object.keys(meta)
            .sort()
            .reduce(
              (acc, key) => ({
                ...acc,
                [key]: meta[key],
              }),
              {}
            ) as parsePostReturn["metadata"];
        }
        // default category and tags
        if (!meta.category) meta.category = ["Uncategorized"];
        if (!meta.category.length) meta.category.push("Uncategorized");
        if (!meta.tags) meta.tags = [];

        // default excerpt/description
        if (meta.subtitle) {
          meta.excerpt = meta.subtitle;
          meta.description = meta.subtitle;
        }
        if (meta.description && !meta.excerpt) {
          meta.excerpt = meta.description;
        }
        if (meta.excerpt && !meta.description) {
          meta.description = meta.excerpt;
        }

        let result: parsePostReturn = {
          metadataString: m[0],
          metadata: meta,
          body: fixPostBody(text.replace(m[0], "")),
          config: config_yml,
        };
        // put fileTree
        if (isFile) {
          result.fileTree = {
            source: originalArg.replace("/source/_posts/", "/src-posts/"),
            public: originalArg.replace("/src-posts", "/source/_posts/"),
          };
          //console.log(result.fileTree);
        }
        return result;
      }
    }
  } catch (e) {
    //if (debug) console.error(e.message, originalArg);
    console.error(
      "fail parse markdown post",
      chalk.redBright(originalArg),
      "original file of",
      chalk.magentaBright(originalArg.replace("/source/_posts/", "/src-posts/"))
    );
  }
  return null;
}

/**
 * Fix post body
 * * remove *.wp.com cdn
 * @param str
 */
export function fixPostBody(str: string) {
  // remote i2.wp.com i1.wp.com etc
  const regex = /https?:\/\/i\d{1,4}.wp.com\//gm;
  str = str.replace(regex, "https://res.cloudinary.com/practicaldev/image/fetch/");
  // add notranslate
  if (!str.includes('document.querySelectorAll("pre,code")')) {
    let notranslate = `<script>document.querySelectorAll("pre,code");
  pretext.forEach(function (el) {
    el.classList.toggle("notranslate", true);
  });</script>`;
    str = str.replace(notranslate, "");
  }
  return str;
}

/**
 * Save Parsed Hexo markdown post
 * @param parsed return {@link parsePost}
 * @param file file path to save
 */
export function saveParsedPost(parsed: parsePostReturn, file: string) {
  const rebuildPost = `---\n${yaml.stringify(parsed.metadata)}---\n\n${parsed.body}`;
  if (!fs.existsSync(path.dirname(file))) fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, rebuildPost);
}

/**
 * Transform only post body without metadata
 * @param outputDir custom output, default source/_posts
 * @param callback
 */
export function transformPostBody(
  outputDir = "source/_posts",
  // eslint-disable-next-line no-unused-vars
  callback?: (filename: string, filedir: string, filepath: string) => any
) {
  filemanager.readdir(path.join(__dirname, "../../src-posts"), function (err, results) {
    if (!err) {
      results.forEach(function (file) {
        const read = fs.readFileSync(file, { encoding: "utf-8" });
        const filename = path.basename(file, ".md") + ".html";
        const filedir = path.normalize(path.dirname(file).replace("src-posts", outputDir));
        const filepath = path.join(filedir, filename);
        //console.log(filename, filedir, filepath);
        if (typeof callback == "function") {
          callback(filename, filedir, filepath);
        }
        const parse = parsePost(read);
        //console.log(parse.metadata); //<--- debug
        if (parse && parse.body) {
          const html = toHtml(parse.body);
          const filter_notranslate = notranslate(html);
          filemanager.write(filepath, String(filter_notranslate));
        }
      });
    }
  });
}

/**
 * Transform entire post
 * @param outputDir custom output, default source/_posts
 */
export default function transformPosts(outputDir = "source/_posts") {
  filemanager.readdir(path.join(__dirname, "../../src-posts"), function (err, results) {
    if (!err) {
      results.forEach(function (file) {
        const read = fs.readFileSync(file, { encoding: "utf-8" });
        const filename = path.basename(file);
        const filedir = path.normalize(path.dirname(file).replace("src-posts", outputDir));
        const filepath = path.join(filedir, filename);
        const parse = parsePost(read);
        if (parse !== null && parse.body) {
          const html = toHtml(parse.body);
          const filter_notranslate = notranslate(html);
          fs.writeFileSync(filepath, `${parse.metadataString}\n\n${filter_notranslate}`);
        }
      });
    }
  });
}
