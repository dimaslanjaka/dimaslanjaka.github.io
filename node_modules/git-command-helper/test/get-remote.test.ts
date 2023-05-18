import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';
import { spawnAsync } from 'cross-spawn';
import git, { gitCommandHelper } from '../src';
import { testcfg } from './config';

describe('get remote', () => {
  let gh: git;
  const newremote = 'https://username:TOKEN@github.com/dimaslanjaka/test-repo.git';

  beforeAll(async () => {
    gh = new gitCommandHelper(testcfg.cwd);
    // set new remote with username and token
    await gh.setremote(newremote, 'origin');
  });

  afterAll(async () => {
    // rollback using original remote
    await gh.setremote(testcfg.remote, 'origin');
  });

  it('should be new remote', async () => {
    const remotes = await spawnAsync('git', ['remote', '-v'], { cwd: testcfg.cwd });
    expect(remotes.stdout.includes(newremote)).toBeTruthy();
  });

  it('should be original remote', async () => {
    const remote = await gh.getremote();
    expect(remote.fetch.url).toBe(testcfg.remote);
  });
});
