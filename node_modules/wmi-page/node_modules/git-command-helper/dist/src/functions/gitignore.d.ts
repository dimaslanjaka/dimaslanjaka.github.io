import * as glob from 'glob';
/**
 * get all ignored files by .gitignore
 * @param param0
 * @returns
 */
export declare const getIgnores: ({ cwd }: {
    cwd?: string;
}) => Promise<{
    absolute: string;
    relative: string;
}[]>;
/**
 * is file ignored by `.gitignore`?
 * @param filePath `absolute` file path, but `relative` path must have `options.cwd`
 * @param options
 * @returns
 */
export declare function isIgnored(filePath: string, options?: {
    cwd: string;
}): Promise<boolean>;
/**
 * get and parse all `.gitignore` files
 */
export declare function getAllIgnoresConfig(options: glob.GlobOptionsWithFileTypesFalse): Promise<string[]>;
/**
 * get all `.gitignore` files
 * @param searchDir
 * @returns
 */
export declare function getGitignoreFiles(opt: glob.GlobOptionsWithFileTypesFalse): Promise<string[]>;
