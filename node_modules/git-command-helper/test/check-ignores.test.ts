import { beforeAll, describe, expect, it } from '@jest/globals';
import { writeFileSync } from 'fs-extra';
import { join } from 'path';
import { getIgnores, isIgnored } from '../src/functions/gitignore';
import { testcfg } from './config';

describe('.gitignore test', () => {
  const ignoredFile = join(testcfg.cwd, 'file-ignore.txt');
  const ignoredFile2 = join(testcfg.cwd, 'file-ignore-another.txt');

  beforeAll(() => {
    writeFileSync(ignoredFile, '');
    writeFileSync(ignoredFile2, '');
  });

  it('should have file-ignore.txt', async () => {
    const check = await getIgnores(testcfg);
    expect(check.includes('file-ignore.txt')).toBeTruthy();
  });

  it('should be ignored', async () => {
    // absolute
    expect(await isIgnored(ignoredFile)).toBeTruthy();
    // relative
    expect(await isIgnored('file-ignore.txt')).toBeTruthy();
    // absolute another wildcard
    expect(await isIgnored(ignoredFile2)).toBeTruthy();
  }, 90000);

  it('pattern new-file-*', async () => {
    /**
     * this file should be indexed
     */
    const indexed = join(testcfg.cwd, 'new-file.txt');
    /**
     * this file should be ignored
     */
    const ignored = join(testcfg.cwd, 'new-file-another.txt');
    writeFileSync(ignored, '');
    writeFileSync(indexed, '');

    expect(await isIgnored(ignored)).toBeTruthy();
    expect(await isIgnored(indexed)).toBeFalsy();
  }, 90000);
});
