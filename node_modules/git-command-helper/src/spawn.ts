'use strict';

import Bluebird from 'bluebird';
import { CommonSpawnOptions } from 'child_process';
import sysSpawn from 'cross-spawn';
// import { spawn as sysSpawn } from 'child_process';
import CacheStream from './cache-stream';
import noop from './noop';
export { default as spawnAsync } from '@expo/spawn-async';

export type SpawnOptions = Record<string, any> & CommonSpawnOptions;

/**
 * spawn promise
 * @param command
 * @param args
 * @param options
 * @returns
 */
export default function promiseSpawn(command: string, args: string[] | SpawnOptions = [], options: SpawnOptions = {}) {
  if (!command) throw new TypeError('command is required!');

  if (typeof args === 'string') args = [args];

  if (!Array.isArray(args)) {
    options = args;
    args = [];
  }

  return new Bluebird((resolve: (str?: string) => any, reject) => {
    const task = sysSpawn(command, <string[]>args, options);
    const verbose: boolean = options.verbose || false;
    const { encoding = 'utf8' } = options;
    const stdoutCache = new CacheStream();
    const stderrCache = new CacheStream();

    if (task.stdout) {
      const stdout = task.stdout.pipe(stdoutCache);
      if (verbose) stdout.pipe(process.stdout);
    }

    if (task.stderr) {
      const stderr = task.stderr.pipe(stderrCache);
      if (verbose) stderr.pipe(process.stderr);
    }

    task.on('close', (code) => {
      if (code) {
        const e = new Error(getCache(stderrCache, encoding).toString());
        e['code'] = code;

        return reject(e);
      }

      resolve(getCache(stdoutCache, encoding).toString());
    });

    task.on('error', reject);

    // Listen to exit events if neither stdout and stderr exist (inherit stdio)
    if (!task.stdout && !task.stderr) {
      task.on('exit', (code) => {
        if (code) {
          const e = new Error('Spawn failed');
          e['code'] = code;

          return reject(e);
        }

        resolve();
      });
    }
  });
}

function getCache(stream: CacheStream, encoding: BufferEncoding) {
  const buf = stream.getCache();
  stream.destroy();
  if (!encoding) return buf;

  return buf.toString(encoding);
}

/**
 * spawn async
 */
export const spawn = promiseSpawn;
/**
 * spawn async suppress errors
 * @param command
 * @param args
 * @param options
 * @returns
 */
export const spawnSilent = async function (command: string, args?: string[] | SpawnOptions, options?: SpawnOptions) {
  try {
    return await promiseSpawn(command, args, options);
  } catch (_) {
    return noop(_);
  }
};
