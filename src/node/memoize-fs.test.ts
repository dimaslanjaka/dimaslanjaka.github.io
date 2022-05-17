import { default as mem } from './memoize-fs';

const memoizer = new mem();
memoizer.verbose = true;

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
  //memoizer.clear(func);
  for (let index = 0; index < 2; index++) {
    const r = Math.floor(Math.random() * (10 - 0 + 1) + 0);
    const resultOne = memoizedFn(1, r);
    console.log(resultOne, idx, idx === 0 ? 'cached' : 'non-cached');
  }
})();
