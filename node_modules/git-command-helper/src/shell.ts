import { SpawnOptions } from 'child_process';
import { spawn } from 'hexo-util';

export type ShellOptions = SpawnOptions & {
  verbose?: boolean;
  supress?: boolean;
};

/**
 * asynchronous spawner
 * @param cmd
 * @param args
 * @param opt
 * @returns
 */
export async function shell(
  cmd: string,
  args: string[],
  opt: ShellOptions = null
) {
  let useOpt: ShellOptions = {
    cwd: __dirname,
    verbose: false,
    supress: false
  };
  if (opt) {
    useOpt = Object.assign(useOpt, opt);
  }
  if (useOpt.verbose) console.log('executing', cmd, ...args);
  try {
    return await spawn(cmd, args, useOpt);
  } catch (e) {
    if (!useOpt.supress) {
      if (e instanceof Error) return console.log(e.message);
      return console.trace(e);
    }
  }
}
