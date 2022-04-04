import Promise from 'bluebird';
import htmlParser from 'node-html-parser';
import { get as curlGET } from './curl';
import { returnObj } from './spys';

function sslProxiesOrg() {
  return Promise.resolve(curlGET('http://www.sslproxies.org')).then((res) => {
    const data = res.data;
    const regex = /[0-9]{1,4}.[0-9]{1,4}.[0-9]{1,4}.[0-9]{1,4}/gm;
    const regex2 = /[0-9]{1,4}.[0-9]{1,4}.[0-9]{1,4}.[0-9]{1,4}:[0-9]{1,5}/gm;
    const parser = htmlParser(data.toString());
    const objectWrapper: returnObj[] = [];
    parser.querySelectorAll('table').map((el) => {
      el.querySelectorAll('tr').map((tr) => {
        const buildObject: returnObj = {
          proxy: null,
          code: null,
          anonymity: null,
          ssl: null,
          google: null,
          alert: null,
          type: 'http',
          test: null,
        };
        const td = tr.querySelectorAll('td');
        const proxy = td[0];
        const port = td[1];
        const countryCode = td[2];
        const anonymity = td[4];
        const google = td[5];
        const ssl = td[6];
        if (proxy && /^\d/.test(proxy.rawText)) {
          //console.log(proxy.rawText, port.rawText, countryCode.rawText, anonymity.rawText, google.rawText, ssl.rawText);
          buildObject.proxy = `${proxy.rawText.trim()}:${port.rawText.trim()}`;
          buildObject.google = /^yes/.test(google.rawText.trim()) ? true : false;
          buildObject.ssl = /^yes/.test(ssl.rawText.trim()) ? true : false;
          buildObject.code = countryCode.rawText.trim();
          switch (anonymity.rawText.trim()) {
            case 'elite proxy':
              buildObject.anonymity = 'H';
              break;
            case 'anonymous':
              buildObject.anonymity = 'A';
              break;

            default:
              buildObject.anonymity = 'N';
              break;
          }
          objectWrapper.push(buildObject);
        }
      });
    });
    return objectWrapper;
  });
}

export = sslProxiesOrg;
