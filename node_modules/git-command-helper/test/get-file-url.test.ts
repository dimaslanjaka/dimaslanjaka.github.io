import { describe, expect, it } from '@jest/globals';
import { join } from 'path';
import { getGithubRepoUrl } from '../src/git-info';

describe('test get file url', () => {
  it('should be have properties', async () => {
    const obj = await getGithubRepoUrl(join(__dirname, 'config.ts'));
    expect(obj).toHaveProperty('remoteURL');
    expect(obj).toHaveProperty('rawURL');
  });

  it('properties should be have correct value', async () => {
    const obj = await getGithubRepoUrl(join(__dirname, 'config.ts'));
    expect(obj.remoteURL).toBe('https://github.com/dimaslanjaka/git-command-helper/tree/monorepo/test/config.ts');
    expect(obj.rawURL).toBe('https://github.com/dimaslanjaka/git-command-helper/raw/monorepo/test/config.ts');
  });
});
