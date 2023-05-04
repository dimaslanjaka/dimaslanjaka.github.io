import Bluebird from 'bluebird';
import { SpawnOptions } from 'child_process';
import debug from 'debug';
import { existsSync, statSync } from 'fs';
import { rm } from 'fs/promises';
import { join } from 'path';
import { toUnix } from 'upath';
import extractSubmodule from './extract-submodule';
import git from './git';
import { getInstance, hasInstance, setInstance } from './instances';
import { spawn } from './spawner';

const _log = debug('git-command-helper');

export class submodule {
  cwd: string;
  hasConfig: boolean;
  private github: Record<string, git> = {};

  constructor(cwd: string) {
    this.cwd = cwd;
    this.hasConfig = existsSync(join(this.cwd, '.gitmodules'));
  }

  private spawnOpt(opt: SpawnOptions = {}) {
    return Object.assign({ cwd: this.cwd, stdio: 'pipe' } as SpawnOptions, opt);
  }

  /**
   * add submodule
   */
  async add(opt: { remote: string; branch?: string; dest: string }) {
    if (!opt.remote) throw new Error('submodule remote url required');
    if (!opt.dest) throw new Error('submodule destination required');

    const args = ['submodule', 'add'];
    if (opt.branch) args.push('-b', opt.branch);
    args.push(opt.remote);
    args.push(opt.dest);
    await spawn('git', args, { cwd: this.cwd, stdio: 'pipe' });
  }

  /**
   * remove submodule
   * @param path path to submodule
   */
  async remove(path: string) {
    await spawn('git', ['submodule', 'deinit', '-f', toUnix(path)], { cwd: this.cwd, stdio: 'pipe' });
    await rm(join(this.cwd, '.git/modules', toUnix(path)), { recursive: true, force: true });
    await spawn('git', ['rm', '-f', toUnix(path)], { cwd: this.cwd, stdio: 'pipe' });
  }

  /**
   * check has submodule
   * @returns
   */
  hasSubmodule() {
    const gitmodules = join(this.cwd, '.gitmodules');
    const exist = existsSync(gitmodules);
    // check empty .gitmodules
    if (exist) {
      const size = statSync(gitmodules).size;
      return size > 0;
    }
    return exist;
  }

  /**
   * git submodule update
   * @param args custom arguments
   * @param optionSpawn
   * @returns
   */
  update(args: string[] = [], optionSpawn: SpawnOptions = { stdio: 'inherit' }) {
    const arg = ['submodule', 'update'];
    if (Array.isArray(args)) {
      args.forEach((str) => arg.push(str));
    } else {
      arg.push('-i', '-r');
    }
    return spawn('git', arg, this.spawnOpt(optionSpawn));
  }

  /**
   * Update all submodule with cd method
   * @param reset do git reset --hard origin/branch ?
   */
  safeUpdate(reset = false) {
    return new Bluebird((resolve) => {
      const info = this.get();
      const doUp = () => {
        return new Bluebird((resolveDoUp: (...v: any[]) => any) => {
          let { github } = info[0];
          const { branch, root, url } = info[0];
          //console.log("safe", info[0]);
          if (!github) {
            github = new git(root);
          }
          const doReset = () => github.reset(branch);
          const doPull = () => github.pull(['origin', branch, '--recurse-submodule']);
          // update from remote name origin
          github.setremote(url, 'origin').then(() => {
            // force checkout branch instead commit hash
            github.setbranch(branch, true).then(() => {
              if (reset) {
                // reset then pull
                doReset().then(doPull).then(resolveDoUp);
              } else {
                // pull
                doPull().then(resolveDoUp);
              }
            });
          });
        });
      };
      const iterate = () => {
        return new Bluebird((resolveIt: (...v: any[]) => any) => {
          doUp()
            .then(() => {
              info.shift();
            })
            .then(() => {
              if (info.length > 0) {
                return iterate().then(resolveIt);
              } else {
                resolveIt();
              }
            });
        });
      };
      if (info.length > 0) {
        resolve(iterate());
      }
    });
  }

  /**
   * git submodule status
   * @param optionSpawn
   * @returns
   */
  status(optionSpawn: SpawnOptions = { stdio: 'inherit' }) {
    return spawn('git', ['submodule', 'status'], this.spawnOpt(optionSpawn));
  }

  /**
   * git add all each submodule
   * @param pathOrArg ex: `-A`
   * @returns
   */
  addAll(pathOrArg: string) {
    return spawn('git', ['submodule', 'foreach', 'git', 'add', pathOrArg]);
  }

  commitAll(msg: string) {
    return spawn('git', ['submodule', 'foreach', 'git', 'commit', '-am', msg]);
  }

  /**
   * get submodule informations
   * @returns
   */
  get() {
    if (!this.hasSubmodule()) return []; //throw new Error('This directory not have submodule installed');

    const extract = extractSubmodule(join(this.cwd, '.gitmodules'));
    for (let i = 0; i < extract.length; i++) {
      const item = extract[i];
      if (!item) continue;
      if (!hasInstance(item.root)) setInstance(item.root, new git(item.root));
      const github = getInstance<git>(item.root);
      this.github[item.root] = github;
      extract[i] = Object.assign({ branch: 'master', github }, item);
    }
    return extract.map(function (item) {
      return Object.assign({ branch: 'master', github: null as unknown as git }, item);
    });
  }
}

export default submodule;
export const gitSubmodule = submodule;
