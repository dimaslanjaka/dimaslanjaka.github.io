/// <reference types="node" />
/// <reference types="node" />
import { Transform } from 'stream';
export type TransformCallback = (error?: Error | null, data?: any) => void;
export default class CacheStream extends Transform {
    private _cache;
    constructor();
    _transform(chunk: any, enc: BufferEncoding, callback: TransformCallback): void;
    getCache(): Buffer;
}
