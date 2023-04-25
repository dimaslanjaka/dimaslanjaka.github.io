import { SpawnOptions } from 'child_process';
import { deepmerge } from 'deepmerge-ts';
import spawner from './spawner';

export type GetLatestCommitHashOptions = Partial<SpawnOptions> & {
  /**
   * short hash format
   */
  short?: boolean;
};

/**
 * get latest commit hash (support get last commit hash from file)
 * * git log --pretty=tformat:%H -n 1 path
 * * git log --pretty=tformat:%h -n 1 path
 * * git rev-parse HEAD
 * * git rev-parse --short HEAD
 * @param path get latest commit of specific folder, retain null for process.cwd()
 * @param options spawn options
 * @returns
 * @example
 * // get last commit of this dir
 * latestCommit(null, { cwd: __dirname }).then(console.log);
 * // get last commit of single file
 * latestCommit(path.join(__dirname, 'path/to/folder/file')).then(console.log);
 */
export const latestCommit = async (path?: string | null, options: Partial<GetLatestCommitHashOptions> = {}) => {
  const default_options: GetLatestCommitHashOptions = {
    cwd: process.cwd()
  };
  options = deepmerge(default_options, options);
  const short = options.short || true;
  const args: string[] = [];
  if (!path) {
    // get last commit hash of cwd
    args.push('rev-parse');
    if (short) args.push('--short');
    args.push('HEAD');
  } else {
    // get last commit hash of specific path
    args.push('log');
    if (!short) {
      args.push('--pretty=tformat:%H');
    } else {
      args.push('--pretty=tformat:%h');
    }
    args.push('-n');
    args.push('1');
    args.push(path);
  }
  const res = await spawner.promise(options, 'git', ...args);
  return res.stdout[0] as string;
};
