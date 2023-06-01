import { spawnAsync } from '../spawn';
/**
 * get current branch informations
 * @returns
 */
export declare function getGithubBranches(opt?: spawnAsync.SpawnOptions): Promise<void | {
    active: boolean;
    branch: string;
}[]>;
