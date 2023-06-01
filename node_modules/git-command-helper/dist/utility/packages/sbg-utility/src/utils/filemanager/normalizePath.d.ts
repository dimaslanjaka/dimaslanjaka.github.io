/**
 * UNIX join path with true-case-path
 * @description normalize path and make drive letter uppercase
 * @param str
 * @returns Unix Style Path
 */
export declare function normalizePath(...str: string[]): string;
/**
 * UNIX join path with auto create dirname when not exists
 * @param path
 * @returns
 */
export declare function joinSolve(...paths: string[]): string;
export default normalizePath;
