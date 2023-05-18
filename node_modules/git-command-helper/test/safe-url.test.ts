import { describe, expect, it } from '@jest/globals';
import { safeURL } from '../src/utils/safe-url';

describe('safe url', () => {
  it('token should be removed', () => {
    const safe = safeURL('https://TOKEN@github.com/username/repository-name/blob/filename#L01-L202');
    expect(safe).toBe('https://github.com/username/repository-name/blob/filename#L01-L202');
  });
});
