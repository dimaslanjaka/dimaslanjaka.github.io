import Promise from 'bluebird';
import htmlParser from 'node-html-parser';
import { get as curlGET } from './curl';
import { returnObj } from './spys';

//https://proxy-list.org/english/search.php?search=ssl-no&country=any&type=any&port=any&ssl=any&p1-10
function proxyListOrg() {
  return Promise.resolve(
    curlGET('https://proxy-list.org/english/search.php?search=ssl-no&country=any&type=any&port=any&ssl=any&p1'),
  ).then((res) => {
    const data = res.data;
    const parser = htmlParser(data.toString());
    const objectWrapper: returnObj[] = [];
    parser.querySelectorAll('ul').map((ul) => {
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
      if (ul.innerHTML.includes("Proxy('")) {
        const li = ul.querySelectorAll('li');
        if (li) {
          const proxy = li[0].rawText;
          const extract = /Proxy\(['"](.*)['"]\)/gm.exec(proxy);
          const decode = Buffer.from(extract[1], 'base64').toString('ascii');
          buildObject.proxy = decode;
          const type = li[1].rawText.trim().toLowerCase();
          buildObject.ssl = type == 'https';
          const anonymity = li[3].rawText.trim().toLowerCase();
          switch (anonymity) {
            case 'anonymous':
              buildObject.anonymity = 'A';
              break;
            case 'transparent':
              buildObject.anonymity = 'N';
              break;
            case 'elite':
              buildObject.anonymity = 'H';
              break;
            default:
              buildObject.anonymity = 'N';
              break;
          }
          const location = li[4].querySelector('[class*=flag]');
          buildObject.code = location.classList.toString().replace('flag', '').trim().toUpperCase();
          objectWrapper.push(buildObject);
        }
      }
      return buildObject;
    });
    return objectWrapper;
  });
}
export = proxyListOrg;
