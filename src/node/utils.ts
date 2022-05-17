/**
 * clean white spaces
 * @param s
 * @returns
 */

export function cleanWhiteSpace(text: string) {
  if (typeof text == 'string') return text.replace(/\s+/gm, ' ');
  return text;
}

/**
 * clean string with exception char
 * @param text
 * @returns
 */
export function cleanString(text: string, exception = '.,-_ ') {
  if (typeof text == 'string') return text.replace(new RegExp('[^a-zA-Z0-9' + exception + ']', 'gm'), '');
  return text;
}
