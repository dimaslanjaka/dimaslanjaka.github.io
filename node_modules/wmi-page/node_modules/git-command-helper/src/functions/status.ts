'use strict';

import * as spawn from '../../cross-spawn/src';
import { spawnSyncReturn } from '../../cross-spawn/src/spawn';

type ObjResult = { U: string } | { M: string } | { D: string };

/**
 * git status
 * @param opt
 * @returns raw result
 */
export function gitStatus(opt: {
  [key: string]: any;
  /** current working directory */
  cwd: string;
  /** true = --porcelain */
  porcelain?: boolean;
  /** show raw output instead parsed object */
  raw: true;
}): spawnSyncReturn;

/**
 * git status
 * @param opt
 * @returns parsed result
 */
export function gitStatus(opt: {
  [key: string]: any;
  /** current working directory */
  cwd: string;
  /** true = --porcelain */
  porcelain?: boolean;
  /** show raw output instead parsed object */
  raw: false;
}): ObjResult[];

/**
 * git status
 * @param opt
 * @returns parsed result
 */
export function gitStatus(opt: {
  [key: string]: any;
  /** current working directory */
  cwd: string;
  /** true = --porcelain */
  porcelain?: boolean;
}): ObjResult[];

/**
 * git status
 * @param opt
 * @returns parsed result
 */
export function gitStatus(opt: {
  [key: string]: any;
  /** current working directory */
  cwd: string;
}): ObjResult[];

/**
 * git status
 * @param opt
 * @returns
 */
export function gitStatus(opt: {
  [key: string]: any;
  /** current working directory */
  cwd: string;
  /** true = --porcelain */
  porcelain?: boolean;
  /** show raw output instead parsed object */
  raw?: boolean;
}) {
  // set porcelain true
  if (typeof opt.porcelain !== 'boolean') opt.porcelain = true;
  let result: spawnSyncReturn;
  if (opt.porcelain) {
    result = spawn.sync('git', ['status', '--porcelain'], opt);
  } else {
    result = spawn.sync('git', ['status'], opt);
  }

  if (!opt.raw) {
    return String(result.stdout)
      .split(/\r?\n/gm)
      .filter((str) => str.length > 0)
      .map((str) => {
        const exec = Array.from(/^([MD\\?]{1,2})\s(.*)/g.exec(str.trim()) || []);
        // set `??` as untracked
        if (exec[1] === '??') exec[1] = 'U';
        // convert as object
        const obj = { [exec[1]]: exec[2] };
        return obj;
      }) as ObjResult[];
  } else {
    return result;
  }
}
