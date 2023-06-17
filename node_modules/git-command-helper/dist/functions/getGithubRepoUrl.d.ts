import { infoOptions } from './infoOptions';
/**
 * Get github url for single file or folder
 * @param path path subfolder or file
 * @returns safe url
 */
export declare function getGithubRepoUrl(path: string, opt?: infoOptions): Promise<{
    remoteURL: string;
    rawURL: string;
}>;
