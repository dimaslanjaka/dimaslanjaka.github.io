const package = require("./package.json");
// just load all installed packages
for (let pkg in package.dependencies) {
  require(pkg);
}
