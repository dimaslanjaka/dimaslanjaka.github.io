// renew flow
// GET https://translate.google.com/gen204?proxye=website&client=webapp&sl=id&tl=en&hl=en&u=https%253A%252F%252F9f9f7cf85cf1.ngrok.io%252F2020%252F6%252F10%252Fupdate-gen
// GET https://translate.google.com/translate?hl=en&sl=id&tl=en&u=https%3A%2F%2F9f9f7cf85cf1.ngrok.io%2F2020%2F6%2F10%2Fupdate-genshin-impact-1.6.0-1.6.1.html&sandbox=1
// GET https://translate.googleusercontent.com/translate_p?hl=en&sl=id&tl=en&u=https://9f9f7cf85cf1.ngrok.io/2020/6/10/update-genshin-impact-1.6.0-1.6.1.html&depth=1&rurl=translate.google.com&sp=nmt4&pto=aue,ajax,boq&usg=ALkJrhgAAAAAYMQSbrcRl2o4a3kZsbz6V0Mz1jPOGzly
// GET https://translate.google.com/website?depth=1&hl=en&pto=aue,ajax,boq&rurl=translate.google.com&sl=id&sp=nmt4&tl=en&u=https://9f9f7cf85cf1.ngrok.io/2020/6/10/update-genshin-impact-1.6.0-1.6.1.html&usg=ALkJrhgP3S6k0r9M1L0I0usu2YoSrco1KQ
// GET https://9f9f7cf85cf1-ngrok-io.translate.goog/2020/6/10/update-genshin-impact-1.6.0-1.6.1.html?_x_tr_sl=id&_x_tr_tl=en&_x_tr_hl=en&_x_tr_pto=ajax
// GET https://translate.google.com/translate_un?sl=id&tl=en&u=https://9f9f7cf85cf1.ngrok.io/2020/6/10/update-genshin-impact-1.6.0-1.6.1.html&usg=ALkJrhg-dpAhmINQHidHIs0byhWyENzuSA

import { Curl, HeaderInfo } from 'node-libcurl';
import path from 'path';
import fs from 'fs';
import jsdom from 'jsdom';
const { JSDOM } = jsdom;
const cookieJarFile = path.join(__dirname, '/../../build/cookiejar.txt');

interface CurlOpt {
  method: 'GET' | 'POST' | 'HEAD' | 'PATCH' | 'OPTION';
  callback: (status: number, data: string | Buffer, headers: Buffer | HeaderInfo[], curlInstance: Curl) => void;
}

class Translator {
  sl: string;
  tl: string;
  result: string | Buffer;
  debug: false;

  constructor(sourceLang?: string, toLang?: string) {
    this.sl = sourceLang;
    this.tl = toLang;
  }

  try1(url: string, callback?: (html: string) => any) {
    const parseUrl = new URL(url);
    const self = this;
    this.request(`https://translate.google.com/gen204?proxye=website&client=webapp&sl=${this.sl}&tl=${this.tl}&hl=en&u=${encodeURIComponent(url)}`);

    this.request(`https://translate.google.com/translate?hl=en&sl=${this.sl}&tl=${this.tl}&u=${encodeURIComponent(url)}&sandbox=1`);

    this.request(
      `https://translate.googleusercontent.com/translate_p?hl=en&sl=${this.sl}&tl=${this.tl}&u=${decodeURIComponent(
        url
      )}&depth=1&rurl=translate.google.com&sp=nmt4&pto=aue,ajax,boq&usg=ALkJrhgAAAAAYMQSbrcRl2o4a3kZsbz6V0Mz1jPOGzly`
    );

    this.request(
      `https://translate.google.com/website?depth=1&hl=en&pto=aue,ajax,boq&rurl=translate.google.com&sl=${this.sl}&sp=nmt4&tl=${this.tl}&u=${decodeURIComponent(
        url
      )}&usg=ALkJrhgP3S6k0r9M1L0I0usu2YoSrco1KQ`
    );

    const parse = require('url').parse(url);
    this.request(`https://${parse.host.replace(/\./, '-')}.translate.goog${parseUrl.pathname}?_x_tr_sl=${this.sl}&_x_tr_tl=${this.tl}&_x_tr_hl=en&_x_tr_pto=ajax`);

    this.request(`https://translate.google.com/translate_un?sl=${this.sl}&tl=${this.tl}&u=${decodeURIComponent(url)}&usg=ALkJrhg-dpAhmINQHidHIs0byhWyENzuSA`);

    this.request(
      `http://translate.google.com/translate?depth=1&nv=1&rurl=translate.google.com&sl=${this.sl}&sp=nmt4&tl=${this.tl}&u=${encodeURI(url)}`,
      function (statusCode, data, headers, curlInstance) {
        self.result = data;
        if (typeof callback == 'function') {
          callback(String(data));
        }
      }
    );
    return this;
  }

  try2(html: string, callback?: (html: string) => any) {
    const self = this;
    let dom = new JSDOM(html);
    const contentFrame = dom.window.document.getElementById('contentframe');
    const iframe = contentFrame.getElementsByTagName('iframe');
    if (iframe.length > 0) {
      const frm: HTMLIFrameElement = iframe.item(0);
      this.request(frm.src, function (status, data, headers, curlInstance) {
        dom = new JSDOM(data);
        const hyperlinks = dom.window.document.getElementsByTagName('a');
        if (hyperlinks.length > 0) {
          self.request(hyperlinks.item(0).href, function (status, data, headers, curlInstance) {
            self.result = data;
            if (typeof callback == 'function') {
              callback(String(data));
            }
          });
        }
      });
    }

    return this;
  }

  extractTranslated(html: string) {
    const self = this;
    const dom = new JSDOM(html);
    // fix hyperlinks
    const hyperlinks: HTMLCollectionOf<HTMLAnchorElement> = dom.window.document.getElementsByTagName('a');
    for (let i = 0; i < hyperlinks.length; i++) {
      const hyperlink = hyperlinks.item(i);
      const href = new URL(hyperlink.href);
      const getHref = href.searchParams.get('u');
      if (getHref && getHref.length > 0) {
        hyperlink.href = getHref;
      }
    }
    dom.window.document.getElementById('gt-nvframe').remove();
    const head = dom.window.document.head;
    const base = head.getElementsByTagName('base');
    Array.from(base).map((basehtml: HTMLBaseElement) => {
      basehtml.remove();
    });
    return dom.serialize();
  }

  private capture(parentHtml: string) {
    const dom = new JSDOM(parentHtml);
    const script = dom.window.document.createElement('script');
    script.innerHTML = String(fs.readFileSync(path.join(__dirname, 'translate-capture.js')));
    dom.window.document.body.appendChild(script);
    return dom.serialize();
  }

  /**
   * Curl Requester
   * @param url
   * @param responseCallback
   */
  request(url: string, responseCallback?: CurlOpt['callback'] | CurlOpt) {
    if (this.debug) console.info(`GET ${url}`);
    const curl = new Curl();
    curl.setOpt(Curl.option.URL, url);
    curl.setOpt(Curl.option.COOKIEFILE, cookieJarFile);
    curl.setOpt(Curl.option.COOKIEJAR, cookieJarFile);
    if (!fs.existsSync(cookieJarFile)) {
      fs.writeFileSync(cookieJarFile, '');
    }
    // curl.setOpt(Curl.option.CONNECTTIMEOUT, 5)
    curl.setOpt(Curl.option.FOLLOWLOCATION, true);
    curl.setOpt(Curl.option.SSL_VERIFYHOST, false);
    curl.setOpt(Curl.option.SSL_VERIFYPEER, false);
    curl.setOpt(Curl.option.CUSTOMREQUEST, 'GET');
    //curl.setOpt(Curl.option.VERBOSE, true);
    curl.setOpt(Curl.option.USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36');

    // eslint-disable-next-line no-unused-vars
    curl.on('end', (statusCode, data, headers, curlInstance) => {
      /*
      console.info(statusCode);
      console.info("---");
      console.info(data.length);
      console.info("---");
      console.info(curl.getInfo("TOTAL_TIME"));
      console.info("---");
      console.info(headers);
      */
      if (typeof responseCallback == 'function') {
        responseCallback(statusCode, data, headers, curlInstance);
      }
      curl.close();
    });

    // Error will be a JS error, errorCode will be the raw error code (as int) returned from libcurl
    // eslint-disable-next-line no-unused-vars
    curl.on('error', (error, errorCode) => {
      curl.close();
    });

    //curl.on("error", curl.close.bind(curl));

    // this triggers the request
    curl.perform();
    return this;
  }

  toString() {
    return this.result || 'Translator Class';
  }
}

export default Translator;
