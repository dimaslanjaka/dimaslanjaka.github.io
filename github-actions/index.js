const fs = require("fs");
const { spawn } = require("git-command-helper");
const args = require("minimist")(process.argv.slice(2));
const root = process.cwd();
const jsdom = require("jsdom");
const path = require("path");
const yaml = require("yaml");
const color = require("ansi-colors");
const { writefile } = require("sbg-utility");

/**
 * @type {import('./tmp/schema.json')}
 */
const config = yaml.parse(
	fs
		.readFileSync(path.join(root, "github-actions-validator.config.yml"))
		.toString()
);

// save schema
writefile(
	path.join(__dirname, "tmp/schema.json"),
	JSON.stringify(config, null, 2)
);

let hasErrors = false;

(async function () {
	Object.keys(config["validate"] || {}).forEach((name) => {
		const full = path.resolve(root, config["validate"][name]);
		console.log("validating", color.magenta(name), full.replace(root, ""));
		validate(full, name);
	});

	if (hasErrors) process.exit(1);

	const array = config["install"] || [];
	for (let i = 0; i < array.length; i++) {
		const p = array[i];
		try {
			const cwd = path.resolve(root, p);
			const isYarn = path.resolve(cwd, "yarn.lock");
			// removing yarn.lock
			if (isYarn) fs.rmSync(isYarn);
			console.log("installing node libs", p, "->", cwd);
			await spawn("npm", ["install", "--omit=dev" /*, "--production"*/], {
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
	if (!fs.existsSync(file)) {
		console.log(as, file, "is not exist");
		hasErrors = true;
	}

	// check size
	if (fs.statSync(file).size === 0) {
		console.log(`file is empty ${as || file}`);
		hasErrors = true;
	}

	if (fs.existsSync(file)) {
		const dom = new jsdom.JSDOM(fs.readFileSync(file));
		const { window } = dom;
		const { document } = window;
		const bodyEmpty = document.body.innerHTML.trim().length === 0;
		// throw when body is empty
		if (bodyEmpty) throw new Error(`body is empty file ${as || file}`);

		document.close();
		window.close();
	} else {
		hasErrors = true;
	}
}
