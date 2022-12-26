
import { Nullable } from './globals';
import toURL from './toURL';

const _global_parseQuery = (typeof window !== 'undefined' ? window : global) as any;

type parseQueryResult =
  | {
      [key: string]: any;
    }
  | string;
/**
 * Parse Query URL and Hash
 * @param  query query key, null = return all objects
 * @param  url target query, ex: {@link location.href} or {@link location.search}
 */
export function parseQuery(query: Nullable<string>, url: Nullable<string>): parseQueryResult {
  // skip null, undefined
  if (typeof url !== 'string') return;
  // skip empty string
  if (url.length < 1) return;
  let result: { [key: string]: any } = {};

  /**
   * Query URL Parser
   * @param str
   * @returns
   */
  const parseQueries = (str: string) => {
    const urlParams = new URLSearchParams(str);
    return Object.fromEntries(urlParams);
  };

  if (url.match(/^(#|\?)/)) {
    url = 'http://not.actually.domain/' + url;
  }

  const parse = toURL(url);
  if (parse) {
    if (parse.hash) {
      result = Object.assign(result, parseQueries(parse.hash.substring(1)));
    }
    if (parse.search) {
      result = Object.assign(result, parseQueries(parse.search));
    }
  }

  if (typeof query == 'string' && result.hasOwnProperty(query)) {
    return result[query];
  }

  return result;
}
_global_parseQuery.parseQuery = parseQuery;
export default parseQuery;
