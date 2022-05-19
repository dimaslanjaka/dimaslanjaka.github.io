import lodash from 'lodash';
/**
 * remove empties from array
 * @param array
 * @returns
 */
export function removeEmpties<T extends any[]>(array: T) {
  return lodash.filter(array, lodash.isEmpty);
}
/**
 * get item from last index array
 * @param arr
 * @param lastIndex index from last
 * @returns
 */
export function getLastItem<T extends any[]>(arr: T, lastIndex = 1) {
  return arr[arr.length - lastIndex];
}
