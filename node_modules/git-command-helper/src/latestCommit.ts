import { SpawnOptions } from 'child_process';
import { deepmerge } from 'deepmerge-ts';
import spawner from './spawner';

export type GetLatestCommitHashOptions = Partial<SpawnOptions> & {
  short?: boolean;
};

/**
 * get latest commit hash
 * * git log --pretty=tformat:%H -n 1 path
 * * git log --pretty=tformat:%h -n 1 path
 * * git rev-parse HEAD
 * * git rev-parse --short HEAD
 * @param path get latest commit of specific folder, retain null for process.cwd()
 * @returns
 */
export const latestCommit = async (
  path?: string,
  options: Partial<GetLatestCommitHashOptions> = {}
) => {
  const default_options: GetLatestCommitHashOptions = {
    cwd: process.cwd()
  };
  options = deepmerge(default_options, options);
  const short = options.short || true;
  const args: string[] = [];
  if (!path) {
    args.push('rev-parse');
    if (short) args.push('--short');
    args.push('HEAD');
  } else {
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
