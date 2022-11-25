import Bluebird from "bluebird";
import { SpawnOptions } from "child_process";
import debug from "debug";
import { existsSync } from "fs";
import { join } from "path";
import extractSubmodule from "./extract-submodule";
import git, { gitHelper } from "./git";
import { spawn } from "./spawner";

const _log = debug("git-command-helper");

export class submodule {
	cwd: string;
	hasConfig: boolean;
	private github: typeof gitHelper[] = [];
	constructor(cwd: string) {
		this.cwd = cwd;
		this.hasConfig = existsSync(join(this.cwd, ".gitmodules"));
	}

	private spawnOpt(opt: SpawnOptions = {}) {
		return Object.assign({ cwd: this.cwd, stdio: "pipe" } as SpawnOptions, opt);
	}

	hasSubmodule() {
		return existsSync(join(this.cwd, ".gitmodules"));
	}

	/**
	 * git submodule update
	 * @param args custom arguments
	 * @param optionSpawn
	 * @returns
	 */
	update(
		args: string[] = [],
		optionSpawn: SpawnOptions = { stdio: "inherit" }
	) {
		const arg = ["submodule", "update"];
		if (Array.isArray(args)) {
			args.forEach((str) => arg.push(str));
		} else {
			arg.push("-i", "-r");
		}
		return spawn("git", arg, this.spawnOpt(optionSpawn));
	}

	/**
	 * Update all submodule with cd method
	 * @param reset do git reset --hard origin/branch ?
	 */
	safeUpdate(reset = false) {
		return new Bluebird((resolve) => {
			const info = this.get();
			const doUp = () => {
				return new Bluebird((resolveDoUp: (...v: any[]) => any) => {
					let { branch, github, root, url } = info[0];
					//console.log("safe", info[0]);
					if (!github) {
						github = new git(root);
					}
					const doReset = () => github.reset(branch);
					const doPull = () =>
						github.pull(["origin", branch, "--recurse-submodule"]);
					// update from remote name origin
					github.setremote(url, "origin").then(() => {
						// force checkout branch instead commit hash
						github.setbranch(branch, true).then(() => {
							if (reset) {
								// reset then pull
								doReset().then(doPull).then(resolveDoUp);
							} else {
								// pull
								doPull().then(resolveDoUp);
							}
						});
					});
				});
			};
			const iterate = () => {
				return new Bluebird((resolveIt: (...v: any[]) => any) => {
					doUp()
						.then(() => {
							info.shift();
						})
						.then(() => {
							if (info.length > 0) {
								return iterate().then(resolveIt);
							} else {
								resolveIt();
							}
						});
				});
			};
			if (info.length > 0) {
				resolve(iterate());
			}
		});
	}

	/**
	 * git submodule status
	 * @param optionSpawn
	 * @returns
	 */
	status(optionSpawn: SpawnOptions = { stdio: "inherit" }) {
		return spawn("git", ["submodule", "status"], this.spawnOpt(optionSpawn));
	}

	/**
	 * git add all each submodule
	 * @param pathOrArg ex: `-A`
	 * @returns
	 */
	addAll(pathOrArg: string) {
		return spawn("git", ["submodule", "foreach", "git", "add", pathOrArg]);
	}

	commitAll(msg: string) {
		return spawn("git", ["submodule", "foreach", "git", "commit", "-am", msg]);
	}

	/**
	 * get submodule informations
	 * @returns
	 */
	get() {
		if (!this.hasSubmodule())
			throw new Error("This directory not have submodule installed");

		const extract = extractSubmodule(join(this.cwd, ".gitmodules"));
		return extract.map((item) => {
			return Object.assign({ branch: "master", github: null as git }, item);
		});
		/*
		return Bluebird.all(extract).map((info) => {
			return new Bluebird((resolve: (result: Submodule) => any) => {
				const { url, root, branch } = info;
				const currentBranch = branch || "master"; // default master branch
				setupGit({
					url,
					branch: currentBranch,
					baseDir: root,
				}).then((github) => {
					resolve(Object.assign(info, { github }));
				});
			});
		});
		*/
	}
}

export default submodule;
export const gitSubmodule = submodule;
