/**
 * sort alphabetically object by key
 * @param obj
 * @returns
 */
export declare function orderKeys<T extends Record<string, any>>(obj: Record<string, any>): T;
/**
 * get object property by key, supress typescript error
 * @param item
 * @param key
 * @returns
 */
export declare function getObjectProperty(item: Record<string, any>, key: string): any;
