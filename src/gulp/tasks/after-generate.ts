import { join } from "path";
import { parse as parseHTML } from "node-html-parser";
import { Hexo_Config } from "../../../types/_config";
import { loopDir } from "../utils";
import "js-prototypes";
import { readFileSync, writeFileSync } from "fs";
import bluebird from "bluebird";
import { cwd } from "process";

export default function afterGenerate(config: Hexo_Config) {
  // iterate public_dir of _config.yml (hexo generate)
  const public_dir = join(cwd(), config.public_dir);
  const loop = loopDir(public_dir);
  const hexoURL = new URL(config.url);
  const exclude = [
    ...config.seo.links.exclude,
    hexoURL.host,
    "www.webmanajemen.com",
    "https://github.com/dimaslanjaka",
    "/dimaslanjaka1",
    "dimaslanjaka.github.io",
  ].uniqueStringArray();

  return bluebird.all(loop).each((file) => {
    const isHtml = file.endsWith(".html");
    if (isHtml) {
      const doc = parseHTML(readFileSync(file, "utf-8"));
      const html = doc.querySelector("html");
      if (html && !html.hasAttribute("lang")) html.setAttribute("lang", "en");

      // safelinkify
      const hrefs = doc.querySelectorAll("a");
      if (hrefs.length) {
        for (let i = 0; i < hrefs.length; i++) {
          const element = hrefs[i];
          let href = element.getAttribute("href");
          // skip `/` homepage links
          if (href && href.length > 2) {
            if (href.startsWith("//")) href = config.url + href;
            // skip hash and javascript anchors
            if (!href.trim().match(/^(#|javascript:)/i) && href.trim().length) {
              // only get external links
              if (href.trim().match(/^https?:\/\//)) {
                const matchHost = exclude.includes(new URL(href).host);
                const matchHref = exclude.includes(href);
                if (!matchHost) {
                  element.setAttribute("rel", "nofollow noopener noreferer");
                  element.setAttribute("target", "_blank");
                }
                if (!matchHost && !matchHref) {
                  let safelink = "/page/safelink.html?url=" + Buffer.from(encodeURIComponent(href)).toString("base64");
                  element.setAttribute("href", safelink);
                }
              }
            }
          }
        }
      }
      //const memoryUsage = util.inspect(process.memoryUsage()).replace(/\s+/gm, " ");
      //fs.appendFileSync(__dirname + "/tmp/inspect.log", memoryUsage + "\n");

      // save modified html
      let result = doc.toString();
      writeFileSync(file, result);
    }
  });
}
