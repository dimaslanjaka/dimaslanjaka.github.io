/* eslint-disable @typescript-eslint/no-empty-function */
import 'js-prototypes';
import axios, { AxiosRequestConfig } from 'axios';

type ObjectAlias = object;
type AxiosConfigShadow = AxiosRequestConfig &
  ObjectAlias & {
    [key: string]: any;
  };

const axiosDefault = (url: string): AxiosConfigShadow => {
  return {
    baseURL: url,
    maxRedirects: 5,
    timeout: 1000 * 5, // Wait for 5 seconds
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
      Referer: 'http://google.com/crawler',
    },
  };
};

export function get(url: string, options?: AxiosConfigShadow) {
  const opt = ObjectReplaceFrom(axiosDefault(url), options);
  const instance = axios.create(opt);

  return instance.get(url).then((res) => {
    const statusCode = res.status;

    if (statusCode == 301 || statusCode == 302) {
      console.log(res.headers);
      return null;
    }
    return res;
  });
  /*.catch((reason: AxiosError) => {
      if (reason.response?.status === 400) {
        // Handle 400
      } else {
        // Handle else
      }
      return reason;
    });*/
}

export function testProxy(proxy: string, target = 'http://google.com', options?: AxiosConfigShadow) {
  const def = {
    /*USERAGENT:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
    FOLLOWLOCATION: true,
    REFERER: 'https://webmanajemen.com',
    httpProxyTunnel: '1L',
    PROXY: proxy,*/
  };

  return get(target, ObjectReplaceFrom(def, options));
}

/**
 * Object replace value by key from another object
 * @param obj Object to replace
 * @param anotherobj Replace key from this object
 * @returns
 */
function ObjectReplaceFrom<T>(obj: T, anotherobj: Record<string, any>): T {
  if (typeof anotherobj == 'object') {
    for (const key in anotherobj) {
      if (Object.prototype.hasOwnProperty.call(anotherobj, key)) {
        const element = anotherobj[key];
        obj[key] = element;
      }
    }
  }
  return obj;
}

export default {
  testProxy,
  curlGET: get,
  ObjectReplaceFrom,
};
