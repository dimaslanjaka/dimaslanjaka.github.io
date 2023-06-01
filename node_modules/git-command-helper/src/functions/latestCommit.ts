import { SpawnOptions } from 'child_process';
import spawner from '../spawner';

export type GetLatestCommitHashOptions = Partial<SpawnOptions> & {
  /**
   * short hash format. default: `true`
   */
  short?: boolean;
  //verbose?: boolean;
};

/**
 * get latest commit hash (support get last commit hash from file)
 * * git log --pretty=tformat:%H -n 1 path
 * * git log --pretty=tformat:%h -n 1 path
 * * git rev-parse HEAD
 * * git rev-parse --short HEAD
 * @param filePath get latest commit of specific folder, retain null for process.cwd()
 * @param options spawn options
 * @returns
 * @example
 * // get last commit of this dir
 * latestCommit(null, { cwd: __dirname }).then(console.log);
 * // get last commit of single file
 * latestCommit(path.join(__dirname, 'path/to/folder/file')).then(console.log);
 */
export const latestCommit = async (filePath?: string | null, options: Partial<GetLatestCommitHashOptions> = {}) => {
  const default_options: GetLatestCommitHashOptions = {
    cwd: process.cwd()
  };
  options = Object.assign(default_options, options);
  const shortHashFormat = typeof options.short === 'undefined' || options.short === null ? true : options.short;
  const args: string[] = [];
  if (!filePath) {
    // get last commit hash of cwd
    args.push('rev-parse');
    if (shortHashFormat) args.push('--short');
    args.push('HEAD');
  } else {
    // get last commit hash of specific path
    args.push('log');
    // determine short or long hash format
    args.push('--pretty=tformat:%' + (shortHashFormat ? 'h' : 'H'));
    args.push('-n');
    args.push('1');
    args.push(filePath);
  }

  const res = await spawner.promise(options, 'git', ...args);
  if (res.stdout) {
    const result = res.stdout[0] as string;
    //console.log('git', ...args, result);
    return result;
  } else {
    return undefined;
  }
};
