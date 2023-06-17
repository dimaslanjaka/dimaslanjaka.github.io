"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonParseWithCircularRefs = exports.jsonStringifyWithCircularRefs = void 0;
const tslib_1 = require("tslib");
const serializer = tslib_1.__importStar(require("./JSON-serializer"));
JSON.stringifyWithCircularRefs = serializer.toJSON;
/**
 * transform any object to json. Suppress `TypeError: Converting circular structure to JSON`
 * @param data
 * @returns
 */
function jsonStringifyWithCircularRefs(data) {
    return serializer.stringify(data);
}
exports.jsonStringifyWithCircularRefs = jsonStringifyWithCircularRefs;
/**
 * parse json stringified with circular refs
 */
function jsonParseWithCircularRefs(data) {
    return serializer.parse(data);
}
exports.jsonParseWithCircularRefs = jsonParseWithCircularRefs;
//# sourceMappingURL=JSON.js.map