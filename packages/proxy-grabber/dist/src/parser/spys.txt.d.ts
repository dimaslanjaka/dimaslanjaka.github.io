import 'js-prototypes';
export declare type returnObj = {
    /**
     * IP:PORT
     */
    proxy: string;
    /**
     * Country Code
     */
    code: string;
    /**
     * Anonymity
     * * A: Anonymous
     * * H: High Anonymous / Elite Proxy
     * * N: Transparent
     */
    anonymity: string | 'A' | 'N' | 'H';
    /**
     * Can access SSL/HTTPS?
     */
    ssl: boolean;
    /**
     * Can access google?
     */
    google: boolean;
    /**
     * Has cloudflare alert?
     */
    alert: boolean;
    /**
     * Proxy Type
     */
    type: string | 'http' | 'socks4' | 'socks5';
    /**
     * Test Result
     */
    test: string | 'PASSED' | 'FAILED';
};
/**
 * Parse data from spys
 * @param data
 * @returns
 */
declare function parse(data: string): returnObj[];
export default parse;
export declare const parser: typeof parse;
