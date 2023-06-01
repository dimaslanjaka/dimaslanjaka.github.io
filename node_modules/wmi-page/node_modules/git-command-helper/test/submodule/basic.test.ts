import { beforeAll, describe, expect, it, jest } from '@jest/globals';
import gitHelper from '../../src';
import submodule from '../../src/submodule';
import { testcfg } from '../config';

describe('test submodules', () => {
  jest.setTimeout(60000);
  let github: gitHelper;

  beforeAll(async function () {
    github = new gitHelper(testcfg.cwd, testcfg.branch);
    await github.reset(testcfg.branch);
  });

  it('.gitmodules not found', () => {
    expect(github.submodule).toBe(undefined);
    // assign submodule manually
    github.submodule = new submodule(github.cwd);
  });

  it('have submodule', async () => {
    await github.submodule?.add({ remote: 'https://github.com/dimaslanjaka/hexo-is', dest: 'packages/hexo-is' });
    expect(github.submodule?.hasSubmodule()).toBe(true);
  });

  it('remove submodule', async () => {
    await github.submodule?.remove('packages/hexo-is');
    expect(github.submodule?.hasSubmodule()).toBe(false);
  });
});
