/**
 * fix case-sensitive conflict
 * @see {@link https://stackoverflow.com/a/55541435/6404439}
 * @param cwd
 * @param messageCommit
 */
export declare function fixCaseSensitive(cwd: string, messageCommit?: string): Promise<void>;
