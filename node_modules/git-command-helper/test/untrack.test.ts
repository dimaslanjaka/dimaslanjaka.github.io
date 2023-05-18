import { beforeAll, describe, expect, test } from '@jest/globals';
import { writeFileSync } from 'fs';
import { join } from 'path';
import git, { gitHelper } from '../src';
import { isUntracked } from '../src/functions/isFileChanged';
import { testcfg } from './config';

describe('untrack', () => {
  let gh: git;
  beforeAll(async () => {
    gh = new gitHelper(testcfg.cwd, testcfg.branch);
    await gh.reset(testcfg.branch);
  });

  test('write new file', async () => {
    const newfile = join(testcfg.cwd, 'new.txt');
    writeFileSync(newfile, Math.random().toFixed(2));
    const result = await isUntracked('new.txt', { cwd: testcfg.cwd });
    expect(result).toBeTruthy();
  });

  test('file not found', async () => {
    const result = await isUntracked('newxxx.txt', { cwd: testcfg.cwd });
    expect(result).toBeFalsy();
  });
});
