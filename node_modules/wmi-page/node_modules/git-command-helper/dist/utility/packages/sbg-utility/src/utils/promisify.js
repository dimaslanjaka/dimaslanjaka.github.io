"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promisify = void 0;
const bluebird_1 = __importDefault(require("bluebird"));
/**
 * make any function or value to be promise
 * @param func
 * @param options
 * @returns
 */
exports.promisify = bluebird_1.default.promisify;
