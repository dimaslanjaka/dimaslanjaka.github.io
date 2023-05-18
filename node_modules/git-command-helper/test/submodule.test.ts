import { beforeAll, describe, expect, it, jest } from '@jest/globals';
import gitHelper from '../src';
import { testcfg } from './config';

describe('test submodules', () => {
  jest.setTimeout(60000);
  let github: gitHelper;

  beforeAll(async function () {
    github = new gitHelper(testcfg.cwd, testcfg.branch);
    await github.reset(testcfg.branch);
  });

  it('not have submodule', () => {
    expect(github.submodule.hasSubmodule()).toBe(false);
  });

  it('have submodule', async () => {
    await github.submodule.add({ remote: 'https://github.com/dimaslanjaka/hexo-is', dest: 'packages/hexo-is' });
    expect(github.submodule.hasSubmodule()).toBe(true);
  });

  it('remove submodule', async () => {
    await github.submodule.remove('packages/hexo-is');
    expect(github.submodule.hasSubmodule()).toBe(false);
  });
});
