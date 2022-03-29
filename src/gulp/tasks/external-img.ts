import { curly } from "node-libcurl";
import { parsePostReturn, saveParsedPost } from "../../markdown/transformPosts";
import crypto from "crypto";
import { basename, dirname, join } from "path";
import { cwd } from "process";
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  PathLike,
  readFileSync,
  rmdirSync,
  unlinkSync,
  writeFileSync,
} from "fs";
import "js-prototypes";
import chalk from "chalk";
import bluebird from "bluebird";

export interface ImgLib {
  /**
   * Image information key from url img
   */
  [key: string]: ImgLibData;
}
export interface ImgLibData {
  [key: string]: any;
  /**
   * header content-type
   * @example
   * ```text
   * images/png
   * ```
   */
  type?: string;
  /**
   * full path from `hexo.config.url`
   */
  fullpath?: string;
  /**
   * url image
   */
  url?: string;
  /**
   * File Path
   */
  file?: string;
  /**
   * Folder Path
   */
  dir?: string;
  /**
   * Unreachable url, etc
   */
  err?: boolean | string | Error;
  /**
   * @see {@link parsePostReturn.fileTree}
   */
  fileTree?: parsePostReturn["fileTree"];
}

/**
 * @file {@link source/_data/external-images.json}
 * @see {@link tmp/gulp.log}
 */
let libraries: ImgLib = {};
const filesave = join(cwd(), "/source/_data/external-images.json");
export { filesave as imagesDBFile };
if (existsSync(filesave)) {
  try {
    libraries = JSON.parse(readFileSync(filesave, "utf-8"));
  } catch (error) {
    console.log(chalk.red(`JSON DATA LOST at ${new Date()}`));
  }
}

// downloaded keys
const downloadedKeys: string[] = [];

// delete log file
if (existsSync(join(cwd(), "tmp/images.log"))) unlinkSync(join(cwd(), "tmp/images.log"));

// result all images for current post
let images: string[] = [];
let HexoURL: URL;

/**
 * Download External Images To Local
 * * Store database on `${workspaceFolder}/source/_data/external-images.json`
 * @param parse parsed
 */
export default async function downloadImg(parse: parsePostReturn) {
  if (!parse) return;

  if (!HexoURL) HexoURL = new URL(parse.config.url);

  if (parse.metadata) {
    // extract photos from metadata
    const meta = parse.metadata;
    if (meta.cover) images.push(meta.cover);
    if (meta.photos && meta.photos.length) {
      meta.photos.forEach((v) => images.push(v));
    }
    if (meta.thumbnail) images.push(meta.thumbnail);
  }
  if (parse.body) {
    const regex = /\<img\s.*?\s?src\s*=\s*['|"]?([^\s'"]+).*?\>/gim;
    const str = parse.body;
    let m: RegExpExecArray;

    while ((m = regex.exec(str)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      if (m.length > 1) {
        images.push(m[1].trim());
      }
    }
  }

  const prepare = images
    // remove duplicates
    .unique()
    // filter src length > 0 and not local domain
    .filter((src) => src.length > 0 && !src.match(new RegExp("^https?://" + HexoURL.host)))
    .map((src) => {
      // fix if src startwith dynamic protocol `//`
      if (src.startsWith("//")) src = "http:" + src;
      // moved domains ['old domain', 'new domain']
      [["cdn.woorkup.com", "woorkup.com"]].forEach((domainArr) => {
        const regex = new RegExp("^https?://" + domainArr[0], "gi");
        if (src.match(regex)) src = src.replace(regex, "http://" + domainArr[1]);
      });
      // setup key with md5
      const key = md5(src);
      // setup result data
      libraries[key] = Object.assign(
        {
          type: null,
          url: src,
          err: false,
          file: null,
          dir: join(dirname(parse.fileTree.public), basename(parse.fileTree.public, ".md")),
          fileTree: parse.fileTree,
        },
        libraries[key] || {}
      );
      return {
        key: key,
        src: src,
      };
    });

  return bluebird
    .all(prepare)
    .filter((item) => item.src && item.src.trim().length > 0)
    .then(() => {
      return download((processed) => {
        return bluebird
          .all(processed)
          .each((data) => {
            if (data.fullpath) {
              if (!data.err) {
                if (parse.metadata.cover.trim() === data.url) {
                  parse.metadata.cover = data.fullpath;
                }
                if (parse.metadata.thumbnail.trim() === data.url) {
                  parse.metadata.thumbnail = data.fullpath;
                }
                if (Array.isArray(parse.metadata.photos)) {
                  parse.metadata.photos.map((img) => {
                    if (img.trim() == data.url) return data.fullpath;
                    return img;
                  });
                }
                if (parse.body) {
                  parse.body.replace(data.url, data.fullpath);
                }
              } else {
                console.error(chalk.red("[img][error]"), data);
              }
            }
            return data;
          })
          .then(() => {
            // save parsed post
            saveParsedPost(parse, parse.fileTree.public);
          });
      });
    });
}

function md5(src: string) {
  return crypto.createHash("md5").update(src).digest("hex");
}

const processed: ImgLibData[] = [];
function download(callback: (processed: ImgLibData[]) => any) {
  const src = images[0];
  const retry = () => {
    // remove first source url
    images.shift();
    if (images.length > 0) {
      // push processed result to variable
      processed.push(libraries[key]);

      // restart download with new source url
      download(callback);
    } else {
      // all sources downloaded successfully
      // run the callback
      callback(processed);
      // emptying processed data after callback
      processed.length = 0;
    }
  };
  if (!src) return retry();
  const key = md5(src);
  if (!libraries[key]) libraries[key] = { url: src };
  // [github workflow] process from `filesave`
  if (typeof process.env.GITFLOW !== "undefined") {
    if (libraries[key]) processed.push(libraries[key]);
    return retry();
  }

  // [local] process with curl
  return curly
    .get(src, {
      FOLLOWLOCATION: true,
      REFERER: "https://www.google.com",
      SSL_VERIFYPEER: 0,
      SSL_VERIFYHOST: 0,
    })
    .then((res) => {
      const data = res.data;
      const headers = res.headers;
      const statusCode = res.statusCode;
      if (statusCode === 200) {
        const contentType = headers[0]["content-type"];
        if (contentType && contentType.startsWith("image/")) {
          libraries[key].type = contentType;
          let imgtype = contentType.replace("image/", "");
          // fix svg+xml
          if (imgtype.includes("+")) {
            imgtype = imgtype.split("+")[0];
          }
          // @todo [libres] add property file
          libraries[key].file = join(libraries[key].dir, md5(src) + "." + imgtype);
          if (!existsSync(libraries[key].dir)) mkdirSync(libraries[key].dir, { recursive: true });
          // save images content
          writeFileSync(libraries[key].file, data);
          // determine full path url
          const fullpath = HexoURL;
          fullpath.pathname = libraries[key].file
            .replace(new RegExp("^" + cwd()), "")
            .replace(new RegExp("^/source/_posts/"), "/");
          libraries[key].fullpath = fullpath.toString();
          // save images log
          const logfile = join(cwd(), "tmp/images.log");
          if (!existsSync(dirname(logfile))) mkdirSync(dirname(logfile), { recursive: true });
          appendFileSync(logfile, `[img] saved ${libraries[key].file}\n`);
        }
      }
    })
    .catch((error) => {
      libraries[key].err = error.message;
    })
    .finally(() => {
      // save libraries
      writeFileSync(filesave, JSON.stringify(libraries));
      return retry();
    });
}
