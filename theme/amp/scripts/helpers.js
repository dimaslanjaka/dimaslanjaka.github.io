"use strict";

var fs = require("fs");
var path = require("path");

var filePath = path.join(__dirname, "../source/css/style.css");

hexo.extend.helper.register("inlineCss", function (name) {
  return fs.readFileSync(filePath, "utf8").toString();
});

/**
 * Extract Text
 * @param {string} text
 * @returns {string}
 */
function extractText(text) {
  let str = text;
  const scriptgx =
    /<script(?:(?!\/\/)(?!\/\*)[^'"]|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\/\/.*(?:\n)|\/\*(?:(?:.|\s))*?\*\/)*?<\/script>/gim;
  const defaultgx = /\<[^\>]+\>/gm; // default only g
  const stylegx =
    /<style(?:(?!\/\/)(?!\/\*)[^'"]|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\/\/.*(?:\n)|\/\*(?:(?:.|\s))*?\*\/)*?<\/style>/gim;
  return str.replace(scriptgx, "").replace(stylegx, "").replace(defaultgx, "");
}

/**
 * Excerpt Helper
 * @description Get the excerpt from a post
 * @example
 *     <%- excerpt(post) %> or {% excerpt(post) %}
 */
hexo.extend.helper.register("excerpt", function (post) {
  if (post.excerpt) return extractText(post.excerpt);
  if (post.content) return extractText(post.content).substring(0, 200);
  if (post.title) return post.title;
  if (typeof post == "string") return extractText(post).substring(0, 200);
  return "this post haven't set the excerpt";
});

/**
 * Author Helper
 * @description Get author
 * @example
 * <%- author(post) || author(config) %>
 */
hexo.extend.helper.register("author", function (conf) {
  if (conf.author) {
    if (typeof conf.author == "string") return conf.author;
    if (conf.author.nick) return conf.author.nick;
    if (conf.author.name) return conf.author.name;
  }
  return "Default Author";
});
