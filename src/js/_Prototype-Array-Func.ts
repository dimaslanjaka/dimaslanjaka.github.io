function array_filter(array: []) {
  return array.filter(function (el) {
    return el != null;
  });
}

/**
 * pick random from array
 * @param {Array<any>} arrays
 * @param {boolean} unique Unique the arrays
 */
function array_rand(arrays: any[], unique: any) {
  if (unique) {
    arrays = array_unique(arrays);
  }
  const index = Math.floor(Math.random() * arrays.length);
  return {
    index: index,
    value: arrays[index],
  };
}

/**
 * Array unique
 * @param {Array<any>} arrays
 */
function array_unique(arrays: any[]) {
  return arrays.filter(function (item: any, pos: any, self: string | any[]) {
    return self.indexOf(item) == pos;
  });
}

/**
 * Unset array
 * @param {Array<any>} arrayName
 * @param {String|number} key
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function array_unset(arrayName: { [x: string]: any }, key: any) {
  let x: string | number;
  const tmpArray = [];
  for (x in arrayName) {
    if (x != key) {
      tmpArray[x] = arrayName[x];
    }
  }
  return tmpArray;
}

/**
 * PHP shuffle array equivalent
 * @param array
 * @example
 * var arr = [2, 11, 37, 42];
 * shuffle(arr);
 * console.log(arr); //return random
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function shuffle(array: Array<any>) {
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

function arrayCompare(a1: Array<any>, a2: Array<any>) {
  if (a1.length != a2.length) return false;
  const length = a2.length;
  for (let i = 0; i < length; i++) {
    if (a1[i] !== a2[i]) return false;
  }
  return true;
}

/**
 * in_array PHP equivalent
 * @param needle string etc
 * @param haystack
 */
function inArray(needle: any, haystack: Array<any>) {
  const length = haystack.length;
  for (let i = 0; i < length; i++) {
    if (typeof haystack[i] == "object") {
      if (arrayCompare(haystack[i], needle)) return true;
    } else {
      if (haystack[i] == needle) return true;
    }
  }
  return false;
}

/**
 * in_array PHP equivalent
 * @param needle string etc
 * @param haystack
 */
function in_array(needle: any, haystack: Array<any>) {
  return inArray(needle, haystack);
}

/**
 * get all keys
 * @param haystack string etc
 */
function array_keys(haystack: any) {
  return Object.keys(haystack);
}

/**
 * Shuffles array in place.
 * @param a items An array containing the items.
 */
function array_shuffle(a: Array<any>) {
  let j: number, x: any, i: number;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

/**
 * Deep merge two or more objects into the first.
 * (c) 2021 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param objects  The objects to merge together
 * @returns Merged values of defaults and options
 */
function deepAssign(...objects: object[]): object {
  // Make sure there are objects to merge
  const len = objects.length;
  if (len < 1) return;
  if (len < 2) return objects[0];

  // Merge all objects into first
  for (let i = 1; i < len; i++) {
    for (const key in objects[i]) {
      if (objects[i].hasOwnProperty(key)) {
        // If it's an object, recursively merge
        // Otherwise, push to key
        if (Object.prototype.toString.call(objects[i][key]) === "[object Object]") {
          objects[0][key] = deepAssign(objects[0][key] || {}, objects[i][key]);
        } else {
          objects[0][key] = objects[i][key];
        }
      }
    }
  }

  return arguments[0];
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    array_shuffle,
    array_keys,
    in_array,
    deepAssign,
  };
}
