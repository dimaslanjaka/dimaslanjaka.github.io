const fs = require("fs");
const { spawn } = require("git-command-helper");
const args = require("minimist")(process.argv.slice(2));
const root = process.cwd();
const jsdom = require("jsdom");
const path = require("path");
const yaml = require("yaml");
/**
 * @type {import('./tmp/schema.json')}
 */
const config = yaml.parse(
	fs
		.readFileSync(path.join(root, "github-actions-validator.config.yml"))
		.toString()
);

// save schema
if (!fs.existsSync(path.join(__dirname, "tmp"))) {
	fs.mkdirSync(path.join(__dirname, "tmp"));
}
fs.writeFileSync(
	path.join(__dirname, "tmp/schema.json"),
	JSON.stringify(config)
);

(async function () {
	Object.keys(config["validate"] || {}).forEach((name) => {
		try {
			const full = path.resolve(root, config["validate"][name]);
			console.log("validating", name, full.replace(root, ""));
			validate(full, name);
		} catch (_err) {
			console.error("cannot validate", name, _err.message);
		}
	});

	const array = config["install"] || [];
	for (let i = 0; i < array.length; i++) {
		const p = array[i];
		try {
			const cwd = path.resolve(root, p);
			await spawn("npm", ["install", "--omit=dev", "--production"], {
				cwd,
			});
		} catch (_err) {
			console.error("cannot installing", p, _err.message);
		}
	}
})();

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
