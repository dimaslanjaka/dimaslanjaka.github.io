/**
 * Chainable function runner
 * @param schedule array of function objects
 */
export declare function chain(schedule: {
    /**
     * function to call inside chains
     */
    callback: (...args: any[]) => any;
    opt?: {
        /**
         * run before callback called
         */
        before?: (...args: any[]) => any;
        /**
         * run after callback called
         */
        after?: (...args: any[]) => any;
    };
}[]): Promise<void>;
