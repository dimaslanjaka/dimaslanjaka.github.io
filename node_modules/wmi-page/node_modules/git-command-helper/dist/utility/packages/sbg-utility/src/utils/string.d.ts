/// <reference types="node" />
/// <reference types="node" />
/**
 * escape regex string
 * @param string
 * @returns
 */
export declare function escapeRegex(string: string, method?: '1' | '2'): string;
/**
 * capitalize string first letter of each word which mixed with symbols
 * @param str
 * @param moreSymbols add more symbols, default []
 * @returns
 */
export declare function capitalize(str: string, moreSymbols?: ConcatArray<string>): string;
export declare const capitalizer: typeof capitalize;
/**
 * Stream to string
 * @param stream
 * @returns
 */
export declare function streamToString(stream: NodeJS.ReadableStream): Promise<unknown>;
/**
 * Buffer to string
 * @param array
 * @returns
 */
export declare function bufferToString(array: Buffer): string;
/**
 * Replace path unix-style
 * @param source
 * @param toReplace
 * @param replacement
 * @returns
 */
export declare function replacePath(source: string, toReplace: string, replacement?: string): Promise<string>;
/**
 * slugify string
 * @param str
 * @param ext
 * @returns
 */
export declare function slugify(str: string, ext?: string): string;
/**
 * check variable is valid http url string
 * @param string
 * @returns
 */
export declare function isValidHttpUrl(string: string | URL): boolean;
