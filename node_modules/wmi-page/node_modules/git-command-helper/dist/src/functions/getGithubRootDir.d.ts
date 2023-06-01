import { infoOptions } from './infoOptions';
/**
 * get root directory of local repository
 * * see {@link https://stackoverflow.com/a/957978}
 * @returns
 */
export declare function getGithubRootDir(opt?: infoOptions): Promise<string>;
