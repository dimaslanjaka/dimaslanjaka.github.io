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
 * @param moreSymbols add more symbols
 * @returns
 */
export declare function capitalizer(str: string, moreSymbols?: ConcatArray<string>): string;
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
