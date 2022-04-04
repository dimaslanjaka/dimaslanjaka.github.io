import { md5 } from './md5-file';

/**
 * UUID V4 Generator
 * @param fromString generate based on string (unique based on this string)
 * @returns ex: a2d6fee8-369b-bebc-3d8e-b8ff2faf40d3
 */
export default function uuidv4(fromString?: string) {
  let original = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'; // length 8-4-4-4-12
  if (fromString) {
    const hash = md5(fromString);
    original = original.replace(/^xxxxxxxx-xxxx/, hash.slice(0, 8) + '-' + hash.slice(9, 13)).replace(/xxx-xxxxxxxxxxxx$/, hash.slice(14, 17) + '-' + hash.slice(18, 30));
  }
  return original.replace(/[xy]/g, function (c) {
    if (!fromString) {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    } else {
      const r = 0;
      let v = r | 0x8;
      if (c == 'y') v = (r & 0x3) | 0x8;
      return v.toString(16);
    }
  });
}
