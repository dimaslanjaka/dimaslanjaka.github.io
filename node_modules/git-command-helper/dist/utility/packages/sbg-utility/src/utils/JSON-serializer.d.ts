/**
 * parse json string with circular references
 * @param {string} text
 * @param {(...args:any[])=>any} [reviver]
 * @returns
 */
export function parse(text: string, reviver?: (...args: any[]) => any): any;
/**
 * json stringify object with circular references
 * @param {any} value
 * @param {(this: any, key: string, value: any) => any} [replacer]
 * @param {string|number} [space]
 * @returns
 */
export function stringify(value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;
/**
 * stringify circular object into JSON
 * @param {any} any
 * @returns
 */
export function toJSON(any: any): any;
/**
 * parse circular object from JSON
 * @param {string} any
 * @returns
 */
export function fromJSON(any: string): any;
