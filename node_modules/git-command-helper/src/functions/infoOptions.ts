import { spawnAsync } from '../spawn';

export interface infoOptions extends spawnAsync.SpawnOptions {
  /**
   * make function throws when error occurs
   */
  throwable?: boolean;
  /**
   * verbose
   */
  verbose?: boolean;
}
