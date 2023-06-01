import * as cp from '../../cross-spawn/src';

/**
 * check file is untracked
 * @param filePath
 */
export async function isUntracked(filePath: string, opt?: { cwd: string }) {
  const defaults = {
    cwd: process.cwd()
  };
  opt = Object.assign(defaults, opt || {});

  const untrack = (await cp.async('git', ['diff', '--no-index', '--numstat', '/dev/null', filePath], opt)).stdout
    .split(/\r?\n/)
    .filter((str) => str.length > 0);
  return untrack.length === 1;
}
