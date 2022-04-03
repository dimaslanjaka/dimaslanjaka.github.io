/* eslint-disable @typescript-eslint/no-unused-vars */
//import "./packages/hexo-seo/packages/js-prototypes/src/globals";
//import "./src/node/console";
import "js-prototypes";
import * as gulp from "gulp";
import { hashElement } from "folder-hash";
import md5File from "md5-file";
import * as path from "path";
import { parsePost, uuidv4 } from "./src/markdown/transformPosts";
import * as fs from "fs";
import rimraf from "rimraf";
import minifyHtml from "./src/gulp/minify";
import { TaskCallback } from "undertaker";
import { writeFileSync } from "./packages/hexo-blogger-xml/src/parser/util";
import { loopDir } from "./src/gulp/utils";
import GoogleNewsSitemap, { ClassItemType } from "./packages/google-news-sitemap/src";
import moment from "moment";
import YAML from "yaml";
//import gulpCore from "./packages/hexo-blogger-xml/src/gulp-core";
import { Hexo_Config } from "./types/_config";
import downloadImg from "./src/gulp/tasks/external-img";
import bluebird from "bluebird";
// `gulp article:copy`
import articleCopy from "./src/gulp/tasks/article-copy";
// `gulp article:date`
import "./src/gulp/tasks/article-date";
import articleDate from "./src/gulp/tasks/article-date";
import afterGenerate from "./src/gulp/tasks/after-generate";

//import { gulpCore } from "hexo-blogger-xml";
const config = YAML.parse(fs.readFileSync(path.join(__dirname, "_config.yml"), "utf8")) as Hexo_Config;
// generate definition config https://jvilk.com/MakeTypes/
fs.writeFileSync(__dirname + "/types/_config.json", JSON.stringify(config));

// just copy and process from source posts (src-posts) to production posts (source/_posts)
gulp.task("article:copy", function (done) {
  return articleCopy(config, done);
});

/**
 * Source folder articles
 */
const srcPostDir = path.join(__dirname, "src-posts");

/**
 * Production article.
 * Articles which published on google index
 */
const prodPostDir = path.join(__dirname, "source/_posts");

/**
 * Development article.
 * Articles location for translation
 */
const devPostDir = path.join(__dirname, "build/_posts");

/**
 * Empty all files and folders in directory path
 * @param directory
 * @param cb
 */
// eslint-disable-next-line no-unused-vars
function emptyDir(directory: string, cb: (arg0?: any) => void = null) {
  if (fs.existsSync(directory))
    fs.readdir(directory, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        const fileToDelete = path.join(directory, file);

        if (fs.lstatSync(fileToDelete).isDirectory()) {
          // if sub is directory, rerun function to this subfolder
          emptyDir(fileToDelete);
        }

        rimraf(fileToDelete, function (err) {
          if (err) console.error(err);
        });
      }

      if (typeof cb == "function") cb(directory);
    });
}

gulp.task("article:img", (done) => {
  // get post from ${config.source_dir}/_posts
  const posts = loopDir(path.join(__dirname, config.source_dir, "_posts"))
    .filter((f) => f.endsWith(".md"))
    .unique();
  return bluebird
    .all(posts)
    .map(parsePost)
    .each((post) => {
      if (post) return downloadImg(post);
    });
  //.finally(() => done());
});

gulp.task("article:date", (done) => {
  // get post from ${config.source_dir}/_posts
  const posts = loopDir(path.join(__dirname, config.source_dir, "_posts"))
    .filter((f) => f.endsWith(".md"))
    .unique();
  return bluebird
    .all(posts)
    .map(parsePost)
    .each((post) => {
      if (post) return articleDate(post);
    });
  //.finally(() => done());
});

gulp.task("article:after-gen", (done) => {
  return afterGenerate(config);
});

gulp.task("article:clean", function (done) {
  emptyDir(prodPostDir);
  fs.mkdirSync(prodPostDir, { recursive: true });

  done();
});

// extract blogger exported xml content to src-posts
/*gulp.task("blogger", function (done) {
  ["araka_id.xml" /"webmanajemen.com.xml"/].forEach((xml) => {
    const mainXML = path.resolve("./userscripts/xml/" + xml);
    ///const testXML = path.resolve("packages/hexo-blogger-xml/xml/test.xml");
    gulpCore({
      input: [mainXML],
      output: "./build/src-posts",
      hostname: ["webmanajemen.com", "www.webmanajemen.com", "dimaslanjaka.github.io", "movies.webmanajemen.com"],
      callback: require("./userscripts/post_callback"),
      on: {
        finish: (_parser) => {
          console.log("Blogger gulp finished");
        },
      },
    });
  });

  done();
});*/

// minifying hexo generate result
gulp.task("hexo:minify", function () {
  return gulp
    .src("docs/**/*.html")
    .pipe(minifyHtml({ collapseWhitespace: true, minifyJS: true, minifyCSS: true }))
    .on("error", console.log)
    .pipe(gulp.dest("docs"));
});

/**
 * Read directory recursive
 * @param dir
 * @param done
 */
function walk(dir: fs.PathLike, done: { (err: NodeJS.ErrnoException, files: string[]): void }) {
  let results = [];
  fs.readdir(dir, function (err, list) {
    if (err) return done(err, null);
    let i = 0;
    (function next() {
      let file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir.toString(), file);
      fs.stat(file, function (err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function (err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
}

function sitemap(done?: TaskCallback) {
  const results: string[] = [];
  return new Promise((resolve, reject) => {
    walk("source", (err, files) => {
      const filter = files
        .filter((file) => {
          return (
            /\.(md|html)$/.test(file) && !/\/readme.md$/.test(file.toLowerCase()) && !/\/Test\/|\/404\.html/.test(file)
          );
        })
        .map((file) => {
          return file
            .replace(/\.md$/, ".html")
            .replace("_posts/", "")
            .replace(path.join(__dirname, "source"), "https://www.webmanajemen.com")
            .replace(/ /gm, "%20");
        });
      results.addAll(filter);
      if (results.length) {
        fs.writeFileSync(path.join(__dirname, "docs/sitemap.txt"), results.join("\n"));
      }
      if (typeof done == "function") done();
      resolve(results);
    });
  });
}

// sitemap.txt generator
gulp.task("sitemap", (done) => {
  return sitemap(done);
});

// google news sitemap generator
gulp.task("sitemap-gn", (done) => {
  const sitemaps = new GoogleNewsSitemap();
  walk("source", (err, files) => {
    files
      .filter((file) => {
        return /\.md$/.test(file) && !/\/Test\/|\/404\//.test(file);
      })
      .forEach((file) => {
        const contentMD = fs.readFileSync(file).toString();
        const parse = parsePost(contentMD);
        if (parse) {
          if (!parse.metadata || !parse.metadata.title || !parse.metadata.author || !parse.metadata.date) {
            //console.log("metadata not found", file);
            return;
          }
          //console.log(parse.metadata);
          const build: ClassItemType = {
            publication_name: "",
            publication_language: "",
            publication_date: "",
            title: "",
            location: "",
          };

          // parse post language
          if (typeof parse.metadata.lang == "string" && parse.metadata.lang.length) {
            build.publication_language = parse.metadata.lang;
          }

          // parse post title
          build.title = parse.metadata.title;
          if (parse.metadata.webtitle) build.title += " | " + parse.metadata.webtitle;

          // parse post author
          build.publication_name = "Dimas Lanjaka";
          if (typeof parse.metadata.publisher_name == "string") {
            build.publication_name = parse.metadata.author;
          } else if (typeof parse.metadata.author.nick == "string") {
            build.publication_name = parse.metadata.author.nick;
          } else if (typeof parse.metadata.author.nickname == "string") {
            build.publication_name = parse.metadata.author.nickname;
          } else if (typeof parse.metadata.author.name == "string") {
            build.publication_name = parse.metadata.author.name;
          }

          // parse date using YYYY-MM-DDThh:mm:ssTZD
          if (typeof parse.metadata.date == "string" && parse.metadata.date.length) {
            try {
              build.publication_date = moment(parse.metadata.date, moment.ISO_8601).format(
                GoogleNewsSitemap.date_pattern
              );
            } catch (e) {
              console.log("fail", parse.metadata.date);
            }
            //console.log(build.publication_date);
          }

          // parse genre
          if (typeof parse.metadata.genre == "string") {
            build.genres = parse.metadata.genre;
          } else if (Array.isArray(parse.metadata.genre)) {
            build.genres = parse.metadata.genre.join(",");
          } else {
            build.genres = "Blog";
          }

          // parse keywords
          if (typeof parse.metadata.keywords == "string") {
            build.keywords = parse.metadata.keywords;
          } else if (Array.isArray(parse.metadata.keywords)) {
            build.keywords = parse.metadata.keywords.join(",");
          }

          const url = file
            .replace(/\.md$/, ".html")
            .replace("_posts/", "")
            .replace(path.join(__dirname, "source"), "https://www.webmanajemen.com")
            .replace(/ /gm, "%20");
          build.location = url;
          const temp = path.join(
            "build/google-news-sitemap",
            file.replace(/\.md$/, ".json").replace("_posts/", "").replace(path.join(__dirname, "source"), "")
          );
          if (build.publication_date == "Invalid date") {
            parse.metadata.error = "INVALID DATE";
            parse.metadata.path = file;
            console.log(parse.metadata);
          } else {
            sitemaps.add(build);
          }
          writeFileSync(temp, JSON.stringify(parse, null, 2));
        } else {
          //console.error("cannot parse", file);
        }
      });
    writeFileSync("docs/sitemap-google-news.xml", sitemaps.toString());
    if (typeof done == "function") done();
  });
});

// update .guid has based on src-posts for github workflow cache
gulp.task("update-hash", (done) => {
  const loc = path.join(__dirname, ".guid");
  const options = {
    folders: { exclude: [".*", "node_modules", "test_coverage"] },
    files: { include: ["*.js", "*.json", "*.ts", "*.md"] },
  };

  hashElement("./src-posts", options)
    .then((hash) => {
      // generate md5 has from package-lock.json
      const pkglock = md5File.sync(path.join(__dirname, "package-lock.json"));
      // write merged uuid v4 from md5 hashes
      writeFileSync(loc, uuidv4(hash.toString() + pkglock));
    })
    .catch((error) => {
      return console.error("hashing failed:", error);
    });
  done();
});

gulp.task("default", gulp.series("article:copy", "update-hash"));
