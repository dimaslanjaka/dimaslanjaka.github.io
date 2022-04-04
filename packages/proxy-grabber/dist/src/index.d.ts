import { returnObj } from './spys';
import Promise from 'bluebird';
import 'js-prototypes';
/**
 * Proxy Grabber
 */
declare class proxyGrabber {
    /**
     * Time to live
     */
    TTL: number;
    /**
     * Proxy Grabber Constructor
     * @param TTL Time To Live in Day
     */
    constructor(TTL?: number);
    method1(): Promise<returnObj[]>;
    method2(): Promise<returnObj[]>;
    method3(): Promise<returnObj[]>;
    /**
     * Get all grabbed proxies
     * @returns
     */
    get(): any;
    getDb(): {
        proxyListOrg: () => Promise<returnObj[]>;
        sslProxiesOrg: () => Promise<returnObj[]>;
        spys: () => Promise<returnObj[]>;
    };
    /**
     * Test all proxies
     * @param limit limit proxies each instance to test (0=unlimited)
     */
    test(limit?: number): any;
    toString(): string;
}
export = proxyGrabber;
