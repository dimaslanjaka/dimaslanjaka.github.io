import { write } from '../../node/filemanager';
import { tmp } from '../../types/_config';
import generateTags from './generate-tags';

const test1 = generateTags('Blogging', 4);
write(tmp('tags/Blogging-4.html'), test1);
