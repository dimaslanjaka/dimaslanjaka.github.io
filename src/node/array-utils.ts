/**
 * remove empties from array
 * @param array
 * @param keep keep item such as `[null, 0, '']`
 * @returns
 * @see {@link https://www.typescriptlang.org/play?downlevelIteration=true&target=3&jsx=0&module=1#code/MYewdgzgLgBAhgJwXAnjAvDA2gRgDQwBMBAzAQK5gAmApgGYCWYNVBADAWOQDbcEBE-AVSr8AugG4AsAChQkENxoA6YEsQAKAJTS54CIpXcQAcw38A1jRoAHeLwBc-HbPkGly42YQ0AtiAA3GgBRXxsoBhoIDURkFAIsLl52AXEtFz0FDy9zK1sYAC8aBBAYDTYtJwy3Q09TDR9-INDwyOjY1AS2MXTdGuz6y2s7JO4qvv1anMbAkLCIqJikTuxRnurJgbMh-L9wtGgEJhNx102jepnm+baluITBdYmsi+2qcFg8uzgwFCgAC2Op0y7leDT8sxaC3ayxQvVksgA9AAqZGyGDImBXGgwPbQmB0Eq+eCw9GYgACNkQcGJHRQZJglOpxK+MFZDCgfhgEHIwH+8Agqx4fBgHBgAHJxWIGeSfFByAhIDKaAAPGk2JRksmI2R0SjACLgLEQ66tKIAHgAKriVZzqIKfigsGIAHwadEkuIOGCWvAer7ejSjGAAHxgXF8ACNiqHuVAjmATFpnRhsNKZFoYABvD1KWDMADuAEFYam6cpGNxOQgNBoOX5M+gXTAoCgbDQQHQYPXiQBCdCYfiUWiMZiiDIwGBuT7DQWYL7KXxwGy1nuN5sAZXjxzrnN88Jkk4YXY0va+EGUTDU5Fo0X4o2cWg9k8LJbiqdfsIrDCrxVXe-Xbs9xgftMFGCcYERRF+jBcUoBwcVOBoYtYQg48yjPWdLzAa9b3MNhH2zZ9w2Qt9UA-Uiv0rat-wbDBmxzQ9J2Y9CNFbdtOyArkBxge9yCjYpnGNeVFS4vseLYXRmOYuUFTAFsEHIGgpOYgBfCDVI9KCYLqMw4MIRCSJQuI0JPTDbAvK9uBvRZBHSIimJfSj3zA5zUG-X8a13Oimwc6SjxPdiOy7HsMEHQ5jiE2TRJ7ZRt18bRPBoRMARgZtJOIydovk+MlJUyd1JUzSmOyoyyLQOBBUtXRiqAA}
 * @example
 */
export function removeEmpties<T extends any[]>(array: T, keep: (null | number | string)[] = []) {
  let newArray = array.filter((item) => typeof item !== 'undefined');
  const keeps = keep.map((item) => String(item));
  if (!keeps.includes('null')) newArray = newArray.filter((item) => item !== null);
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
export const arrayAddAll = function <T extends any[]>(self: T, ...otherArrays: T[]) {
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
