import dbl from './db';
import spys, { returnObj } from './spys';
import moment from 'moment';
import sslProxiesOrg from './sslproxies';
import Promise from 'bluebird';
import proxyListOrg from './proxylist';
import path from 'path';
import curl from './curl';
import 'js-prototypes';
const db = new dbl(path.join(process.cwd(), 'databases/proxies'));

/**
 * Proxy Grabber
 */
class proxyGrabber {
  /**
   * Time to live
   */
  TTL: number;
  /**
   * Proxy Grabber Constructor
   * @param TTL Time To Live in Day
   */
  constructor(TTL = 1) {
    this.TTL = TTL;
  }
  method1(): Promise<returnObj[]> {
    const lastUpdated = db.exists('/spys/lastUpdated') ? db.get('/spys/lastUpdated') : 100;
    // if spys last grab is more than 1 day
    if (moment().diff(lastUpdated, 'days') > this.TTL) {
      return spys().then((proxies) => {
        db.push('/spys/lastUpdated', new Date());
        db.push('/spys/proxies', proxies);
        return proxies;
      });
    }
    return Promise.resolve(db.get('/spys/proxies'));
  }

  method2(): Promise<returnObj[]> {
    const lastUpdated = db.exists('/sslProxiesOrg/lastUpdated') ? db.get('/sslProxiesOrg/lastUpdated') : 100;
    if (moment().diff(lastUpdated, 'days') > this.TTL) {
      return sslProxiesOrg().then((proxies) => {
        db.push('/sslProxiesOrg/lastUpdated', new Date());
        db.push('/sslProxiesOrg/proxies', proxies);
        return proxies;
      });
    }
    return Promise.resolve(db.get('/sslProxiesOrg/proxies'));
  }

  method3(): Promise<returnObj[]> {
    const lastUpdated = db.exists('/proxyListOrg/lastUpdated') ? db.get('/proxyListOrg/lastUpdated') : 100;
    if (moment().diff(lastUpdated, 'days') > this.TTL) {
      return proxyListOrg().then((proxies) => {
        db.push('/proxyListOrg/lastUpdated', new Date());
        db.push('/proxyListOrg/proxies', proxies);
        return proxies;
      });
    }
    return Promise.resolve(db.get('/proxyListOrg/proxies'));
  }

  /**
   * Get all grabbed proxies
   * @returns
   */
  get() {
    //return Object.assign(this.method1(), this.method2());
    return this.method1().then((proxies) => {
      return this.method2().then((proxies2) => {
        return this.method3().then((proxies3) => {
          return Object.assign(proxies, proxies2, proxies3);
        });
      });
    });
  }

  getDb() {
    return { proxyListOrg: this.method3, sslProxiesOrg: this.method2, spys: this.method1 };
  }

  /**
   * Test all proxies
   * @param limit limit proxies each instance to test (0=unlimited)
   */
  test(limit = 10) {
    const self = this;
    function testProxies(proxies: returnObj[], dbKey: string) {
      return proxies.map((obj) => {
        const result: TestResult = { error: true, proxy: null, message: null, code: 0 };
        return curl
          .testProxy(obj.proxy, 'https://httpbin.org/get', { HTTPHEADER: ['Accept: application/json'], TIMEOUT: '60L' })
          .then((res) => {
            //console.log({ proxy: obj.proxy, origin: res.data.origin });
            //console.log(res.headers[1]['content-type'] == 'application/json');
            result.error = res.status != 200 && res.headers[1]['content-type'] != 'application/json';
            result.proxy = obj;
            obj.test = !result.error ? 'PASSED' : 'FAILED';
            db.edit(dbKey, obj, { proxy: obj.proxy as string } as returnObj);
            return result;
          })
          .catch((e: Error) => {
            result.error = true;
            result.proxy = obj;
            result.message = e.message;
            result.code = e['code'] as number;
            return result;
          });
      });
    }

    function getProxies() {
      const getProxies = [self.method1(), self.method2(), self.method3()];
      let results: TestResult[] = [];
      return Promise.all(getProxies).map((proxies, index) => {
        // calculate database key
        let dbKey: string;
        switch (index) {
          case 0:
            dbKey = '/spys/proxies';
            break;
          case 1:
            dbKey = '/sslProxiesOrg/proxies';
            break;
          case 2:
            dbKey = '/proxyListOrg/proxies';
            break;
        }

        if (dbKey) {
          proxies = proxies.uniqueObjectKey('proxy').shuffle();
          if (limit > 0) proxies.length = limit;
          const test = testProxies(proxies, dbKey).map((tested) => {
            return tested.then((result) => {
              results = results.concat(result);
              return Promise.all(results);
            });
          });
          return Promise.all(test).then(() => {
            console.log('test', index + 1, 'done');
            return results;
          });
        } else {
          console.log('dbKey not found');
        }
      });
    }

    return getProxies();
  }

  toString() {
    return JSON.stringify(this.get());
  }
}

interface TestResult {
  error: boolean;
  proxy: returnObj;
  message?: string;
  code?: number;
}

export = proxyGrabber;
