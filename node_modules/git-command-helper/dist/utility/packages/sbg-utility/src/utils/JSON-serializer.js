/* eslint no-fallthrough: ["error", { "commentPattern": "break[\\s\\w]*omitted" }] */
'use strict';
/*! (c) 2020 Andrea Giammarchi */
/* https://github.com/WebReflection/flatted/blob/main/cjs/index.js */
const { parse: $parse, stringify: $stringify } = JSON;
const { keys } = Object;
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
function sha1(data) {
    return crypto.createHash('sha1').update(data, 'binary').digest('hex');
}
function getStack() {
    const stack = new Error('get caller').stack
        .split(/\r?\n/gim)
        .filter((str) => /(dist|src)/i.test(str) && !str.includes(__filename));
    const folder = path.join(process.cwd(), 'tmp/error/json-serializer');
    // create folder when not exist
    if (!fs.existsSync(folder))
        fs.mkdirSync(folder, { recursive: true });
    const file = path.join(folder, `${sha1(stack[1])}.log`);
    return { stack, file };
}
const Primitive = String; // it could be Number
const primitive = 'string'; // it could be 'number'
const ignore = {};
const object = 'object';
const noop = (_, value) => value;
const primitives = (value) => (value instanceof Primitive ? Primitive(value) : value);
const Primitives = (_, value) => (typeof value === primitive ? new Primitive(value) : value);
const revive = (input, parsed, output, $) => {
    const lazy = [];
    for (let ke = keys(output), { length } = ke, y = 0; y < length; y++) {
        const k = ke[y];
        const value = output[k];
        if (value instanceof Primitive) {
            const tmp = input[value];
            if (typeof tmp === object && !parsed.has(tmp)) {
                parsed.add(tmp);
                output[k] = ignore;
                lazy.push({ k, a: [input, parsed, tmp, $] });
            }
            else
                output[k] = $.call(output, k, tmp);
        }
        else if (output[k] !== ignore)
            output[k] = $.call(output, k, value);
    }
    for (let { length } = lazy, i = 0; i < length; i++) {
        const { k, a } = lazy[i];
        output[k] = $.call(output, k, revive.apply(null, a));
    }
    return output;
};
const set = (known, input, value) => {
    const index = Primitive(input.push(value) - 1);
    known.set(value, index);
    return index;
};
/**
 * parse json string with circular references
 * @param {string} text
 * @param {(...args:any[])=>any} [reviver]
 * @returns
 */
const parse = (text, reviver) => {
    try {
        const input = $parse(text, Primitives).map(primitives);
        const value = input[0];
        const $ = reviver || noop;
        const tmp = typeof value === object && value ? revive(input, new Set(), value, $) : value;
        return $.call({ '': tmp }, '', tmp);
    }
    catch (e) {
        const { stack, file } = getStack();
        fs.writeFileSync(file, `${stack.join('\n')}\n\n${text}`);
        console.log('fail parse ' + file + ' ' + e.message);
        process.exit(1);
    }
};
/**
 * json stringify object with circular references
 * @param {any} value
 * @param {(this: any, key: string, value: any) => any} [replacer]
 * @param {string|number} [space]
 * @returns
 */
const stringify = (value, replacer, space) => {
    const $ = replacer && typeof replacer === object
        ? (k, v) => (k === '' || -1 < replacer.indexOf(k) ? v : void 0)
        : replacer || noop;
    const known = new Map();
    const input = [];
    const output = [];
    let i = +set(known, input, $.call({ '': value }, '', value));
    let firstRun = !i;
    while (i < input.length) {
        firstRun = true;
        output[i] = $stringify(input[i++], replace, space);
    }
    return '[' + output.join(',') + ']';
    function replace(key, value) {
        if (firstRun) {
            firstRun = !firstRun;
            return value;
        }
        const after = $.call(this, key, value);
        switch (typeof after) {
            case object:
                if (after === null)
                    return after;
            // break omitted
            case primitive:
                return known.get(after) || set(known, input, after);
        }
        return after;
    }
};
module.exports.parse = parse;
module.exports.stringify = stringify;
/**
 * stringify circular object into JSON
 * @param {any} any
 * @returns
 */
const toJSON = (any) => $parse(stringify(any));
module.exports.toJSON = toJSON;
/**
 * parse circular object from JSON
 * @param {string} any
 * @returns
 */
const fromJSON = (any) => parse($stringify(any));
module.exports.fromJSON = fromJSON;
