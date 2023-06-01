import { persistentCache } from 'persistent-cache';
import through2 from 'through2';
/**
 * calculate sha1sum of file
 * @param file
 * @returns
 */
export declare function getShaFile(file: string): string;
export type gulpCachedOpt = Parameters<typeof persistentCache>[0] & {
    prefix?: string;
    /**
     * dest folder
     * * required cwd option
     * * ~cannot match different extension
     */
    dest?: string;
    /**
     * cwd source
     * * required dest option
     * * ~cannot match different extension
     */
    cwd?: string;
    /**
     * verbose
     */
    verbose?: boolean;
    /**
     * delete after process.exit
     */
    deleteOnExit?: boolean;
};
export declare function gulpCached(options: gulpCachedOpt & {
    dest?: string;
    cwd?: string;
}): ReturnType<typeof through2.obj>;
export default gulpCached;
