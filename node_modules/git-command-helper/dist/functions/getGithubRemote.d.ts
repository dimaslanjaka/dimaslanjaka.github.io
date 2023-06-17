import { infoOptions } from './infoOptions';
/**
 * get origin url
 * * see {@link https://stackoverflow.com/a/4090938}
 * @param name remote name in config, default `origin`
 * @returns
 */
export declare function getGithubRemote(name?: string | null | undefined, opt?: infoOptions): Promise<string | void>;
