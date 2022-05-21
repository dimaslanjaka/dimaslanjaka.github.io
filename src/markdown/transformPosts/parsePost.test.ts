import { readFileSync, writeFile } from 'fs';
import { join } from 'upath';
import { root, tmp } from '../../types/_config';
import parsePost from './parsePost';

const path = join(root, 'src-posts/Tests/shortcodes.md');
const parse = parsePost(path, readFileSync(path, 'utf-8'));
writeFile(tmp('test.json'), JSON.stringify(parse, null, 2), (err) => {
  if (!err) console.log(tmp('test.json'));
});
