import { spawnAsync } from '../spawn';
/**
 * get current branch
 * @returns
 */
export declare function getGithubCurrentBranch(opt?: spawnAsync.SpawnOptions): Promise<string | void>;
