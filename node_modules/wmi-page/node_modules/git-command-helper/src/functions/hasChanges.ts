'use strict';

import { gitStatus } from './status';

/**
 * check any files changed
 * @param opt
 */
export function gitHasChanges(opt: { [key: string]: any; cwd: string }) {
  // git status --porcelain
  const get = gitStatus(opt);
  return get.length > 0;
}
