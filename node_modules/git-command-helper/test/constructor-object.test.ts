import { describe, expect, it } from '@jest/globals';
import path from 'path';
import git from '../src';

describe('git - constructor with object', () => {
  const obj = {
    cwd: path.join(__dirname, '../tmp', '.deploy_git'),
    branch: 'master',
    remote: `https://${process.env.ACCESS_TOKEN}@github.com/dimaslanjaka/dimaslanjaka.github.io.git`,
    user: 'dimaslanjaka',
    email: 'dimaslanjaka@gmail.com'
  };
  const github = new git(obj);

  Object.keys(obj).forEach((key) => {
    it(key + ' property should be same', () => {
      expect(github[key]).toEqual(obj[key]);
    });
  });
});
