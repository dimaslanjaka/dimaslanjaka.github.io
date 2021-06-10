import express from "express";
import fs from "fs";
import filemanager from "../node/filemanager";
import path from "path";
import { curly } from "node-libcurl";
import TranslateUrl from "../translator/TranslateUrl";
import Storage from "../js/Storage";
import { appRoot } from "../config";
import slash from "slash";
import { getNgrokUrl } from "../ngrok";
const router = express.Router();
// domain.com/translate
router.get("/", async function (req, res) {
  let index = [];
  let targetUrl = String(req.params.url);
  if (targetUrl == "undefined") {
    let postsFolder = path.resolve("build/_posts");
    if (fs.existsSync(postsFolder)) {
      filemanager.readdir(postsFolder, function (err, results) {
        if (err) {
          console.error(err);
        } else {
          results.forEach((file) => {
            let canonical = slash(file.replace(path.join(appRoot, "build/_posts"), ""));
            let url = `${getNgrokUrl()}${canonical}`;
            index.push(url);
          });
          res.locals = {
            title: "Index Articles",
            message: "This is a message",
          };
          //res.render("translate.ejs", { title: "Index Articles", data: index });
          res.render("translate.ejs", {
            data: index,
          });
        }
      });
    }
  } else {
    let url = new TranslateUrl();
    url.from("id").to("en");
    res.send(url.toString());
  }
  // eslint-disable-next-line no-unused-vars
  //let { statusCode, data, headers } = await curly.get("http://www.google.com");
  //res.send(data);
});

export default router;
