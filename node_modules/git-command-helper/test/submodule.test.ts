import { beforeAll, beforeEach, describe, expect, it, jest } from '@jest/globals';
import gitHelper from '../src';
import clone from './clone';
import { TestConfig } from './config';

describe('test pull', () => {
  jest.setTimeout(60000);
  let github: gitHelper;

  beforeAll(async function () {
    await clone();
  });

  beforeEach(async function () {
    github = new gitHelper(TestConfig.cwd);
    await github.setremote(TestConfig.remote);
    await github.setbranch(TestConfig.branch);
    await github.setuser(TestConfig.username);
    await github.setemail(TestConfig.email);
  });

  it('test not have submodule', async () => {
    expect(github.submodule.hasSubmodule()).toBe(false);
  });

  it('test have submodule', async () => {
    await github.submodule.add({ remote: 'https://github.com/dimaslanjaka/hexo-is', dest: 'packages/hexo-is' });
    expect(github.submodule.hasSubmodule()).toBe(true);
  });

  it('test remove submodule', async () => {
    await github.submodule.remove('packages/hexo-is');
    expect(github.submodule.hasSubmodule()).toBe(true);
  });
});
