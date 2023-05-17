import 'core-js/actual';
import { existsSync } from 'fs';
import { join } from 'path';
import { spawn } from '../src';
import { TestConfig } from './config';

/**
 * do clone when destination folder not exist
 */
async function clone() {
  // if (existsSync(TestConfig.cwd)) await rm(TestConfig.cwd, { recursive: true, force: true });
  const cfg = structuredClone(TestConfig);
  delete cfg.password;

  if (!existsSync(TestConfig.cwd)) {
    console.log('cloning', cfg);
    await spawn('git', ['clone', '-b', TestConfig.branch, TestConfig.remote, 'tmp/project-test'], {
      cwd: join(__dirname, '../'),
      stdio: 'inherit'
    });
  }
}

export default clone;
