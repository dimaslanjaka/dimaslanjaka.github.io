/**
 * check file is untracked
 * @param filePath
 */
export declare function isUntracked(filePath: string, opt?: {
    cwd: string;
}): Promise<boolean>;
