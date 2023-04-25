import { existsSync } from 'fs';
import { join } from 'path';
import { spawn } from '../src';
import { TestConfig } from './config';

/**
 * do clone
 */
async function clone() {
  // if (existsSync(TestConfig.cwd)) await rm(TestConfig.cwd, { recursive: true, force: true });
  console.log('cloning', TestConfig);
  if (!existsSync(TestConfig.cwd))
    await spawn('git', ['clone', '-b', TestConfig.branch, TestConfig.remote, 'tmp/project-test'], {
      cwd: join(__dirname, '../'),
      stdio: 'inherit'
    });
}

export default clone;
