/**
 * clean white spaces
 * @param s
 * @returns
 */
export const cleanWhiteSpace = (s: string, replacement = '') => s.replace(/\s+/gm, replacement);
