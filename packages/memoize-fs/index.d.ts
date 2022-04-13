
declare function memoizeFs(options: memoizeFs.MemoizeOptions): memoizeFs.Memoizer

declare namespace memoizeFs {
  export interface Options {
    cacheId?: string
    salt?: string
    maxAge?: number
    force?: boolean
    astBody?: boolean
    noBody?: boolean
    retryOnInvalidCache?: boolean
    serialize?: (val?: any) => string
    deserialize?: (val?: string) => any
  }

  export type MemoizeOptions = Options & { cachePath: string }
  export type FnToMemoize = (...args: any[]) => any

  export interface Memoizer {
    fn: (fnToMemoize: FnToMemoize, options?: Options) => Promise<FnToMemoize>
    invalidate: (id?: string) => Promise<any>
    getCacheFilePath: (fnToMemoize: FnToMemoize, options: Options) => string
  }
}

// @ts-ignore
export = memoizeFs
