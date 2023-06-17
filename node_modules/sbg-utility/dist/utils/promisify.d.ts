import Bluebird from 'bluebird';
/**
 * easy typescript synchronous function type
 */
export type CallableFunctions = (...args: any[]) => any;
/**
 * easy typescript asynchronous function type
 */
export type CallablePromiseFunctions = (...args: any[]) => Promise<any>;
/**
 * easy typescript function type
 */
export type CallableMixFunctions = CallableFunctions | CallablePromiseFunctions;
/**
 * make any function or value to be promise
 * @param func
 * @param options
 * @returns
 */
export declare const promisify: typeof Bluebird.promisify;
