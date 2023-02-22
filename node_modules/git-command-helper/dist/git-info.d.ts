import { spawnAsync } from './spawn';
/**
 * get root directory of local repository
 * * see {@link https://stackoverflow.com/a/957978}
 * @returns
 */
export declare function getGithubRootDir(opt?: spawnAsync.SpawnOptions): Promise<string | void>;
/**
 * get origin url
 * * see {@link https://stackoverflow.com/a/4090938}
 * @param name remote name in config, default `origin`
 * @returns
 */
export declare function getGithubRemote(name?: string | null | undefined, opt?: spawnAsync.SpawnOptions): Promise<string | void>;
/**
 * Get github url for single file or folder
 * @param path path subfolder or file
 */
export declare function getGithubRepoUrl(path: string, opt?: spawnAsync.SpawnOptions): Promise<{
    remoteURL: string;
    rawURL: string;
}>;
/**
 * get current branch informations
 * @returns
 */
export declare function getGithubBranches(opt?: spawnAsync.SpawnOptions): Promise<void | {
    active: boolean;
    branch: string;
}[]>;
/**
 * get current branch
 * @returns
 */
export declare function getGithubCurrentBranch(opt?: spawnAsync.SpawnOptions): Promise<string | void>;
declare const GithubInfo: {
    getGithubCurrentBranch: typeof getGithubCurrentBranch;
    getGithubRemote: typeof getGithubRemote;
    getGithubRepoUrl: typeof getGithubRepoUrl;
    getGithubRootDir: typeof getGithubRootDir;
    getGithubBranches: typeof getGithubBranches;
};
export default GithubInfo;
