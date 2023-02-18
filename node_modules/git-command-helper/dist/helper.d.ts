type syncFunc = (...args: any[]) => any;
type asyncFunc = (...args: any[]) => Promise<any>;
type typeFunc = syncFunc | asyncFunc;
export default class helper {
    /**
     * Suppress Catch of async function or catch of errors
     * @param cb
     * @returns null = failed (catch caught)
     */
    static suppress(cb: typeFunc): Promise<any | Error>;
    /**
     * is variable promise function?
     * @param p
     * @returns
     */
    static isPromise(p: typeFunc): boolean;
}
export {};
