"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitSubmodule = exports.getGithubRootDir = exports.getGithubRepoUrl = exports.getGithubRemote = exports.getGithubCurrentBranch = exports.getGithubBranches = exports.GithubInfo = void 0;
__exportStar(require("./git"), exports);
var git_info_1 = require("./git-info");
Object.defineProperty(exports, "GithubInfo", { enumerable: true, get: function () { return __importDefault(git_info_1).default; } });
Object.defineProperty(exports, "getGithubBranches", { enumerable: true, get: function () { return git_info_1.getGithubBranches; } });
Object.defineProperty(exports, "getGithubCurrentBranch", { enumerable: true, get: function () { return git_info_1.getGithubCurrentBranch; } });
Object.defineProperty(exports, "getGithubRemote", { enumerable: true, get: function () { return git_info_1.getGithubRemote; } });
Object.defineProperty(exports, "getGithubRepoUrl", { enumerable: true, get: function () { return git_info_1.getGithubRepoUrl; } });
Object.defineProperty(exports, "getGithubRootDir", { enumerable: true, get: function () { return git_info_1.getGithubRootDir; } });
__exportStar(require("./spawn"), exports);
var submodule_1 = require("./submodule");
Object.defineProperty(exports, "gitSubmodule", { enumerable: true, get: function () { return __importDefault(submodule_1).default; } });
//
