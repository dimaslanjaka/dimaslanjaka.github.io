
function memoizeFs<F extends memoizeFs.FnToMemoize>(options: memoizeFs.MemoizeOptions): memoizeFs.Memoizer

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
  export type FnToMemoize = (...args: any[]) => any | Promise<(...args: any[]) => any>

  export interface Memoizer {
    fn: <F extends FnToMemoize>(fnToMemoize: F, options?: Options) => Promise<F>
    invalidate: (id?: string) => Promise<any>
    getCacheFilePath: (fnToMemoize: FnToMemoize, options: Options) => string
  }
}

// @ts-ignore
export = memoizeFs
