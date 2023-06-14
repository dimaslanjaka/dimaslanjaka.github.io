/**
 * Persistent UUID V4 Generator based on inputted string
 * @param fromString `null`: based on caller function name, line, and path
 * @param fromString generate based on string (unique based on this string)
 * @returns ex: a2d6fee8-369b-bebc-3d8e-b8ff2faf40d3
 * @example
 * for (let index = 0; index < 5; index++) console.log(uuidv4()); // <- will printted same id
 */
export default function uuidv4(fromString?: string): string;
/**
 * generate random id
 * @param n
 * @param prefix
 * @returns
 */
export declare const makeid: (n?: number, prefix?: string) => string;
