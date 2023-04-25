export * from './git';
export {
  default as GithubInfo,
  getGithubBranches,
  getGithubCurrentBranch,
  getGithubRemote,
  getGithubRepoUrl,
  getGithubRootDir
} from './git-info';
export * from './spawn';
export { default as gitSubmodule } from './submodule';

//
