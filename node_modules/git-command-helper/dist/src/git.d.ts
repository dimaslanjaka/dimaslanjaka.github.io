/**
 * NodeJS GitHub Helper
 * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
 */
/// <reference types="node" />
import Bluebird from 'bluebird';
import * as crossSpawn from '../cross-spawn/src';
import * as GithubInfo from './functions';
import { latestCommit } from './functions/latestCommit';
import helper from './helper';
import * as extension from './index-exports';
import { SpawnOptions } from './spawn';
import { StatusResult } from './types/status';
import * as gitUtil from './utils';
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
export declare class git implements GitOpt {
    /** is current device is github actions */
    static isGithubCI: boolean;
    /** is current device is github actions */
    isGithubCI: boolean;
    submodules?: (gitUtil.Submodule | undefined)[];
    user?: string;
    email?: string;
    remote: string;
    branch: string;
    submodule?: import('./submodule').default;
    cwd: string;
    token?: string;
    helper: typeof helper;
    static helper: typeof helper;
    ext: typeof extension;
    static ext: typeof extension;
    util: typeof gitUtil;
    static util: typeof gitUtil;
    crossSpawn: typeof crossSpawn;
    static crossSpawn: typeof crossSpawn;
    infos: typeof GithubInfo;
    getGithubBranches: typeof GithubInfo.getGithubBranches;
    getGithubCurrentBranch: typeof GithubInfo.getGithubCurrentBranch;
    getGithubRemote: typeof GithubInfo.getGithubRemote;
    getGithubRootDir: typeof GithubInfo.getGithubRootDir;
    constructor(obj: string, branch?: string);
    constructor(obj: GitOpt);
    setToken(token: string): void;
    getToken(): string;
    /**
     * get repository and raw file url
     * @param file relative to git root without leading `/`
     * @returns
     */
    getGithubRepoUrl(file: string): Promise<{
        remoteURL: string;
        rawURL: string;
    }>;
    /**
     * check file is untracked
     * @param file relative to git root without leading `/`
     * @returns
     */
    isUntracked(file: string): Promise<boolean>;
    /**
     * get latest commit hash
     * @param customPath
     * @param options
     * @returns
     */
    latestCommit(customPath?: string | null, options?: Parameters<typeof latestCommit>[1]): Promise<string>;
    info(): Promise<{
        root: string;
        remote: {
            fetch: {
                origin: string;
                url: string;
            };
            push: {
                origin: string;
                url: string;
            };
        };
        branch: {
            active: boolean;
            branch: string;
        }[];
        status: StatusResult[];
    }>;
    /**
     * git config --global --add safe.directory PATH_FOLDER
     */
    addSafe(): Promise<string | void>;
    /**
     * call spawn async
     * * default option is `{ cwd: this.cwd }`
     * @param cmd
     * @param args
     * @param spawnOpt
     * @returns
     */
    spawn(cmd: string, args: string[], spawnOpt?: SpawnOptions): Bluebird<string>;
    /**
     * setup merge on pull strategy
     * @returns
     */
    setAutoRebase(): Bluebird<string>;
    /**
     * setup end of line LF
     * @link https://stackoverflow.com/a/13154031
     * @returns
     */
    setForceLF(): Bluebird<string>;
    /**
     * git fetch
     * @param arg argument git-fetch, ex ['--all']
     * @param optionSpawn
     * @returns
     */
    fetch(arg?: string[], optionSpawn?: SpawnOptions): Bluebird<string>;
    /**
     * git pull
     * @param arg example: `['--recurse-submodule']`
     * @param optionSpawn
     * @returns
     */
    pull(arg?: string[], optionSpawn?: SpawnOptions): Promise<string>;
    /**
     * git pull accept merge from remote (accept all incoming changes)
     * @see https://stackoverflow.com/a/21777677
     * @see https://www.folkstalk.com/tech/git-accept-incoming-changes-for-all-with-code-examples/
     */
    pullAcceptTheirs(optionSpawn?: SpawnOptions): Promise<void>;
    /**
     * git commit
     * @param mode -am, -m, etc
     * @param msg commit messages
     * @param optionSpawn
     * @returns
     */
    commit(msg: string, mode?: 'am' | 'm' | string, optionSpawn?: SpawnOptions): Bluebird<string>;
    /**
     * add and commit file
     * @param path
     * @param msg
     * @param mode am/m
     * @returns
     */
    addAndCommit(path: string, msg: string, mode?: string): Bluebird<unknown>;
    /**
     * bulk add and commit
     * @param options array of `path` and `msg` commit message
     * @returns
     */
    commits(options: {
        path: string;
        msg?: string;
        [key: string]: any;
    }[]): Bluebird<Error[]>;
    /**
     * git push
     * @param force
     * @param optionSpawn
     * @returns
     */
    push(force?: boolean, optionSpawn?: SpawnOptions): any;
    /**
     * check if can be pushed
     */
    canPush(): Promise<boolean>;
    /**
     * Spawn option default stdio pipe
     * @param opt
     * @returns
     */
    spawnOpt<T>(opt?: SpawnOptions): Record<string, any> & import("child_process").CommonSpawnOptions & T;
    /**
     * check has any file changed
     */
    hasChanged(): Promise<boolean>;
    isIgnored: typeof GithubInfo.isIgnored;
    static isIgnored: typeof GithubInfo.isIgnored;
    /**
     * git add
     * @param path specific path or argument -A
     * @param optionSpawn
     * @returns
     */
    add(path: string, optionSpawn?: SpawnOptions): Bluebird<string>;
    /**
     * git checkout
     * @param branchName
     * @param optionSpawn
     * @returns
     */
    checkout(branchName: string, optionSpawn?: SpawnOptions): Promise<string>;
    /**
     * get current branch informations
     * @returns
     */
    getbranch(): Promise<{
        active: boolean;
        branch: string;
    }[]>;
    /**
     * Check if current repository is up to date with origin/remote
     * @returns
     */
    isUpToDate(): Bluebird<boolean>;
    /**
     * git status
     * @returns
     */
    status(): Bluebird<StatusResult[]>;
    /**
     * git init
     * @returns
     */
    init(spawnOpt?: SpawnOptions): Promise<string | void>;
    setcwd(v: string): void;
    setemail(v: string): Bluebird<string>;
    setuser(v: string): Bluebird<string>;
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
    setremote(remoteURL: string | URL, name?: string, spawnOpt?: SpawnOptions): Promise<any>;
    /**
     * get remote information. default `origin`
     * @param args
     * @returns remote url
     */
    getremote(args: string): Promise<string>;
    /**
     * get remote `origin` information
     * @param args
     * @returns object remote
     */
    getremote(args?: string[]): Promise<{
        fetch: {
            origin: string;
            url: string;
        };
        push: {
            origin: string;
            url: string;
        };
    }>;
    checkLock(): boolean;
    /**
     * set branch (git checkout branchName)
     * @param branchName
     * @returns
     */
    setbranch(branchName: string, force?: boolean, spawnOpt?: SpawnOptions): Promise<string | void>;
    /**
     * Reset to latest commit of remote branch
     * @param branch
     */
    reset(branch?: string): Bluebird<string>;
    toString(): string;
}
export default git;
