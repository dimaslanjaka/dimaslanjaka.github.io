import encryptionURL from './encryptionURL';
import { Nullable } from './resolveQueryUrl';
interface Options {
    exclude: string[] | RegExp[];
    redirect?: string;
    password: string;
    verbose?: boolean;
    type: 'base64' | 'aes';
}
interface ResultParse extends ReturnType<typeof encryptionURL> {
    href: string;
}
export default class safelink {
    options: Partial<Options>;
    constructor(opt: Partial<Options>);
    private isExcluded;
    parse(str: Nullable<string> | HTMLElement): Promise<ResultParse[]>;
}
export {};
