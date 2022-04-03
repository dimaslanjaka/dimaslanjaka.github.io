// static browsersync
// listen to public dir of hexo generate
const browserSync = require("browser-sync").create();
const path = require("path");
const YAML = require("yaml");
const fs = require("fs");
const config_file = path.join(__dirname, "_config.yml");
const file = fs.readFileSync(config_file, "utf8");
const config = YAML.parse(file);
const files = [path.join(__dirname, config.public_dir, "/*")];
browserSync.init(files, {
  server: {
    baseDir: config.public_dir,
    serveStaticOptions: {
      extensions: ["html", "css", "js", "json", "txt"],
    },
  },
  port: 4000,
});
