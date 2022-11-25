"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const ini_1 = __importDefault(require("ini"));
const path_1 = require("path");
/**
 * extract submodule to object
 * @param path
 */
function extractSubmodule(path) {
    const config = ini_1.default.parse(fs_1.default.readFileSync(path).toString());
    return Object.keys(config).map((key) => {
        if (key.startsWith("submodule")) {
            const submodule = config[key];
            submodule.root = (0, path_1.join)((0, path_1.dirname)(String(path)), submodule.path);
            //submodule.github = new git(submodule.root);
            /*if (submodule.url)
                submodule.github
                    .setremote(submodule.url, "origin", { stdio: "pipe" })
                    .catch(() => {
                        //
                    });
            if (submodule.branch)
                submodule.github
                    .setbranch(submodule.branch, { stdio: "pipe" })
                    .catch(() => {
                        //
                    });*/
            return submodule;
        }
    });
}
exports.default = extractSubmodule;
