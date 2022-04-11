/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { dirname, existsSync, mkdirSync, writeFileSync } from '../node/filemanager';
import yaml from 'yaml';
import { parsePostReturn } from './transformPosts/parsePost';
import color from '../node/color';
export { parsePostReturn } from './transformPosts/parsePost';
export { parsePost } from './transformPosts/parsePost';

/**
 * Save Parsed Hexo markdown post
 * @param parsed return {@link parsePost}
 * @param file file path to save
 */
export function saveParsedPost(parsed: parsePostReturn, file: string) {
  if (!existsSync(dirname(file))) mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, buildPost(parsed));
}

/**
 * Rebuild {@link parsePost} result to markdown post back
 * @param parsed parsed post return {@link parsePost}
 * @returns
 */
export function buildPost(parsed: parsePostReturn) {
  return `---\n${yaml.stringify(parsed.metadata)}---\n\n${parsed.body}`;
}

/**
 * validate {@link parsePost}
 * @param parse
 * @returns
 */
export const validateParsed = (parse: parsePostReturn) => {
  if (parse === null) return false;
  if (typeof parse === 'undefined') return false;
  if (parse && !parse.body) {
    console.log(color['Red Orange']('body of null:'));
    return false;
  }
  return true;
};
