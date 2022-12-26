/**
 * safelink options
 */
export interface SafelinkOptions {
  exclude: string[] | RegExp[] | (string | RegExp)[];
  redirect?: string[] | string;
  password: string;
  verbose?: boolean;
  type: string | 'base64' | 'aes';
}

export type Nullable<T> = T | null | undefined;

export interface encryptionURLResult {
  aes: {
    encode: Nullable<string>;
    encode_redirector: Nullable<string>;
    decode: Nullable<string>;
    passphrase: string;
  };
  base64: {
    encode_redirector: Nullable<string>;
    encode: Nullable<string>;
    decode: Nullable<string>;
  };
  value: Nullable<string>;
}

export interface resolveQueryResult {
  [key: string]: encryptionURLResult;
}
