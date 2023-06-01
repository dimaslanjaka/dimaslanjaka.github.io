/// <reference types="node" />
/// <reference types="node" />
import crypto from 'crypto';
import * as fs from 'fs-extra';
/**
 * MD5 file synchronously
 * @param path
 * @returns
 */
export declare function md5FileSync(path: string): string;
/**
 * PHP MD5 Equivalent
 * @param data
 * @returns
 */
export declare function md5(data: string): string;
export default function md5File(path: string): Promise<unknown>;
/**
 * convert file to hash
 * @param alogarithm
 * @param path
 * @param encoding
 * @returns
 */
export declare function file_to_hash(alogarithm: 'sha1' | 'sha256' | 'sha384' | 'sha512' | 'md5', path: fs.PathLike, encoding?: import('crypto').BinaryToTextEncoding): Promise<string>;
/**
 * convert data to hash (async)
 * @param alogarithm
 * @param data
 * @param encoding
 * @returns
 */
export declare function data_to_hash(alogarithm: 'sha1' | 'sha256' | 'sha384' | 'sha512' | 'md5', data: crypto.BinaryLike, encoding?: import('crypto').BinaryToTextEncoding): Promise<string>;
/**
 * convert data to hash (sync)
 * @param alogarithm
 * @param data
 * @param encoding
 * @returns
 */
export declare function data_to_hash_sync(alogarithm: 'sha1' | 'sha256' | 'sha384' | 'sha512' | 'md5', data: crypto.BinaryLike, encoding?: import('crypto').BinaryToTextEncoding): string;
/**
 * get hashes from folder
 * @param alogarithm
 * @param folder
 * @param options
 * @returns
 */
export declare function folder_to_hash(alogarithm: 'sha1' | 'sha256' | 'sha384' | 'sha512' | 'md5', folder: string, options: {
    /**
     * override pattern to search files
     */
    pattern: string;
    /**
     * ignore files by patterns from search
     */
    ignored: string[];
    /**
     * encoding type
     */
    encoding: crypto.BinaryToTextEncoding;
}): Promise<{
    filesWithHash: Record<string, string>;
    hash: string;
}>;
/**
 * convert data to hash
 * @param alogarithm
 * @param url
 * @param encoding
 * @returns
 */
export declare function url_to_hash(alogarithm: 'sha1' | 'sha256' | 'sha384' | 'sha512' | 'md5', url: string, encoding?: crypto.BinaryToTextEncoding): Promise<unknown>;
