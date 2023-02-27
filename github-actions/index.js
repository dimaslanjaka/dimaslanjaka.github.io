const fs = require("fs");
const { spawn } = require("git-command-helper");
const args = require("minimist")(process.argv.slice(2));
const root = process.cwd();
const jsdom = require("jsdom");
const path = require("path");

validate(path.join(root, "index.html"), "homepage");

spawn("npm", ["install", "--omit=dev", "--production"], {
	cwd: path.join(root, "page"),
}).finally(() => {
	spawn("npm", ["install", "--omit=dev", "--production"], { cwd: root });
});

/**
 * start validation
 * @param {string} file
 * @param {string} as what is this file used for. ex: homepage
 */
function validate(file, as) {
	if (fs.statSync(file).size === 0) {
		throw new Error(`file is empty ${as || file}`);
	}

	const dom = new jsdom.JSDOM(fs.readFileSync(file));
	const { window } = dom;
	const { document } = window;
	const bodyEmpty = document.body.innerHTML.trim().length === 0;
	// throw when body is empty
	if (bodyEmpty) throw new Error(`body is empty file ${as || file}`);

	document.close();
	window.close();
}
