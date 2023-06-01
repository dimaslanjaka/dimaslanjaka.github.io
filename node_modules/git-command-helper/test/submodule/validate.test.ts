import { describe, expect, it } from '@jest/globals';
import git from '../../src';
import { myGithubPages } from '../config';

describe('git - constructor with object', () => {
  const github = new git(myGithubPages);

  it('git.submodules is an non-empty Array', () => {
    expect(Array.isArray(github.submodules) && github.submodules.length > 0).toBeTruthy();
  });
});
