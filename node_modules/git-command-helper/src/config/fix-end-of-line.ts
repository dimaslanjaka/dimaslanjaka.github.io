import { gitConfig } from './gitConfig';

/**
 * force end of line LF
 * @param cwd
 */
export async function forceEolLF(cwd: string) {
  const config = new gitConfig({ cwd });
  // set the EOL
  await config.eol('lf');
  // compatibility for windows
  await config.autocrlf(true);
  // update index
  await config.git.spawn('git', ['checkout-index', '-r', '--all']);
}
