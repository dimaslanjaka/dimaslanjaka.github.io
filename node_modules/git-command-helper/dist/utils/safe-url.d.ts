/**
 * remove `token` from url.
 *
 * @example
 * // from : https://TOKEN@github.com/username/repository-name/blob/filename#L01-L202
 * // to   : https://github.com/username/repository-name/blob/filename#L01-L202
 * @param url
 * @returns
 */
export declare function safeURL(url: string): string;
