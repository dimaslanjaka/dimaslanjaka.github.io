"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var safelink_1 = __importDefault(require("./safelink"));
var sf = new safelink_1.default({
    exclude: ['webmanajemen.com'],
});
sf.parse("\n<a href=\"http://google.com\">google.com</a>\n<a href=\"http://webmanajemen.com\">webmanajemen.com</a>\n<a id=\"idx\" href=\"http://webmanajemen.com\">webmanajemen.com</a>\n<a id=\"idx\" class=\"\" data-x=\"\" href=\"http://webmanajemen.com\">webmanajemen.com</a>\n<a id=idx href=http://webmanajemen.com>webmanajemen.com</a>\n<a id=\"idx\" href=\"http://webmanajemen.com?sdsjdjsd#sasdhdshsfjfdj\">webmanajemen.com</a>\n");
