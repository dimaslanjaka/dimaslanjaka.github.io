type syncFunc = (...args: any[]) => any;
type asyncFunc = (...args: any[]) => Promise<any>;
type typeFunc = syncFunc | asyncFunc;

export default class helper {
  /**
   * Suppress Catch of async function or catch of errors
   * @param cb
   * @returns null = failed (catch caught)
   */
  static async suppress(cb: typeFunc): Promise<any | Error> {
    try {
      //return await Bluebird.resolve(cb).then((res) => res);
      if (this.isPromise(cb)) {
        return await (<asyncFunc>cb)();
      } else {
        return cb();
      }
    } catch (e) {
      return e;
    }
  }
  /**
   * is variable promise function?
   * @param p
   * @returns
   */
  static isPromise(p: typeFunc) {
    //console.log(Object.prototype.toString.call(p));
    return (
      p &&
      /\[object (Promise|AsyncFunction)\]/i.test(
        Object.prototype.toString.call(p)
      )
    );
  }
}
