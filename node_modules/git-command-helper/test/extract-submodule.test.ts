import { describe, expect, it } from '@jest/globals';
import { join } from 'path';
import extractSubmodule from '../src/extract-submodule';

describe('extract .gitmodules', () => {
  it('should be array', () => {
    const arr = extractSubmodule(join(__dirname, 'fixtures/test.ini'));
    expect(Array.isArray(arr)).toBeTruthy();
    expect(typeof arr[0] === 'undefined').toBeTruthy();
    expect(typeof arr[1] === 'undefined').toBeTruthy();
    expect(typeof arr[2] === 'object').toBeTruthy();
  });
});
