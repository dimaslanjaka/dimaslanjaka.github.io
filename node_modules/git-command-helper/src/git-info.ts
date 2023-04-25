import { trueCasePathSync } from 'true-case-path';
import noop from './noop';
import { spawnAsync } from './spawn';

/**
 * get root directory of local repository
 * * see {@link https://stackoverflow.com/a/957978}
 * @returns
 */
export async function getGithubRootDir(opt: spawnAsync.SpawnOptions = {}) {
  try {
    const result = await spawnAsync('git', 'rev-parse --show-toplevel'.split(' '), opt);
    return result.stdout.trim();
  } catch (err) {
    return noop(err);
  }
}

/**
 * get origin url
 * * see {@link https://stackoverflow.com/a/4090938}
 * @param name remote name in config, default `origin`
 * @returns
 */
export async function getGithubRemote(name: string | null | undefined = 'origin', opt: spawnAsync.SpawnOptions = {}) {
  try {
    if (!name) name = 'origin';
    const result = await spawnAsync('git', `config --get remote.${name}.url`.split(' '), opt);
    return result.stdout.trim();
  } catch (err) {
    return noop(err);
  }
}

/**
 * Get github url for single file or folder
 * @param path path subfolder or file
 */
export async function getGithubRepoUrl(path: string, opt: spawnAsync.SpawnOptions = {}) {
  path = trueCasePathSync(path);
  const root = trueCasePathSync((await getGithubRootDir(opt)) || '');
  const remote = ((await getGithubRemote(null, opt)) || '').replace(/(.git|\/)$/i, '');

  let url = new URL(remote);
  url.pathname += '/tree/' + (await getGithubCurrentBranch(opt)) + path.replace(root, '');
  const remoteURL = url.toString();
  url = new URL(remote);
  url.pathname += '/raw/' + (await getGithubCurrentBranch(opt)) + path.replace(root, '');
  const rawURL = url.toString();
  return {
    remoteURL,
    rawURL
  };
}

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
    return noop(err);
  }
}

/**
 * get current branch
 * @returns
 */
export async function getGithubCurrentBranch(opt: spawnAsync.SpawnOptions = {}) {
  try {
    const result = await spawnAsync('git', ['branch', '--show-current'], opt);
    return result.stdout.trim();
  } catch (err) {
    return noop(err);
  }
}

const GithubInfo = {
  getGithubCurrentBranch,
  getGithubRemote,
  getGithubRepoUrl,
  getGithubRootDir,
  getGithubBranches
};

export default GithubInfo;
