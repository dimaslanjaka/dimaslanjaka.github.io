import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import gitHelper from '../src';
import { testcfg } from './config';

describe('canPush()', () => {
  let github: gitHelper;
  jest.setTimeout(60000);

  beforeEach(function () {
    github = new gitHelper(testcfg.cwd);
  });

  it('cannot push after reset', async () => {
    await github.reset(testcfg.branch);

    const can = await github.canPush();
    expect(can).toBe(false);
  });

  it('cannot push after modify file without commit', async () => {
    fs.writeFileSync(
      path.join(testcfg.cwd, 'canPush.txt'),
      Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    );
    const can = await github.canPush();
    expect(can).toBe(false);
  });

  it('can push after commit', async () => {
    await github.add('.');
    await github.commit('update test', 'm', { stdio: 'pipe' });
    const can = await github.canPush();
    expect(can).toBe(true);
  });
});
