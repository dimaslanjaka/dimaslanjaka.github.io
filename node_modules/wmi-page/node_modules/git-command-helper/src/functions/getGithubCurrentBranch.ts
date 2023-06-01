import _ from 'lodash';
import { spawnAsync } from '../spawn';

/**
 * get current branch
 * @returns
 */
export async function getGithubCurrentBranch(opt: spawnAsync.SpawnOptions = {}) {
  try {
    const result = await spawnAsync('git', ['branch', '--show-current'], opt);
    return result.stdout.trim();
  } catch (err) {
    return _.noop(err);
  }
}
