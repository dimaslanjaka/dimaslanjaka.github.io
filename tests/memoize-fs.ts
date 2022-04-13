import { default as mem } from '../src/node/memoize-fs';
import { cacheDir, join } from '../src/node/filemanager';

const memoizer = new mem();

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
  const memoizedFn = memoizer.fn(func);
  memoizer.clear(func);
  for (let index = 0; index < 10; index++) {
    const resultOne = memoizedFn(1, 2);
    console.log(resultOne, idx, idx === 0 ? 'cached' : 'non-cached');
  }
})();
