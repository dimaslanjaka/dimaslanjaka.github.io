import { cwd, join } from '../src/node/filemanager';
import { originalParsePost as parsePost } from '../src/markdown/transformPosts/parsePost';

const fileBermasalah = ['source/guide/frontmatter.md'].map((s) => join(cwd(), s));
const target = fileBermasalah[0];
const parsed = parsePost(target);
console.log(parsed);
