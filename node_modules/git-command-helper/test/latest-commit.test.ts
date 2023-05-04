import { beforeAll, describe, expect, it } from '@jest/globals';
import git, { gitCommandHelper } from '../src';
import { TestConfig } from './config';

describe('latestCommit() - get latest commit', () => {
  let gh: git;
  beforeAll(async () => {
    gh = new gitCommandHelper(TestConfig.cwd);
    await gh.reset(TestConfig.branch);
  });

  it('root repository', async () => {
    const commit = await gh.latestCommit();
    console.log({ commit });
    expect(commit).toBe('ca0d4d0');
  });
});
