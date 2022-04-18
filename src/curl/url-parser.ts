import urlParse from 'url-parse';
import { DeepPartial } from '../markdown/transformPosts/postMapper';

/** URL Parsed Result */
export interface URLParsed extends DeepPartial<ReturnType<typeof urlParse>> {
  /** hostname/domain/ip:port */
  host: string;
  /** hostname/domain/ip */
  hostname: string;
  /** query string */
  search: string;
  /** query string object parsed */
  searchObject: Record<string, any>;
  /** protocol://host */
  protohost: string;
  /** filename from url */
  filename: string;
}

/**
 * Automatically parse url with the query strings to object (nullable)
 * @param src url string
 * @returns object parsed {@link URLParsed} combined with partial properties from {@link urlParse}
 */
export default function urlParser(src: string): URLParsed | null {
  if (!src) return;
  const parser = urlParse(src);
  const searchObject: Array<Record<any, any> | any> = [];
  const queries: string[] = parser.query.replace(/^\?/, '').split('&');
  let split: Array<Record<any, any> | any> = [];
  for (let i = 0; i < queries.length; i++) {
    split = queries[i].split('=').removeEmpties();
    if (0 in split) {
      searchObject[split[0]] = split[1];
    }
  }
  const parsed: URLParsed = {
    protocol: parser.protocol,
    host: parser.host,
    hostname: parser.hostname,
    port: parser.port,
    pathname: parser.pathname,
    hash: parser.hash,
    protohost: parser.protocol + '//' + parser.host,
    search: parser.query,
    searchObject: searchObject,
    filename: parser.href.split('/').removeEmpties().unique().last(1)[0],
  };
  /*for (const key in parser) {
    if (Object.prototype.hasOwnProperty.call(parser, key)) {
      parsed[key] = parser[key];
    }
  }*/
  return Object.assign(parsed, parser);
}
