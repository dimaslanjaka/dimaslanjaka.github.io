import encryptionURL from './encryptionURL';
import { Nullable, SafelinkOptions } from './globals';
import { default as _resolveQueryUrl } from './resolveQueryUrl';
import { bufferToString, streamToString } from './string';
import toURL from './toURL';

const _global_safelink = (typeof window !== 'undefined' ? window : global) as any;

export default class safelink {
  options: Partial<SafelinkOptions> = {
    exclude: [],
    redirect: ['https://www.webmanajemen.com/page/safelink.html?url='],
    password: 'root',
    verbose: false,
    type: 'base64'
  };
  constructor(opt: Partial<SafelinkOptions>) {
    if (typeof opt.redirect == 'string') opt.redirect = [opt.redirect];
    this.options = Object.assign(this.options, opt);
  }
  /**
   * is url excluded
   * @param url
   * @returns
   */
  isExcluded(url: string | URL) {
    const excludes = this.options.exclude;
    const value = String(url);
    const parsed = url instanceof URL ? url : toURL(value);
    // only process url with protocol
    if (value.match(/^(?:(ht|f)tp(s?):\/\/)?/)) {
      for (let i = 0; i < excludes.length; i++) {
        const pattern = excludes[i];

        if (typeof pattern == 'string' && typeof parsed === 'object' && parsed !== null) {
          // only validate full url
          if ((parsed.host || '').includes(pattern)) return true;
        } else if (pattern instanceof RegExp) {
          if (value.match(pattern)) return true;
        }
      }
    }
    return false;
  }

  /**
   * parse html string or element to anonymize urls
   * @param target
   * @returns
   */
  async parse(target: Nullable<string> | HTMLElement | Buffer | NodeJS.ReadWriteStream): Promise<Nullable<string>> {
    const self = this;
    let content: any = target;
    if (typeof target === 'string' || target instanceof HTMLElement) {
      content = target;
    } else if (Buffer.isBuffer(target)) {
      content = bufferToString(target);
    } else {
      content = await streamToString(target);
    }
    let result: string = null;
    if (typeof content === 'string' && content.trim().length > 0) {
      // make content as default result
      result = content;
      /**
       * regex match href of hyperlink element
       */
      const regex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/gim;
      /**
       * process string
       * @param content
       * @param href
       * @returns
       */
      const processStr = (content: string, href: string) => {
        const excluded = self.isExcluded(href);

        if (!excluded) {
          const encryption = encryptionURL(href, self.options.password, self.options.verbose);
          const enc = self.options.type == 'base64' ? encryption.base64.encode : encryption.aes.encode;
          const randRedir = self.options.redirect[Math.floor(Math.random() * self.options.redirect.length)];
          const newhref = randRedir + enc;
          // return anonymized href
          return content.replace(href, newhref);
        }
        // return original content
        return content;
      };

      const matches = Array.from(content.matchAll(regex)).filter((m) => m[2].trim().match(/^https?:\/\//));
      for (let i = 0; i < matches.length; i++) {
        const m = matches[i];
        const href = m[2].trim();
        const allMatch = m[0];

        if (typeof href == 'string' && href.length > 0) {
          const wholeContents = typeof result == 'string' ? result : content;
          if (typeof wholeContents === 'string') {
            const processedHyperlink = processStr(allMatch, href);
            if (processedHyperlink) {
              const processedContent = wholeContents.replace(allMatch, processedHyperlink);
              result = processedContent;
            }
          }
        }
      }
    } else if (content instanceof HTMLElement) {
      const tagname = content.tagName.toLowerCase();
      if (tagname != 'a') {
        const links = Array.from(content.querySelectorAll('a'));
        for (let i = 0; i < links.length; i++) {
          const a = links[i];
          if (!a.href) continue;
          const href = toURL(a.href);
          if (!href) {
            console.log(a.href, null);
            continue;
          }
          const encryption = encryptionURL(href, self.options.password, self.options.verbose);
          const excluded = self.isExcluded(href);
          if (self.options.verbose) {
            console.log(
              Object.assign(encryption, {
                url: href.href,
                isExcluded: excluded
              })
            );
          }

          if (!excluded) {
            const enc = self.options.type == 'base64' ? encryption.base64.encode : encryption.aes.encode;
            const randRedir = self.options.redirect[Math.floor(Math.random() * self.options.redirect.length)];
            a.href = randRedir + enc;
            a.target = '_blank';
            a.rel = 'nofollow noopener noreferer';
          }
        }
        result = content.outerHTML;
      }
    }
    return result;
  }

  /**
   * anonymize url directly
   * @param href
   */
  encodeURL(href: string) {
    const self = this;
    const encryption = encryptionURL(href, self.options.password, self.options.verbose);
    const enc = self.options.type == 'base64' ? encryption.base64.encode : encryption.aes.encode;
    const randRedir = self.options.redirect[Math.floor(Math.random() * self.options.redirect.length)];
    const newhref = randRedir + enc;
    return newhref;
  }
  /**
   * Resolve query url to decrypt anonymized urls (page redirector)
   * @param search
   * @returns
   */
  resolveQueryUrl(search?: string) {
    const self = this;
    const obj = _resolveQueryUrl(
      typeof search == 'string'
        ? search
        : typeof location == 'object' && typeof location.search == 'string'
        ? location.search
        : null,
      this.options.password,
      this.options.verbose
    );
    if (obj !== null && typeof obj === 'object') {
      Object.keys(obj).forEach((key) => {
        const encryptions = obj[key];
        if (encryptions.aes.encode) {
          encryptions.aes.encode_redirector = self.options.redirect + encryptions.aes.encode;
        }
        if (encryptions.base64.encode) {
          encryptions.base64.encode_redirector = self.options.redirect + encryptions.base64.encode;
        }
      });
    }
    return obj;
  }
}
_global_safelink.safelink = safelink;
