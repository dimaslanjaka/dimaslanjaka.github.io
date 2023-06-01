import { trueCasePathSync } from '../../utility/packages/sbg-utility/src/utils/filemanager/case-path';
import { safeURL } from '../utils/safe-url';
import { getGithubCurrentBranch } from './getGithubCurrentBranch';
import { getGithubRemote } from './getGithubRemote';
import { getGithubRootDir } from './getGithubRootDir';
import { infoOptions } from './infoOptions';

/**
 * Get github url for single file or folder
 * @param path path subfolder or file
 * @returns safe url
 */
export async function getGithubRepoUrl(path: string, opt: infoOptions = { cwd: process.cwd() }) {
  path = trueCasePathSync(path);
  const root = trueCasePathSync((await getGithubRootDir(opt)) || '');
  const remote = ((await getGithubRemote(null, opt)) || '').replace(/(.git|\/)$/i, '');

  let url = new URL(remote);
  url.pathname += '/tree/' + (await getGithubCurrentBranch(opt)) + path.replace(root, '');
  /**
   * url from repository url
   */
  const remoteURL = safeURL(url.toString());
  url = new URL(remote);
  url.pathname += '/raw/' + (await getGithubCurrentBranch(opt)) + path.replace(root, '');
  /**
   * url raw file
   */
  const rawURL = safeURL(url.toString());
  return {
    remoteURL,
    rawURL
  };
}
