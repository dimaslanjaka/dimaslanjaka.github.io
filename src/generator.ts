import taskCopy from './gulp/tasks/article-copy';
import { existsSync, rmdirSync } from './node/filemanager';
import { tmp } from './types/_config';
if (existsSync(tmp())) rmdirSync(tmp());
taskCopy();
