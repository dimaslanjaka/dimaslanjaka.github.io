import minimatch from 'minimatch';
import micromatch from 'micromatch';
const pattern = '!*.js';

['file.js', '/x/file.js', '/x/x/file.js', '/x/x/x/file.js', '/x/x/x/x/file.js'].forEach((s) => {
  const mini = minimatch(s, pattern, { matchBase: true, dot: true });
  const micro = micromatch.isMatch(s, pattern, { matchBase: true, dot: true, regex: true, windows: true, contains: true, nocase: true });
  console.log('minimatch', mini, s);
  console.log('micromatch', micro, s);
});
