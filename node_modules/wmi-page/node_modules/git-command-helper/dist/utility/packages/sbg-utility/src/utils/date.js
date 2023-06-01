"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toMilliseconds = void 0;
/**
 * convert hours,min,sec to milliseconds
 * @param hrs
 * @param min
 * @param sec
 * @returns
 */
const toMilliseconds = (hrs, min, sec) => (hrs * 60 * 60 + min * 60 + sec) * 1000;
exports.toMilliseconds = toMilliseconds;
