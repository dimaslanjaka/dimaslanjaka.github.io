"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promisify = void 0;
const tslib_1 = require("tslib");
const bluebird_1 = tslib_1.__importDefault(require("bluebird"));
/**
 * make any function or value to be promise
 * @param func
 * @param options
 * @returns
 */
exports.promisify = bluebird_1.default.promisify;
//# sourceMappingURL=promisify.js.map