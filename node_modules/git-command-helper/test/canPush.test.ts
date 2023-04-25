import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import gitHelper from '../src';
import { TestConfig } from './config';

describe('test can push detector', () => {
  let github: gitHelper;
  jest.setTimeout(60000);

  beforeEach(async function () {
    github = new gitHelper(TestConfig.cwd);
    await github.setremote(TestConfig.remote);
    await github.setbranch(TestConfig.branch);
    await github.setuser(TestConfig.username);
    await github.setemail(TestConfig.email);
  });

  it('cannot push after reset', async () => {
    await github.reset(TestConfig.branch);

    const can = await github.canPush();
    expect(can).toBe(false);
  });

  it('cannot push after modify file without commit', async () => {
    fs.writeFileSync(
      path.join(TestConfig.cwd, 'canPush.txt'),
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
