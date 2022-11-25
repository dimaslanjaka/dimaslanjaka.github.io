'use strict';

import { Transform } from 'stream';

export type TransformCallback = (error?: Error | null, data?: any) => void;

export default class CacheStream extends Transform {
  private _cache: any[];
  constructor() {
    super();

    this._cache = [];
  }

  _transform(chunk: any, enc: BufferEncoding, callback: TransformCallback) {
    const buf = chunk instanceof Buffer ? chunk : Buffer.from(chunk, enc);
    this._cache.push(buf);
    this.push(buf);
    callback();
  }

  getCache() {
    return Buffer.concat(this._cache);
  }
}
