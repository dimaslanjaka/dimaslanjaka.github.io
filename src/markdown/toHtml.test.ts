import { join } from '../node/filemanager';
import { root } from '../types/_config';
import { renderBodyMarkdown } from './toHtml';
import { parsePost } from './transformPosts';

const postPath = join(root, 'src-posts', '/2022/05/fully-lazy-loaded-adsense.md');
const parse = parsePost(postPath, postPath, false);
const render = renderBodyMarkdown(parse, true);
export { postPath, parse, render };
