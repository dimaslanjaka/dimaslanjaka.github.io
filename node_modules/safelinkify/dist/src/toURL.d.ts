import { Nullable } from './globals';
/**
 * is url valid
 * @param string
 * @returns
 */
export declare function isValidHttpUrl(string: string | URL): boolean;
/**
 * fix url
 * * doubled slashes
 * @param url
 * @returns
 */
export declare function fixUrl(url: string | URL): string;
/**
 * transform url string to {@link Nullable}<{@link URL}>
 * @param url
 * @returns
 */
export default function toURL(url: string): Nullable<URL>;
