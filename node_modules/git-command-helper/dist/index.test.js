"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const _1 = require(".");
const git = new _1.gitHelper((0, path_1.join)(__dirname, '../../'));
//git.info().then(console.log);
git.getbranch().then(console.log);
