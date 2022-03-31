import taskCopy from './gulp/tasks/article-copy';
import { existsSync, rmdirSync } from './node/filemanager';
import scheduler from './node/scheduler';
import { tmp } from './types/_config';
if (existsSync(tmp())) rmdirSync(tmp());

// register scheduler
new scheduler();

// article copy
if (typeof exports != 'undefined') exports.copy = taskCopy;
taskCopy();
