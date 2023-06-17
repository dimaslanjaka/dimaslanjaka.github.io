"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasInstance = exports.setInstance = exports.getInstance = void 0;
const instances = {};
/**
 * get git instance
 * @param key
 * @returns
 */
function getInstance(key) {
    return instances[key];
}
exports.getInstance = getInstance;
/**
 * set git instance
 * @param key
 * @param instance
 */
function setInstance(key, instance) {
    instances[key] = instance;
}
exports.setInstance = setInstance;
/**
 * check git instance
 * @param key
 * @returns
 */
function hasInstance(key) {
    return typeof instances[key] !== 'undefined';
}
exports.hasInstance = hasInstance;
