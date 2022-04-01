import taskCopy from './gulp/tasks/article-copy';
import { default as taskGenerate } from './gulp/tasks/article-generate';
import scheduler from './node/scheduler';
import GulpClient from 'gulp';
//if (existsSync(tmp())) rmdirSync(tmp());

// register scheduler
new scheduler();

// article copy
GulpClient.task('copy', taskCopy);
GulpClient.task('generate', taskGenerate);
GulpClient.task('default', GulpClient.series(taskCopy, taskGenerate));
