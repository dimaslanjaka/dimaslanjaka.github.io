import { gitConfig } from './gitConfig';

/**
 * fix case-sensitive conflict
 * @see {@link https://stackoverflow.com/a/55541435/6404439}
 * @param cwd
 * @param messageCommit
 */
export async function fixCaseSensitive(cwd: string, messageCommit?: string) {
  const config = new gitConfig({ cwd });
  await config.ignoreCase(false);
  await config.git.spawn('git', ['rm', '-r', '--cached', '.']);
  await config.git.spawn('git', ['commit', '-a', '-m', messageCommit ? messageCommit : 'fix: file name casing']);
}
