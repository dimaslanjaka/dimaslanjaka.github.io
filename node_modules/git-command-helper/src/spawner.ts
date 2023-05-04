import { SpawnOptions, spawn as spawnSys } from 'child_process';
import { Readable } from 'stream';
import promiseSpawn from './spawn';

export class spawner {
  static spawn = promiseSpawn;
  /**
   * promises spawn
   * @param options
   * @param cmd
   * @param args
   * @returns
   * @example
   * spawner.promise({}, 'git', 'log', '-n', '1').then(console.log);
   * spawner.promise({stdio:'pipe'}, 'git', 'submodule', 'status').then(console.log);
   */
  static promise(options: null | SpawnOptions = null, cmd: string, ...args: string[]) {
    return new Promise(
      (
        resolve: (returnargs: {
          code: number | null;
          stdout: string[] | Readable | null;
          stderr: string[] | Readable | null;
        }) => any,
        reject: (returnargs: { args: string[]; err: Error }) => any
      ) => {
        // default option inherit
        if (options === null) {
          options = {
            cwd: __dirname,
            stdio: 'inherit'
          };
        }
        const stdouts: string[] = [];
        const stderrs: string[] = [];
        const child = spawnSys(cmd, args, options);
        // use event hooks to provide a callback to execute when data are available:
        if (child.stdout !== null) {
          child.stdout.on('data', function (data) {
            stdouts.push(data.toString().trim());
          });
        }
        if (child.stderr !== null) {
          child.stderr.on('data', function (data) {
            stderrs.push(data.toString().trim());
          });
        }
        child.on('close', function (code) {
          // Should probably be 'exit', not 'close'
          // *** Process completed
          return resolve({
            code: code,
            stdout: stdouts.length > 0 ? stdouts : child.stdout,
            stderr: stderrs.length > 0 ? stderrs : stdouts.length === 0 ? child.stderr : null
          });
        });
        child.on('error', function (err) {
          // *** Process creation failed
          return reject({ args: args, err: err });
        });
      }
    );
  }

  /*static async spawn(cmd: string, args: string[], options?: SpawnOptions) {
    //console.log(options, cmd, ...args);
    const child = await spawner.promise(options, cmd, ...args);
    //const child = await spawner.promise.call(options, cmd, ...args);
    if ('stderr' in child && child.stderr !== null) {
      //if (Array.isArray(child.stderr)) throw new Error(child.stderr.join('\n'));
      //throw new Error(await streamToString(child.stderr));
      let msg: string;
      if (Array.isArray(child.stderr)) {
        msg = child.stderr.join('\n');
      } else {
        msg = await streamToString(child.stderr);
      }
      return msg;
    }
    if ('stdout' in child && child.stdout !== null) {
      if (Array.isArray(child.stdout)) return child.stdout.join('\n');
      return await streamToString(child.stdout);
    }
    return null;
  }*/
}

export default spawner;
export const spawn = spawner.spawn;
