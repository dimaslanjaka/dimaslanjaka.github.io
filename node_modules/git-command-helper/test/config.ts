import path, { join } from 'upath';

export const token = process.env.ACCESS_TOKEN || process.env.GITHUB_TOKEN || 'token_' + Math.random();

export const TestConfig = {
  /**
   * Git directory
   */
  cwd: join(__dirname, '../tmp/project-test'),
  branch: 'test',
  remote: 'https://github.com/dimaslanjaka/test-repo.git',
  user: 'dimaslanjaka',
  email: 'dimaslanjaka@gmail.com',
  token
};

export const testcfg = TestConfig;

/**
 * Check current instance is jest
 * @returns
 */
export function areWeTestingWithJest() {
  return process.env.JEST_WORKER_ID !== undefined;
}

export const myGithubPages = {
  cwd: path.join(__dirname, '../tmp', '.deploy_git'),
  branch: 'master',
  remote: `https://${token}@github.com/dimaslanjaka/dimaslanjaka.github.io.git`,
  user: 'dimaslanjaka',
  email: 'dimaslanjaka@gmail.com',
  token
};
