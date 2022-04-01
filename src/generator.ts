import taskCopy from './gulp/tasks/article-copy';
import { default as taskGenerate } from './gulp/tasks/article-generate';
import scheduler from './node/scheduler';
import GulpClient from 'gulp';
import taskDeploy from './gulp/deploy';
import afterGenerate from './gulp/tasks/after-generate';
//if (existsSync(tmp())) rmdirSync(tmp());

// register scheduler
new scheduler();

// article copy
GulpClient.task('copy', taskCopy);
GulpClient.task('generate', taskGenerate);
GulpClient.task('after-generate', afterGenerate);
GulpClient.task('deploy', taskDeploy);
GulpClient.task('default', GulpClient.series(taskCopy, taskGenerate, afterGenerate));
