import { beforeAll, describe, expect, it } from '@jest/globals';
import git, { gitCommandHelper } from '../src';
import { TestConfig } from './config';

describe('latestCommit() - get latest commit', () => {
  let gh: git;
  beforeAll(async () => {
    gh = new gitCommandHelper(TestConfig.cwd, TestConfig.branch);
    await gh.reset(TestConfig.branch);
  });

  it('root repository', async () => {
    expect((await gh.latestCommit(undefined, { short: true }))?.startsWith('524949a')).toBeTruthy();
    expect(await gh.latestCommit(undefined, { short: false })).toBe('524949a2e012a82784bcc3d955b117a74a385a03');
    expect((await gh.latestCommit())?.startsWith('524949a')).toBeTruthy();
  });

  it('README.md', async () => {
    const shortHash = await gh.latestCommit('README.md', { short: true });
    expect(shortHash?.startsWith('9e6355a')).toBeTruthy();
    const longHash = await gh.latestCommit('README.md', { short: false });
    expect(longHash).toBe('9e6355ad21e9d555418c4092cb60b5a67242c676');
  });
});
