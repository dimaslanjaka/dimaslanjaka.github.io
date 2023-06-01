"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonStringifyWithCircularRefs = void 0;
JSON.stringifyWithCircularRefs = (function () {
    const refs = new Map();
    const parents = [];
    const path = ['this'];
    function clear() {
        refs.clear();
        parents.length = 0;
        path.length = 1;
    }
    function updateParents(key, value) {
        let idx = parents.length - 1;
        let prev = parents[idx];
        if (prev[key] === value || idx === 0) {
            path.push(key);
            parents.push(value);
        }
        else {
            while (idx-- >= 0) {
                prev = parents[idx];
                if (prev[key] === value) {
                    idx += 2;
                    parents.length = idx;
                    path.length = idx;
                    --idx;
                    parents[idx] = value;
                    path[idx] = key;
                    break;
                }
            }
        }
    }
    function checkCircular(key, value) {
        if (value != null) {
            if (typeof value === 'object') {
                if (key) {
                    updateParents(key, value);
                }
                const other = refs.get(value);
                if (other) {
                    return '[Circular Reference]' + other;
                }
                else {
                    refs.set(value, path.join('.'));
                }
            }
        }
        return value;
    }
    return function stringifyWithCircularRefs(obj, space = 2) {
        try {
            parents.push(obj);
            return JSON.stringify(obj, checkCircular, space);
        }
        finally {
            clear();
        }
    };
})();
/**
 * transform any object to json. Suppress `TypeError: Converting circular structure to JSON`
 * @param data
 * @returns
 */
function jsonStringifyWithCircularRefs(data) {
    return JSON.stringifyWithCircularRefs(data);
}
exports.jsonStringifyWithCircularRefs = jsonStringifyWithCircularRefs;
