/* eslint-disable no-control-regex */
/**
 * NodeJS GitHub Helper
 * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
 */

import Bluebird from 'bluebird';
import fs from 'fs-extra';
import _ from 'lodash';
import path from 'upath';
import * as crossSpawn from '../cross-spawn/src';
import { jsonStringifyWithCircularRefs } from '../utility/packages/sbg-utility/src';
import * as GithubInfo from './functions';
import { isIgnored } from './functions/gitignore';
import { isUntracked } from './functions/isFileChanged';
import { latestCommit } from './functions/latestCommit';
import { isCanPush } from './functions/push-checker';
import helper from './helper';
import * as extension from './index-exports';
import { getInstance, hasInstance, setInstance } from './instances';
import { SpawnOptions, spawn, spawnSilent } from './spawn';
import submodule from './submodule';
import { StatusResult } from './types/status';
import * as gitUtil from './utils';
import extractSubmodule from './utils/extract-submodule';
import { safeURL } from './utils/safe-url';

// module 'git-command-helper';

export interface GitOpt {
  [key: string]: any;
  user?: string;
  email?: string;
  /** branch */
  ref?: string;
  branch?: string;
  /** base folder */
  cwd: string;
  /** remote url */
  url?: string;
  remote: string;
}

/**
 * GitHub Command Helper For NodeJS
 */
export class git implements GitOpt {
  /** is current device is github actions */
  static isGithubCI =
    typeof process.env['GITHUB_WORKFLOW'] === 'string' && typeof process.env['GITHUB_WORKFLOW_SHA'] === 'string';
  /** is current device is github actions */
  isGithubCI =
    typeof process.env['GITHUB_WORKFLOW'] === 'string' && typeof process.env['GITHUB_WORKFLOW_SHA'] === 'string';
  submodules?: (gitUtil.Submodule | undefined)[];
  user?: string;
  email?: string;
  remote!: string;
  branch = 'master';
  submodule?: import('./submodule').default;
  cwd!: string;
  token?: string;

  // external funcs
  helper = helper;
  static helper = helper;
  ext = extension;
  static ext = extension;
  util = gitUtil;
  static util = gitUtil;
  crossSpawn = crossSpawn;
  static crossSpawn = crossSpawn;

  // exports infos
  infos = GithubInfo;
  getGithubBranches = GithubInfo.getGithubBranches;
  getGithubCurrentBranch = GithubInfo.getGithubCurrentBranch;
  getGithubRemote = GithubInfo.getGithubRemote;
  getGithubRootDir = GithubInfo.getGithubRootDir;

  constructor(obj: string, branch?: string);
  // only allow single param
  constructor(obj: GitOpt);
  constructor(obj: string | GitOpt, branch = 'master') {
    let gitdir: string;
    if (typeof obj === 'string') {
      gitdir = obj;
      if (branch) this.branch = branch;
    } else {
      gitdir = obj.cwd;
      if (obj.ref || obj.branch) this.branch = obj.ref || obj.branch || branch;
      this.remote = obj.url || obj.remote;
      this.email = obj.email;
      this.user = obj.user;
    }
    if (hasInstance(gitdir)) return getInstance(gitdir);
    this.cwd = gitdir;

    if (this.remote) {
      // @fixme parse token from url
      // const parse = new URL(this.remote);
      // console.log({ parse });
    }

    // auto recreate git directory
    if (!fs.existsSync(gitdir)) {
      // create .git folder
      fs.mkdirSync(path.join(gitdir, '.git'), { recursive: true });
      const self = this;
      this.spawn('git', ['init']).then(function () {
        if (typeof self.remote === 'function') this.setremote(self.remote);
      });
    }

    if (fs.existsSync(path.join(gitdir, '.gitmodules'))) {
      this.submodules = extractSubmodule(path.join(gitdir, '.gitmodules'));
      this.submodule = new submodule(gitdir);
    }
    if (!hasInstance(gitdir)) setInstance(gitdir, this);
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken() {
    return this.token as string;
  }

  /**
   * get repository and raw file url
   * @param file relative to git root without leading `/`
   * @returns
   */
  getGithubRepoUrl(file: string) {
    return GithubInfo.getGithubRepoUrl(file, { cwd: this.cwd });
  }

  /**
   * check file is untracked
   * @param file relative to git root without leading `/`
   * @returns
   */
  isUntracked(file: string) {
    return isUntracked(file, { cwd: this.cwd });
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
      .catch(_.noop)
      .finally(() => console.log(this.cwd, 'added to safe directory'));
  }

  /**
   * call spawn async
   * * default option is `{ cwd: this.cwd }`
   * @param cmd
   * @param args
   * @param spawnOpt
   * @returns
   */
  spawn(cmd: string, args: string[], spawnOpt?: SpawnOptions) {
    return spawn(cmd, args, this.spawnOpt(spawnOpt || { stdio: 'pipe' }));
  }

  /**
   * setup merge on pull strategy
   * @returns
   */
  setAutoRebase() {
    return this.spawn('git', ['config', 'pull.rebase', 'false']);
  }

  /**
   * setup end of line LF
   * @link https://stackoverflow.com/a/13154031
   * @returns
   */
  setForceLF() {
    return this.spawn('git', ['config', 'core.autocrlf', 'false']);
  }

  /**
   * git fetch
   * @param arg argument git-fetch, ex ['--all']
   * @param optionSpawn
   * @returns
   */
  fetch(arg?: string[], optionSpawn: SpawnOptions = { stdio: 'inherit' }) {
    let args: string[] = [];
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
            errors.push(e as any);
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
   */
  async canPush() {
    return isCanPush.dryRun(this.cwd);
  }

  /*
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
    console.log({ staged, changed, dry: dry.output.join(EOL).trim() != 'Everything up-to-date' });
    // return repository is not up to date
    return changed && staged.length === 0 && dry.output.join(EOL).trim() != 'Everything up-to-date';
  }
  */

  /**
   * Spawn option default stdio pipe
   * @param opt
   * @returns
   */
  spawnOpt<T>(opt: SpawnOptions = {}) {
    return Object.assign({ cwd: this.cwd, stdio: 'pipe' }, opt) as SpawnOptions & T;
  }

  /**
   * check has any file changed
   */
  async hasChanged() {
    const status = await this.status();
    return status.length > 0;
  }

  isIgnored = isIgnored;
  static isIgnored = isIgnored;

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
            .filter((str) => typeof str === 'object') as StatusResult[];
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
    if (!fs.existsSync(path.join(this.cwd, '.git'))) fs.mkdirSync(path.join(this.cwd, '.git'), { recursive: true });
    return spawnSilent('git', ['init'], this.spawnOpt(spawnOpt)).catch(_.noop);
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
   * @param remoteURL repository url
   * @param name custom object name
   * @returns
   * @example
   * // default
   * git add remote origin https://
   * // custom name
   * git add remote customName https://
   */
  public async setremote(remoteURL: string | URL, name?: string, spawnOpt: SpawnOptions = {}) {
    const newremote = String(remoteURL);
    if (this.remote !== newremote) {
      this.remote = newremote;
    }
    const opt = this.spawnOpt(Object.assign({ stdio: 'pipe' }, spawnOpt || {}));
    try {
      return await spawn('git', ['remote', 'add', name || 'origin', this.remote], opt);
    } catch {
      return await helper.suppress(() => spawn('git', ['remote', 'set-url', name || 'origin', this.remote], opt));
    }
  }

  /**
   * get remote information. default `origin`
   * @param args
   * @returns remote url
   */
  public async getremote(args: string): Promise<string>;
  /**
   * get remote `origin` information
   * @param args
   * @returns object remote
   */
  public async getremote(args?: string[]): Promise<{
    fetch: {
      origin: string;
      url: string;
    };
    push: {
      origin: string;
      url: string;
    };
  }>;
  /**
   * get remote information. default `origin`
   * @param args
   * @returns
   */
  public async getremote(args?: string[] | string) {
    if (typeof args === 'string') return await GithubInfo.getGithubRemote(args, { cwd: this.cwd });
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
      const lines = res.split(/\n/gm).filter((split) => split.length > 0);
      lines.map((splitted) => {
        let key: 'fetch' | 'push' | undefined;
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

        // skip non-origin
        if (nameUrl[0] != 'origin') return;

        if (key) {
          (result as any)[key] = {
            origin: nameUrl[0],
            url: safeURL(nameUrl[1])
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
    return fs.existsSync(path.join(this.cwd, '.git/index.lock'));
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

  toString() {
    return jsonStringifyWithCircularRefs(this);
  }
}

export default git;
