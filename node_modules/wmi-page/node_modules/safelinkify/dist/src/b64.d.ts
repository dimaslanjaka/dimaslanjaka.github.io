import { Nullable } from './globals';
export declare const b64: {
    encode: (str: string) => Nullable<string>;
    decode: (encoded: string) => Nullable<string>;
};
export default b64;
