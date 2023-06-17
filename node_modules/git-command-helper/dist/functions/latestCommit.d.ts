/// <reference types="node" />
import { SpawnOptions } from 'child_process';
export type GetLatestCommitHashOptions = Partial<SpawnOptions> & {
    /**
     * short hash format. default: `true`
     */
    short?: boolean;
};
/**
 * get latest commit hash (support get last commit hash from file)
 * * git log --pretty=tformat:%H -n 1 path
 * * git log --pretty=tformat:%h -n 1 path
 * * git rev-parse HEAD
 * * git rev-parse --short HEAD
 * @param filePath get latest commit of specific folder, retain null for process.cwd()
 * @param options spawn options
 * @returns
 * @example
 * // get last commit of this dir
 * latestCommit(null, { cwd: __dirname }).then(console.log);
 * // get last commit of single file
 * latestCommit(path.join(__dirname, 'path/to/folder/file')).then(console.log);
 */
export declare const latestCommit: (filePath?: string | null, options?: Partial<GetLatestCommitHashOptions>) => Promise<string>;
