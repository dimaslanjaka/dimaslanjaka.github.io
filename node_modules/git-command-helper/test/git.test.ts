import { beforeAll, describe, test } from '@jest/globals';
import git, { gitCommandHelper } from '../src';
import { testcfg } from './config';

describe('main class', () => {
  let gh: git;
  beforeAll(() => {
    gh = new gitCommandHelper(testcfg.cwd, testcfg.branch);
  }, 90000);

  test('setAutoRebase()', () => gh.setAutoRebase());
  test('setForceLF()', () => gh.setForceLF());
  test('fetch()', () => gh.fetch(), 90000);
  test('pullAcceptTheirs()', () => gh.pullAcceptTheirs(), 90000);
  /*test('info()', async () => {
    const info = await gh.info();
    expect(info).toHaveProperty('root');
    expect(info).toHaveProperty('branch');
  }, 90000);*/
});
