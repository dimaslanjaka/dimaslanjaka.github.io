import { cwd } from 'process';
import { join } from 'upath';
import modifyPost from './modifyPost';
import parsePost from './parsePost';

const parse = parsePost(
  join(cwd(), 'src-posts', 'The Legend Of Neverland/Quiz.md')
);
const modify = modifyPost(parse);
