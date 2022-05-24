/**
 * remove empties from array
 * @param array
 * @param keep keep item such as `[null, 0, '']`
 * @returns
 * @see {@link https://www.typescriptlang.org/play?downlevelIteration=true&target=3&jsx=0&module=1#code/MYewdgzgLgBAhgJwXAnjAvDA2gRgDQwBMBAzAQK5gAmApgGYCWYNVBADAWOQDbcEBE-AVSr8AugG4AsAChQkENxoA6YEsQAKAJTS54CIpXcQAcw38A1jRoAHeLwBc-HbPkGly42YQ0AtiAA3GgBRXxsoBhoIDURkFAIsLl52AXEtFz0FDy9zK1sYAC8aBBAYDTYtJwy3Q09TDR9-INDwyOjY1AS2MXTdGuz6y2s7JO4qvv1anMbAkLCIqJikTuxRnurJgbMh-L9wtGgEJhNx102jepnm+baluITBdYmsi+2qcFg8uzgwFCgAC2Op0y7leDT8sxaC3ayxQvVksgA9AAqZGyGDImBXGgwPbQmB0Eq+eCw9GYgACNkQcGJHRQZJglOpxK+MFZDCgfhgEHIwH+8Agqx4fBgHBgAHJxWIGeSfFByAhIDKaAAPGk2JRksmI2R0SjACLgLEQ66tKIAHgAKriVZzqIKfigsGIAHwadEkuIOGCWvAer7ejSjGAAHxgXF8ACNiqHuVAjmATFpnRhsNKZFoYABvD1KWDMADuAEFYam6cpGNxOQgNBoOX5M+gXTAoCgbDQQHQYPXiQBCdCYfiUWiMZiiDIwGBuT7DQWYL7KXxwGy1nuN5sAZXjxzrnN88Jkk4YXY0va+EGUTDU5Fo0X4o2cWg9k8LJbiqdfsIrDCrxVXe-Xbs9xgftMFGCcYERRF+jBcUoBwcVOBoYtYQg48yjPWdLzAa9b3MNhH2zZ9w2Qt9UA-Uiv0rat-wbDBmxzQ9J2Y9CNFbdtOyArkBxge9yCjYpnGNeVFS4vseLYXRmOYuUFTAFsEHIGgpOYgBfCDVI9KCYLqMw4MIRCSJQuI0JPTDbAvK9uBvRZBHSIimJfSj3zA5zUG-X8a13Oimwc6SjxPdiOy7HsMEHQ5jiE2TRJ7ZRt18bRPBoRMARgZtJOIydovk+MlJUyd1JUzSmOyoyyLQOBBUtXRiqAA}
 * @example
 */
export function removeEmpties<T extends any[]>(
  array: T,
  keep: (null | number | string)[] = []
) {
  let newArray = array.filter((item) => typeof item !== 'undefined');
  const keeps = keep.map((item) => String(item));
  if (!keeps.includes('null'))
    newArray = newArray.filter((item) => item !== null);
  //console.log('t1', newArray);
  if (!keeps.includes('0')) {
    newArray = newArray.filter((item) => {
      if (typeof item == 'number') return item !== 0;
      return true;
    });
  }
  //console.log('t2', newArray);
  if (!keeps.includes('')) {
    newArray = newArray.filter((item) => {
      if (typeof item == 'string') return item.trim().length > 0;
      return true;
    });
  }
  return newArray as T;
}

/**
 * get item from last index array
 * @param arr
 * @param lastIndex index from last
 * @see {@link https://www.typescriptlang.org/play?downlevelIteration=true&target=3&jsx=0&module=1#code/MYewdgzgLgBAhgJwXAnjAvDA2gRgDQwBMBAzAQK5gAmApgGYCWYNVBADAWOQDbcEBE-AVSr8AugG4AsAChQkENxoA6YEsQAKAJTS54CIpXcQAcw0maUADJxoASSg0AthsTIUpLTtmyA9ACp-WRh-GAtYBkcnGDoEEGjuWwjqGgAPeCRUYNCAAQAHRDhot2yYfMKEpLsU9KZadNj4mEToUpyES3IESGzfWTS8kARYOkpgKAZwMMsbeyiAHgAVGDTHagh4MBQsMQA+VyQALhhFghaoavqMGBwtGABvYJgOqC6wDIQsN2UlMBMoAAWMAAtM0qjVJLIAL6yIA}
 * @returns
 */
export function getLastItem<T extends any[]>(arr: T, lastIndex = 1) {
  return arr[arr.length - lastIndex];
}

/**
 * Unique string array case insensitive but keep one case sensitive result
 * @see {@link https://stackoverflow.com/a/48731445/6404439}
 * @example
 * console.log(uniqueStringArray(['James', 'james', 'bob', 'JaMeS', 'Bob'])); // ["JaMeS", "Bob"]
 */
export const uniqueStringArray = function (arr: Array<string>) {
  const filter = new Map(arr.map((s) => [s.toLowerCase(), s]));
  return [...filter.values()];
};

/**
 * @summary Add another array
 * @description Add another array to current array
 * @param self
 * @param otherArrays
 * @example
 * var a = [0,1];
 * var b = ['a','b'];
 * arrayAddAll(b, a); // concat a to b
 * console.log(b); // ['a','b',0,1]
 */
export const arrayAddAll = function <T extends any[]>(
  self: T,
  ...otherArrays: T[]
) {
  otherArrays.forEach(function (array) {
    array.forEach((item) => {
      self.push(item);
    });
  });
  return self;
};

/**
 * Array unique
 * @param {Array<any>} arrays
 */
export function array_unique(arrays: any[]) {
  return arrays.filter(function (item: any, pos: any, self: string | any[]) {
    return self.indexOf(item) == pos;
  });
}

/**
 * pick random from array
 * @param {Array<any>} arrays
 * @param {boolean} unique Unique the arrays
 */
export function array_rand(arrays: any[], unique: any) {
  if (unique) {
    arrays = array_unique(arrays);
  }
  const index = Math.floor(Math.random() * arrays.length);
  return {
    index: index,
    value: arrays[index]
  };
}

/**
 * PHP shuffle array equivalent
 * @param array
 * @example
 * var arr = [2, 11, 37, 42];
 * shuffle(arr);
 * console.log(arr); //return random
 */
export function shuffle(array: Array<any>) {
  let currentIndex = array.length,
    temporaryValue: any,
    randomIndex: number;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/**
 * @see {@link shuffle}
 */
export const array_shuffle = shuffle;

/**
 * Move item to another index
 * @see {@link https://stackoverflow.com/a/70618791/6404439}
 * @param arr
 * @param from
 * @param to
 * @returns
 */
export const array_move = function <T extends any[]>(
  arr: T,
  from: number,
  to: number
) {
  const itemRemoved = arr.splice(from, 1); // splice() returns the remove element as an array
  arr.splice(to, 0, itemRemoved[0]); // Insert itemRemoved into the target index
  return arr;
};

/**
 * @see {@link array_move}
 */
export const array_move_index = array_move;

/**
 * split array to chunks
 * @param sourceArray
 * @param chunkSize
 * @see {@link https://stackoverflow.com/a/71483760/6404439}
 * @returns
 * @example
let ar1 = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
];
// split array by 4
console.log("Split in chunks with 4 size", splitChunks(ar1, 4)); // [[1,2,3,4], [5,6,7,8]...]
 */
export function array_split_chunks<T extends any[]>(
  sourceArray: T,
  chunkSize: number
): T[] {
  if (chunkSize <= 0) throw 'chunkSize must be greater than 0';
  const result = [];
  for (let i = 0; i < sourceArray.length; i += chunkSize) {
    result[i / chunkSize] = sourceArray.slice(i, i + chunkSize);
  }
  return result;
}
