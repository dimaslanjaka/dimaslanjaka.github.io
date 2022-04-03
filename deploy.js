/***********
 * GITHUB WORKFLOW DEPLOY THIS SITE
 ***********/

const execSys = require("child_process").exec;

const cmds = [
  "npm i -g npm hexo-cli gulp-cli typescript ts-node",
  "npm install",
  // install themes dependencies
  "cd themes/material && npm install",
  //"npm i ./packages/hexo-filter-cleanup",
  "npx gulp article:copy",
  "hexo generate",
  // install static page dependencies
  "cd docs/page && npm install",
  "node userscripts/custom-domain.js",
  "node userscripts/copy.js",
  "node userscripts/after_generated.js",
  "node userscripts/validate.js",
];

function run() {
  exec(cmds[0],/* set max buffer 500Kb */ { maxBuffer: 1024 * 500 }, function (err, stdout, stderr) {
    if (!err) {
      cmds.shift();
      //if (stdout) console.log(stdout);
      //if (stderr) console.log(stderr);
      if (cmds.length > 0) run(cmds[0]);
    } else {
      throw err;
    }
  });
}

run();

/**
 * Shadow exec
 * @param {string} cmd
 * @param {(err: Error, stdout: string, stderr: string)} callback
 */
function exec(cmd, cwd, callback) {
  console.log("cmd: " + (typeof cwd == "string" ? "cd " + cwd + " && " : "") + cmd);
  if (typeof cwd == "function") {
    return execSys(cmd, cwd);
  }
  if (typeof callback == "function") {
    if (typeof cwd == "string") {
      return execSys(cmd, { cwd: cwd }, callback);
    }
    return execSys(cmd, callback);
  }
}
