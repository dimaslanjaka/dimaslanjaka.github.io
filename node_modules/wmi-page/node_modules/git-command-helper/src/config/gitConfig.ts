/** git config */

import { git } from '..';

export class gitConfig {
  cwd: string;
  git: git;
  constructor(opt: { cwd: string } | git) {
    this.cwd = opt.cwd;
    this.git = opt instanceof git ? opt : new git(opt.cwd);
  }

  /**
   * custom spawn
   * @param args cli argument without `git config`
   */
  custom(...args: string[]) {
    return this.git.spawn('git', [...args]);
  }

  ignoreCase(toBe: boolean | string) {
    return this.custom('core.ignorecase', String(toBe));
  }

  /**
   * set end of line all files
   * @param type
   * @returns
   */
  eol(type: 'lf' | 'crlf') {
    return this.custom('core.eol', type);
  }

  /**
   * The `git config core.autocrlf` command is used to change how Git handles line endings. It takes a single argument.
   * @param toBe true - Configure Git to ensure line endings in files you checkout are correct for Windows.
   * @returns
   */
  autocrlf(toBe: boolean | string) {
    return this.custom('core.autocrlf', String(toBe));
  }
}
