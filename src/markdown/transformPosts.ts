import { postMap } from 'hexo-post-parser';
import yaml from 'yaml';
import color from '../node/color';
import { dirname, existsSync, mkdirSync, writeFileSync } from '../node/filemanager';
export { parsePost } from 'hexo-post-parser';

/**
 * Save Parsed Hexo markdown post
 * @param parsed return {@link parsePost}
 * @param file file path to save
 */
export function saveParsedPost(parsed: postMap, file: string) {
  if (!existsSync(dirname(file))) mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, buildPost(parsed));
}

/**
 * Rebuild {@link parsePost} result to markdown post back
 * @param parsed parsed post return {@link parsePost}
 * @returns
 */
export function buildPost(parsed: Partial<postMap>) {
  return `---\n${yaml.stringify(parsed.metadata)}---\n\n${parsed.body}`;
}

/**
 * validate {@link parsePost}
 * @param parse
 * @returns
 */
export const validateParsed = (parse: Partial<postMap>) => {
  if (parse === null) return false;
  if (typeof parse === 'undefined') return false;
  if (parse && !parse.body) {
    console.log(color['Red Orange']('body of null:'));
    return false;
  }
  return true;
};
