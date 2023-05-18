import { beforeAll, describe, expect, it } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { git } from '../src';
import { testcfg } from './config';

describe('canPush()', () => {
  let github: git;
  // jest.setTimeout(60000);

  beforeAll(function () {
    github = new git(testcfg.cwd);
  }, 90000);

  it('cannot push after reset', async () => {
    await github.reset(testcfg.branch);

    const can = await github.canPush();
    expect(can).toBe(false);
  }, 90000);

  it('cannot push after modify file without commit', async () => {
    fs.writeFileSync(
      path.join(testcfg.cwd, 'canPush.txt'),
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    );
    const can = await github.canPush();
    expect(can).toBe(false);
  }, 90000);

  it('can push after commit', async () => {
    await github.add('.');
    await github.commit('update test', 'm', { stdio: 'pipe' });
    const can = await github.canPush();
    expect(can).toBe(true);
  }, 90000);
});
