/// <reference types="node" />
import { SpawnOptions } from 'child_process';
export declare type GetLatestCommitHashOptions = Partial<SpawnOptions> & {
    short?: boolean;
};
/**
 * get latest commit hash
 * * git log --pretty=tformat:%H -n 1 path
 * * git log --pretty=tformat:%h -n 1 path
 * * git rev-parse HEAD
 * * git rev-parse --short HEAD
 * @param path get latest commit of specific folder, retain null for process.cwd()
 * @returns
 */
export declare const latestCommit: (path?: string, options?: Partial<GetLatestCommitHashOptions>) => Promise<string>;
