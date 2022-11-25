"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const extract_submodule_1 = __importDefault(require("./extract-submodule"));
(0, extract_submodule_1.default)((0, path_1.join)(__dirname, '../test.ini'));
