/* eslint-disable no-control-regex */
/**
 * NodeJS GitHub Helper
 * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
 */

import Bluebird from 'bluebird';
import { existsSync, mkdirSync } from 'fs';
import { EOL } from 'os';
import { join } from 'path';
import GithubInfo from './git-info';
import helper from './helper';
import * as extension from './index-exports';
import { hasInstance, setInstance } from './instances';
import { latestCommit } from './latestCommit';
import noop from './noop';
import { shell } from './shell';
import { SpawnOptions, spawn, spawnAsync, spawnSilent } from './spawn';
import submodule from './submodule';
import { StatusResult } from './types';

// module 'git-command-helper';

export interface GitOpt {
  user?: string | null;
  email?: string | null;
  url: string;
  branch: string | null;
  baseDir: string | null;
}

/**
 * Setup git with branch and remote url resolved automatically
 * @param param0
 * @returns
 */
export async function setupGit({ branch, url, baseDir, email = null, user = null }: GitOpt) {
  const github = new gitHelper(baseDir);
  github.remote = url;
  try {
    if (!(await github.isExist())) {
      await github.init();
    }
    await github.setremote(url);
    await github.setbranch(branch);
    if (email) await github.setemail(email);
    if (user) await github.setuser(user);
  } catch (e) {
    console.trace(e);
  }
  return github;
}

/**
 * GitHub Command Helper For NodeJS
 */
export class git {
  submodule!: submodule;
  user!: string;
  email!: string;
  remote!: string;
  branch!: string;
  private exist!: boolean;
  cwd!: string;
  static shell = shell;
  shell = shell;
  helper = helper;
  static helper = helper;
  static noop = noop;
  noop = noop;
  ext = extension;
  static ext = extension;

  // exports infos
  infos = GithubInfo;
  getGithubBranches = GithubInfo.getGithubBranches;
  getGithubCurrentBranch = GithubInfo.getGithubCurrentBranch;
  getGithubRemote = GithubInfo.getGithubRemote;
  getGithubRootDir = GithubInfo.getGithubRootDir;
  getGithubRepoUrl = GithubInfo.getGithubRepoUrl;

  /**
   *
   * @param gitdir
   * @param branch
   */
  constructor(gitdir: string, branch = 'master') {
    this.cwd = gitdir;
    if (typeof this.branch === 'string') this.branch = branch;
    if (!existsSync(this.cwd)) {
      throw new Error((gitdir || 'git directory') + ' not found');
    }
    this.submodule = new submodule(gitdir);
    if (!hasInstance(gitdir)) setInstance(gitdir, this);
  }

  /**
   * get latest commit hash
   * @param customPath
   * @param options
   * @returns
   */
  latestCommit(customPath?: string | null, options?: Parameters<typeof latestCommit>[1]) {
    return latestCommit(customPath, this.spawnOpt(options));
  }

  async info() {
    const opt = this.spawnOpt({ stdio: 'pipe' });
    return {
      root: await this.getGithubRootDir(opt),
      remote: await this.getremote(['-v']),
      branch: await this.getbranch(),
      status: await this.status()
    };
  }

  /**
   * git config --global --add safe.directory PATH_FOLDER
   */
  addSafe() {
    return spawnSilent(
      'git',
      'config --global --add safe.directory'.split(' ').concat([this.cwd]),
      this.spawnOpt({ stdio: 'inherit' })
    )
      .catch(git.noop)
      .finally(() => console.log(this.cwd, 'added to safe directory'));
  }

  /**
   * call spawn async
   * @param cmd
   * @param args
   * @param spawnOpt
   * @returns
   */
  spawn(cmd: string, args: string[], spawnOpt: SpawnOptions) {
    return spawn(cmd, args, this.spawnOpt(spawnOpt || { stdio: 'pipe' }));
  }

  /**
   * setup merge on pull strategy
   * @returns
   */
  setAutoRebase() {
    return spawn('git', ['config', 'pull.rebase', 'false']);
  }

  /**
   * setup end of line LF
   * @link https://stackoverflow.com/a/13154031
   * @returns
   */
  setForceLF() {
    return spawn('git', ['config', 'core.autocrlf', 'false']);
  }

  /**
   * git fetch
   * @param arg argument git-fetch, ex ['--all']
   * @param optionSpawn
   * @returns
   */
  fetch(arg?: string[], optionSpawn: SpawnOptions = { stdio: 'inherit' }) {
    let args = [];
    if (Array.isArray(arg)) args = args.concat(arg);
    if (args.length === 0) {
      args.push('origin', this.branch);
    }
    // return default git fetch when branch not set
    if (!this.branch) return spawn('git', ['fetch'], this.spawnOpt(optionSpawn));
    // remove non-string paramters
    args = ['fetch'].concat(args).filter((str) => typeof str === 'string' && str.length > 0);
    return spawn('git', args, this.spawnOpt(optionSpawn));
  }

  /**
   * git pull
   * @param arg example: `['--recurse-submodule']`
   * @param optionSpawn
   * @returns
   */
  async pull(arg?: string[], optionSpawn: SpawnOptions = { stdio: 'inherit' }) {
    let args: string[] = [];
    if (Array.isArray(arg)) args = args.concat(arg);
    if (args.length === 0) {
      args.push('origin', this.branch);
    }
    const opt = this.spawnOpt(optionSpawn || { stdio: 'inherit' });
    try {
      return await spawn('git', ['pull'].concat(args), opt);
    } catch (e) {
      if (e instanceof Error) {
        if (opt.stdio === 'inherit') console.log(e.message);
        return e.message;
      }
    }
  }

  /**
   * git pull accept merge from remote (accept all incoming changes)
   * @see https://stackoverflow.com/a/21777677
   * @see https://www.folkstalk.com/tech/git-accept-incoming-changes-for-all-with-code-examples/
   */
  async pullAcceptTheirs(optionSpawn: SpawnOptions = { stdio: 'inherit' }) {
    await this.pull(['-X', 'theirs'], optionSpawn);
    await this.spawn('git', ['checkout', '--theirs', '.'], optionSpawn);
  }

  /**
   * git commit
   * @param mode -am, -m, etc
   * @param msg commit messages
   * @param optionSpawn
   * @returns
   */
  commit(msg: string, mode: 'am' | 'm' | string = 'm', optionSpawn: SpawnOptions = { stdio: 'inherit' }) {
    if (!mode.startsWith('-')) mode = '-' + mode;
    return new Bluebird((resolve: (result?: string) => any, reject) => {
      const opt = this.spawnOpt(optionSpawn);
      const child = spawn('git', ['commit', mode, msg], opt);
      if (opt.stdio !== 'inherit') {
        child.then((str) => {
          resolve(str);
        });
      } else {
        resolve();
      }
      child.catch(reject);
    });
  }

  /**
   * add and commit file
   * @param path
   * @param msg
   * @param mode am/m
   * @returns
   */
  addAndCommit(path: string, msg: string, mode = 'm') {
    return new Bluebird((resolve, reject) => {
      this.add(path, { stdio: 'pipe' }).then((_) =>
        this.commit(msg, mode, { stdio: 'pipe' }).then(resolve).catch(reject)
      );
    });
  }

  /**
   * bulk add and commit
   * @param options array of `path` and `msg` commit message
   * @returns
   */
  commits(options: { path: string; msg?: string; [key: string]: any }[]) {
    const self = this;
    const errors: Error[] = [];
    async function run(): Promise<any> {
      if (options.length > 0) {
        try {
          try {
            await self.addAndCommit(options[0].path, options[0].msg || 'update ' + options[0].path + ' ' + new Date());
          } catch (e) {
            errors.push(e);
          }
        } finally {
          options.shift();
          await run();
        }
      }
    }
    return new Bluebird((resolve: (arg: typeof errors) => any) => {
      run().then(() => resolve(errors));
    });
  }

  /**
   * git push
   * @param force
   * @param optionSpawn
   * @returns
   */
  async push(force = false, optionSpawn: SpawnOptions = { stdio: 'inherit' }) {
    let args = ['push'];
    if (force) args = args.concat('-f');
    const opt = this.spawnOpt(optionSpawn);
    try {
      return await spawn('git', args, opt);
    } catch (e) {
      if (e instanceof Error) {
        if (opt.stdio === 'inherit') {
          console.log(e.message);
        }
        //console.log(e.message);
        if (/^error: failed to push some refs to/gim.test(e.message)) {
          if (/the tip of your current branch is behind/gim.test(e.message)) {
            return await this.push(true, opt);
          }
        }
      }
    }
  }

  /**
   * check if can be pushed
   * @param originName origin name
   */
  async canPush(originName = 'origin', branchName = this.branch) {
    // git push --dry-run
    if (branchName) {
      await spawn(
        'git',
        ['push', '-u', originName || 'origin', branchName || this.branch, '--dry-run'],
        this.spawnOpt({ stdio: 'pipe' })
      );
    }

    // repository is not up to date
    const changed = !(await this.isUpToDate());
    // repostory file changes status
    const staged = await this.status();
    // test git push --dry-run
    const dry = await spawnAsync('git', ['push', '--dry-run'], this.spawnOpt({ stdio: 'pipe' }));
    // console.log({ staged, changed, dry: dry.output.join(EOL).trim() != 'Everything up-to-date' });
    // return repository is not up to date
    return changed && staged.length === 0 && dry.output.join(EOL).trim() != 'Everything up-to-date';
  }

  /**
   * Spawn option default stdio pipe
   * @param opt
   * @returns
   */
  private spawnOpt<T>(opt: SpawnOptions = {}) {
    return Object.assign({ cwd: this.cwd, stdio: 'pipe' }, opt) as SpawnOptions & T;
  }

  /**
   * check has any file changed
   */
  async hasChanged() {
    const status = await this.status();
    return status.length > 0;
  }

  /**
   * git add
   * @param path specific path or argument -A
   * @param optionSpawn
   * @returns
   */
  add(path: string, optionSpawn: SpawnOptions = { stdio: 'inherit' }) {
    return spawn('git', ['add', path], this.spawnOpt(optionSpawn));
  }

  /**
   * git checkout
   * @param branchName
   * @param optionSpawn
   * @returns
   */
  async checkout(branchName: string, optionSpawn: SpawnOptions = { stdio: 'inherit' }) {
    return await spawn('git', ['checkout', branchName], this.spawnOpt(optionSpawn || {}));
  }

  /**
   * get current branch informations
   * @returns
   */
  async getbranch() {
    return await spawn('git', ['branch'], this.spawnOpt({ stdio: 'pipe' })).then((str) =>
      str
        .split(/\n/)
        .map((str) => str.split(/\s/).map((str) => str.trim()))
        .filter((str) => str.length > 0)
        .map((item) => {
          return {
            active: item.length > 1,
            branch: item[1]
          };
        })
        .filter((item) => typeof item.branch === 'string' && item.branch.trim().length > 0)
    );
  }

  /**
   * Check if current repository is up to date with origin/remote
   * @returns
   */
  isUpToDate() {
    const rgUpToDate = /^your branch is up to date with/gim;
    return new Bluebird((resolve: (v: boolean) => any) => {
      spawn('git', ['status'], this.spawnOpt({ stdio: 'pipe' })).then((stdout) => {
        resolve(rgUpToDate.test(stdout));
      });
    });
  }

  /**
   * git status
   * @returns
   */
  status() {
    const rgMod = /^\s*(modified|added|deleted):/gim;
    const rgChanged = /^\s*(changes not staged for commit|changes to be committed):/gim;
    const rgUntracked = /^untracked files:([\s\S]*?)\n\n/gim;

    return new Bluebird((resolve: (result: StatusResult[]) => any, reject) => {
      spawn('git', ['status'], this.spawnOpt({ stdio: 'pipe' }))
        .then((response) => {
          // check changed
          if (rgChanged.test(response)) {
            // modded, added, deleted
            const result = response
              .split('\n')
              .map((str) => str.trim())
              .filter((str) => rgMod.test(str))
              .map((str) => {
                const split = str.split(/:\s+/);
                return {
                  changes: split[0],
                  path: (split[1] || '').replace(/\(.*\)$/, '').trim()
                } as StatusResult;
              });
            resolve(result);
          }

          // untracked
          const result = (Array.from(response.match(rgUntracked) || [])[0] || '')
            .split(/\n/)
            .map((str) => str.trim())
            .filter((str) => {
              return !/^\(use/gim.test(str) && str.length > 0;
            })
            .map((str) => {
              if (!str.includes(':'))
                return {
                  changes: 'untracked',
                  path: str
                } as StatusResult;
            })
            .filter((str) => typeof str === 'object');
          resolve(result);
        })
        .catch(reject);
    });
  }

  /**
   * git init
   * @returns
   */
  async init(spawnOpt: SpawnOptions = { stdio: 'inherit' }) {
    if (!existsSync(join(this.cwd, '.git'))) mkdirSync(join(this.cwd, '.git'), { recursive: true });
    return spawnSilent('git', ['init'], this.spawnOpt(spawnOpt)).catch(noop);
  }

  /**
   * Check if git folder exists
   * @returns
   */
  isExist() {
    return new Bluebird((resolve: (exists: boolean) => any, reject) => {
      const folderExist = existsSync(join(this.cwd, '.git'));
      spawn('git', ['status'], this.spawnOpt({ stdio: 'pipe' }))
        .then((result) => {
          const match1 = /changes not staged for commit/gim.test(result);
          this.exist = match1 && folderExist;
          resolve(this.exist);
        })
        .catch(reject);
    });
  }

  public setcwd(v: string) {
    this.cwd = v;
  }

  public setemail(v: string) {
    this.email = v;
    return spawn('git', ['config', 'user.email', this.email], this.spawnOpt());
  }

  public setuser(v: string) {
    this.user = v;
    return spawn('git', ['config', 'user.name', this.user], this.spawnOpt());
  }

  /**
   * set remote url
   * @param v
   * @param name custom object name
   * @returns
   * @example
   * // default
   * git add remote origin https://
   * // custom name
   * git add remote customName https://
   */
  public async setremote(v: string | URL, name?: string, spawnOpt: SpawnOptions = {}) {
    this.remote = v instanceof URL ? v.toString() : v;
    const opt = this.spawnOpt(Object.assign({ stdio: 'pipe' }, spawnOpt || {}));
    try {
      return await spawn('git', ['remote', 'add', name || 'origin', this.remote], opt);
    } catch {
      return await helper.suppress(() => spawn('git', ['remote', 'set-url', name || 'origin', this.remote], opt));
    }
  }

  /**
   * get remote information
   * @param args
   * @returns
   */
  public async getremote(args?: string[]) {
    try {
      const res = await spawn('git', ['remote'].concat(args || ['-v']), this.spawnOpt({ stdio: 'pipe' }));
      const result = {
        fetch: {
          origin: '',
          url: ''
        },
        push: {
          origin: '',
          url: ''
        }
      };
      res
        .split(/\n/gm)
        .filter((split) => split.length > 0)
        .map((splitted) => {
          let key: null | string = null;
          const nameUrl = splitted.split(/\t/).map((str) => {
            const rg = /\((.*)\)/gm;
            if (rg.test(str))
              return str
                .replace(rg, (_whole, v1) => {
                  key = v1;
                  return '';
                })
                .trim();
            return str.trim();
          });
          if (key !== null) {
            result[key] = {
              origin: nameUrl[0],
              url: nameUrl[1]
            };
          } else {
            throw new Error('key never assigned');
          }
        });
      return result;
    } catch {
      //
    }
  }

  checkLock() {
    return existsSync(join(this.cwd, '.git/index.lock'));
  }

  /**
   * set branch (git checkout branchName)
   * @param branchName
   * @returns
   */
  async setbranch(branchName: string, force = false, spawnOpt?: SpawnOptions) {
    this.branch = branchName;
    const args = ['checkout'];
    if (force) args.push('-f');
    args.push(this.branch);
    const _checkout = await spawn('git', args, this.spawnOpt(spawnOpt || { stdio: 'pipe' })).catch((e) =>
      console.log('cannot checkout', this.branch, e.message)
    );
    // git branch --set-upstream-to=origin/<branch> gh-pages
    const _setUpstream = await spawn(
      'git',
      ['branch', '--set-upstream-to=origin/' + this.branch, this.branch],
      this.spawnOpt(spawnOpt || { stdio: 'pipe' })
    ).catch((e) => console.log('cannot set upstream', this.branch, e.message));
    //
    return _checkout;
  }

  /**
   * Reset to latest commit of remote branch
   * @param branch
   */
  reset(branch = this.branch) {
    return spawn('git', ['reset', '--hard', 'origin/' + branch || this.branch], {
      stdio: 'inherit',
      cwd: this.cwd
    });
  }
}

export default git;
export const gitHelper = git;
export const gitCommandHelper = git;
