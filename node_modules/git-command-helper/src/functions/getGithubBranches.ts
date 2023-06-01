import _ from 'lodash';
import { spawnAsync } from '../spawn';

/**
 * get current branch informations
 * @returns
 */
export async function getGithubBranches(opt: spawnAsync.SpawnOptions = {}) {
  try {
    const result = await spawnAsync('git', ['branch'], opt);
    return result.stdout
      .trim()
      .split(/\n/)
      .map((str) => str.split(/\s/).map((str_1) => str_1.trim()))
      .filter((str_2) => str_2.length > 0)
      .map((item) => {
        return {
          active: item.length > 1,
          branch: item[1]
        };
      })
      .filter((item_1) => typeof item_1.branch === 'string');
  } catch (err) {
    return _.noop(err);
  }
}
