import GulpClient, { series } from 'gulp';
import taskCopy from './src/gulp/tasks/article-copy.js';

GulpClient.task('article:copy', taskCopy);
GulpClient.task('default', series('article:copy'));
exports.default = series('article:copy');
