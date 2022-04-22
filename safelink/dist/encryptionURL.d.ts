import { Nullable } from './resolveQueryUrl';
interface encryptionURLResult {
    value: Nullable<string>;
    base64: {
        encode: Nullable<string>;
        decode: Nullable<string>;
    };
    aes: {
        encode: Nullable<string>;
        decode: Nullable<string>;
        passphrase: string;
    };
}
/**
 * resolve url encryption
 * @param url
 * @param passphrase
 * @returns
 */
export default function encryptionURL(url: Nullable<string | URL>, passphrase?: string, debug?: boolean): encryptionURLResult;
export {};
