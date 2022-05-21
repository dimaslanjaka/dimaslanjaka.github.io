import { md5 } from './md5-file';

/**
 * Persistent UUID V4 Generator based on inputted string
 * @param fromString `null`: based on caller function name, line, and path
 * @param fromString generate based on string (unique based on this string)
 * @returns ex: a2d6fee8-369b-bebc-3d8e-b8ff2faf40d3
 * @example
 * for (let index = 0; index < 5; index++) console.log(uuidv4()); // <- will printted same id
 */
export default function uuidv4(fromString?: string) {
  let original = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'; // length 8-4-4-4-12
  if (typeof fromString === 'string') {
    const hash = md5(fromString);
    original = original
      .replace(/^xxxxxxxx-xxxx/, hash.slice(0, 8) + '-' + hash.slice(9, 13))
      .replace(
        /xxx-xxxxxxxxxxxx$/,
        hash.slice(14, 17) + '-' + hash.slice(18, 30)
      );
  } else {
    const err = new Error();
    const caller_line = err.stack.split('\n')[2];
    const index = caller_line.indexOf('at ');
    const dumpClean = caller_line.slice(index + 2, caller_line.length);
    return uuidv4(md5(dumpClean));
  }
  return original.replace(/[xy]/g, function (c) {
    if (typeof fromString !== 'string') {
      // if no input
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    } else {
      // if with input
      const r = 0;
      let v = r | 0x8;
      if (c == 'y') v = (r & 0x3) | 0x8;
      return v.toString(16);
    }
  });
}

/**
 * generate random id
 * @param n
 * @param prefix
 * @returns
 */
export const makeid = (n = 36, prefix = '') => {
  if (n > 1) return prefix + Math.random().toString(n).slice(2);
  let text = '';
  const charset = 'abcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < n; i++)
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  return text;
};
