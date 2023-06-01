"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObjectProperty = exports.orderKeys = void 0;
/**
 * sort alphabetically object by key
 * @param obj
 * @returns
 */
function orderKeys(obj) {
    const keys = Object.keys(obj).sort(function keyOrder(k1, k2) {
        if (k1 < k2)
            return -1;
        else if (k1 > k2)
            return +1;
        else
            return 0;
    });
    const after = {};
    for (let i = 0; i < keys.length; i++) {
        after[keys[i]] = obj[keys[i]];
        delete obj[keys[i]];
    }
    for (let i = 0; i < keys.length; i++) {
        obj[keys[i]] = after[keys[i]];
    }
    return obj;
}
exports.orderKeys = orderKeys;
/**
 * get object property by key, supress typescript error
 * @param item
 * @param key
 * @returns
 */
function getObjectProperty(item, key) {
    if (typeof item === 'undefined' || item === null)
        return;
    if (key in item)
        return item[key];
}
exports.getObjectProperty = getObjectProperty;
