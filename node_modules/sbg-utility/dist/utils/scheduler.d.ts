/** SCHEDULER JOB **/
/*** Postpone executing functions ***/
/**
 * Bind functions to exit handler
 * @param key
 * @param fn
 */
export declare function bindProcessExit(key: string, fn: (...args: any[]) => any): void;
/**
 * @example
 * ```js
 * bindProcessExit("scheduler_on_exit", function () {
 *    _log.info("executing scheduled functions");
 *    scheduler.executeAll();
 * });
 * ```
 * or
 * ```js
 * scheduler.register();
 * ```
 */
export declare class scheduler {
    static verbose: boolean;
    constructor();
    private static registered;
    /**
     * Register scheduler to process system
     */
    static register(): void;
    /**
     * Add function with key to list
     * @param key existing key (duplicate) will be overwritten
     * @param value
     */
    static add(key: string, value: () => any): void;
    private static postponeCounter;
    /**
     * Add function to postpone, the functions will be executed every 5 items added
     */
    static postpone(key: string, value: () => any): void;
    /**
     * Execute functon in key and delete
     * @param key
     */
    static execute(key: string, deleteAfter?: boolean): void;
    /**
     * Execute all function lists
     */
    static executeAll(): Promise<void>;
}
export default scheduler;
