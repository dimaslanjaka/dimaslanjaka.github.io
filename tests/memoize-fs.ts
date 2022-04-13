import memoizeFs from 'memoize-fs';
import { cacheDir, join } from '../src/node/filemanager';

const memoizer = memoizeFs({ cachePath: join(cacheDir, 'memoize-fs') });

//console.log(memoizer);
// => {
//   fn: [Function: fn],
//   getCacheFilePath: [Function: getCacheFilePathBound],
//   invalidate: [Function: invalidateCache]
// }

let idx = 0;
const func = function foo(a: number, b: number) {
  idx += a + b;
  return idx;
};

(async () => {
  const memoizedFn = await memoizer.fn(func);
  for (let index = 0; index < 4; index++) {
    const resultOne = await memoizedFn(1, 2);
    console.log(resultOne, idx, idx === 0 ? 'cached' : 'non-cached');
  }
})();
