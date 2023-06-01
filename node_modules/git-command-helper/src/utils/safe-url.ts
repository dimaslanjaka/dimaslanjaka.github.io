/**
 * remove `token` from url.
 *
 * @example
 * // from : https://TOKEN@github.com/username/repository-name/blob/filename#L01-L202
 * // to   : https://github.com/username/repository-name/blob/filename#L01-L202
 * @param url
 * @returns
 */
export function safeURL(url: string) {
  const parse = new URL(url);
  const safe = parse.origin + parse.pathname + parse.hash;
  return safe;
}
