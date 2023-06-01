import { ansiRegex } from './ansi-regex';

export function stripAnsi(str: string) {
  return str.replace(ansiRegex(), '');
}
