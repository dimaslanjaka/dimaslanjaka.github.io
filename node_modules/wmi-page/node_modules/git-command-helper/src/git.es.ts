/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-namespace */

import { default as Git } from './git';

export namespace gitCmdHelper {
  export const git = Git;
  declare var module: any;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = gitCmdHelper;
  }
}

export default gitCmdHelper;
