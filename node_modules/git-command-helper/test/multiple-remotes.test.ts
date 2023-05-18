import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';
import { gitHelper, spawn } from '../src';
import { testcfg } from './config';

describe('test multiple url', () => {
  const github = new gitHelper(testcfg.cwd, testcfg.branch);

  beforeAll(async () => {
    // set new remote upstream
    await github.setremote('https://github.com/dimaslanjaka/hexo', 'upstream');
  });

  afterAll(() => {
    // remove upstream
    spawn('git', ['remote', 'remove', 'upstream'], { cwd: testcfg.cwd });
  });

  it('should valid origin', async () => {
    expect((await github.getremote())?.push.url).toBe(testcfg.remote);
  });

  it('should valid upstream', async () => {
    expect(await github.getremote('upstream')).toBe('https://github.com/dimaslanjaka/hexo');
  });
});
