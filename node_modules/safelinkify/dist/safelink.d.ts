/// <reference types="node" />
/// <reference types="node" />
import { Nullable, SafelinkOptions } from './globals';
export default class safelink {
    options: Partial<SafelinkOptions>;
    constructor(opt: Partial<SafelinkOptions>);
    /**
     * is url excluded
     * @param url
     * @returns
     */
    isExcluded(url: string | URL): boolean;
    /**
     * parse html string or element to anonymize urls
     * @param target
     * @returns
     */
    parse(target: Nullable<string> | HTMLElement | Buffer | NodeJS.ReadWriteStream): Promise<Nullable<string>>;
    /**
     * anonymize url directly
     * @param href
     */
    encodeURL(href: string): string;
    /**
     * Resolve query url to decrypt anonymized urls (page redirector)
     * @param search
     * @returns
     */
    resolveQueryUrl(search?: string): Partial<import("./globals").resolveQueryResult>;
}
