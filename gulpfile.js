/*import GulpClient from 'gulp';

GulpClient.task('article:copy', taskCopy);
GulpClient.task('default', GulpClient.series('article:copy'));
*/
const { createRequire } = require('module');
const require = createRequire(import.meta.url);
const taskCopy = require('./build/src/gulp/tasks/article-copy.js')

taskCopy();