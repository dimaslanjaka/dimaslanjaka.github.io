import encryptionURL from './encryptionURL';
import { Nullable, resolveQueryResult } from './globals';
import { parseQuery } from './parseQuery';
import toURL from './toURL';

const _global_resolveQueryUrl = (typeof window !== 'undefined' ? window : global) as any;

/**
 * Auto resolve url
 * * parse base64, aes
 * @param url url string or instance, null = {@link window.location.search}
 * @param passphrase aes password
 * @returns
 */
export default function resolveQueryUrl(url?: string | URL, passphrase = 'root', debug = false) {
  const result: Nullable<Partial<resolveQueryResult>> = {};
  let href: Nullable<string> = null;
  if (url instanceof URL) {
    href = url.href;
  } else if (typeof url == 'string') {
    if (url.match(/^(#|\?)/)) {
      href = 'http://not.actually.domain/' + url;
    } else {
      const parse = toURL(url);
      if (parse !== null) href = parse.href;
    }
  } else if (typeof location == 'object' && typeof location.href == 'string') {
    href = location.href;
  }

  if (!href || !href.match(/#|\?/)) return null;

  const parse_query_url = parseQuery(null, href);
  if (typeof parse_query_url == 'object') {
    Object.keys(parse_query_url).forEach((key) => {
      const value = parse_query_url[key];
      result[key] = encryptionURL(value, passphrase, debug);
    });
  }

  return result;
}
_global_resolveQueryUrl.resolveQueryUrl = resolveQueryUrl;
