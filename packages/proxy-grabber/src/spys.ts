import { curly } from 'node-libcurl';
import 'js-prototypes';
import Promise from 'bluebird';
import { parser } from './parser/spys.txt';
export { returnObj as returnObj, parser as parse } from './parser/spys.txt';

/**
 * Grab Spys
 * @returns
 */
function spys() {
  return Promise.resolve(curly.get('http://spys.me/proxy.txt')).then((res) => {
    if (res.statusCode == 200) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const regex =
        /(\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b):?(\d{2,5})/gm;

      return parser(<string>res.data);
    }
  });
}

export default spys;
