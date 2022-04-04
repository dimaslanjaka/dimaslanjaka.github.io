"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var construct_1 = __importDefault(require("./construct"));
//https://www.npmjs.com/package/node-json-db
var getNodeVersion = parseInt(process.version.toLowerCase().replace('v', ''));
module.exports = construct_1.default;
