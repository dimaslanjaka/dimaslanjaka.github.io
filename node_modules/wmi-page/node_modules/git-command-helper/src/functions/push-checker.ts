import { async as spawnAsync } from '../../cross-spawn/src';

/**
 * check if can be pushed
 * @param originName origin name
 */
export async function dryRun(cwd: string) {
  const dry = await spawnAsync('git', ['push', '--dry-run'], { stdio: 'pipe', cwd });
  return dry.output.trim() != 'Everything up-to-date';
}

export const isCanPush = { dryRun };
