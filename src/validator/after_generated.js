/* eslint-disable @typescript-eslint/no-this-alias */
const fs = require("fs");
const path = require("path");
const _ = require("lodash");
require('js-prototypes');
const root = path.join(__dirname, "/../");
const docs = path.join(root, "docs");

if (typeof "".replaceAll != "function") {
  String.prototype.replaceAll = function (search, replacement) {
    let find = typeof search == "string" ? new RegExp(search, "g") : search;
    return this.replace(find, replacement);
  };
}

// process docs/assets/js/quiz.js
let quizjs = path.join(__dirname, "/../docs/assets/js/quiz.js");
let read = fs.readFileSync(quizjs).toString();
let regex = new RegExp('#uniqid()', 'gm');
let uuid = _.uniqueId();
read = read.replaceAll(regex, uuid);
fs.writeFileSync(quizjs, read);

// copy readme to public_dir
fs.copyFileSync(path.join(root, "README.md"), path.join(docs, "readme.md"));
