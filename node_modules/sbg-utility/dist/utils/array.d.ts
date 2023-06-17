/**
 * pick random items from array
 * @param items
 * @returns
 */
export declare function array_random<T extends any[]>(items: T): T[number];
/**
 * unique array
 * * array of string,number
 * * array of object by object key
 * @param arr
 * @param field key name (for array of object)
 * @returns
 *
 * @example
 * arrayOfObjUniq({p:'x',n:'x'},{p:'23',n:'x'},{p:'x',n:'5g'}, 'p'); // [{p:'x',n:'x'},{p:'23',n:'x'}]
 *
 * @link https://stackoverflow.com/a/67322087/6404439
 */
export declare function array_unique<T extends any[]>(arr: T, field?: string): T;
/**
 * Remove empties from array
 * @param arr
 * @returns
 */
export declare function array_remove_empty<T extends any[]>(arr: T): any[];
/**
 * unique array of object by object key
 * @param arr
 * @param field key name
 * @returns
 * @see {@link https://stackoverflow.com/a/67322087/6404439}
 * @example
 * const arrobj = [{p:'x',n:'x'},{p:'23',n:'x'},{p:'x',n:'5g'}],
 * arrayOfObjUniq(arrobj, 'p'); // [{p:'x',n:'x'},{p:'23',n:'x'}]
 */
export declare function arrayOfObjUniq<T extends any[]>(arr: T, field: string): T;
/**
 * array shuffler
 * @param items
 * @returns
 */
export declare function array_shuffle<T extends any[]>(items: T): T;
/**
 * generate random number
 * @see {@link https://stackoverflow.com/a/65638217/6404439}
 * @param n
 * @returns
 */
export declare const rand: (n: number) => number;
/**
 * fast shuffle array using swap method
 * @see {@link https://stackoverflow.com/a/65638217/6404439}
 * @param t
 */
export declare function array_shuffle_swap<T extends any[]>(t: T): void;
/**
 * flattern array
 * @param arr
 * @returns
 */
export declare function array_flatten<T extends any[], N extends number = 1>(arr: T, depth?: N): FlatArray<T, N>[];
