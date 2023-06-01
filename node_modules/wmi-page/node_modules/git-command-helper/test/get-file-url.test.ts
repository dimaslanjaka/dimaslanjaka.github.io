import { beforeAll, describe, expect, it } from '@jest/globals';
import { join } from 'path';
import git, { gitCommandHelper } from '../src';
import { getGithubRepoUrl } from '../src/functions/getGithubRepoUrl';

describe('getGithubRepoUrl() - get file url', () => {
  let gh: git;
  let branch: string;

  beforeAll(async () => {
    gh = new gitCommandHelper(join(__dirname, '..'));
    branch = (await gh.getbranch()).filter((o) => o.active)[0].branch;
  });

  it('should be have properties', async () => {
    const obj = await gh.getGithubRepoUrl(join(__dirname, 'config.ts'));
    expect(obj).toHaveProperty('remoteURL');
    expect(obj).toHaveProperty('rawURL');
  });

  it('properties should be have correct value', async () => {
    const obj = await getGithubRepoUrl(join(__dirname, 'config.ts'));
    expect(obj.remoteURL).toBe('https://github.com/dimaslanjaka/git-command-helper/tree/' + branch + '/test/config.ts');
    expect(obj.rawURL).toBe('https://github.com/dimaslanjaka/git-command-helper/raw/' + branch + '/test/config.ts');
  });
});
