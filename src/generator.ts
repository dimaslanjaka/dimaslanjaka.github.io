import Bluebird from 'bluebird';
import taskCopy from './gulp/tasks/article-copy';
import { default as taskGenerate } from './gulp/tasks/article-generate';
import { existsSync, rmdirSync } from './node/filemanager';
import scheduler from './node/scheduler';
import { tmp } from './types/_config';
import yargs from 'yargs';
//if (existsSync(tmp())) rmdirSync(tmp());

// register scheduler
new scheduler();

// article copy
if (typeof exports != 'undefined') {
  exports.copy = taskCopy;
  exports.generate = taskGenerate;
  const parseArg = yargs(process.argv.slice(2)).argv;
  const wildArg: string[] = parseArg._;
  if (wildArg.length) {
    Bluebird.all(wildArg)
      .map((cmd) => exports[cmd])
      .each((fn) => (typeof fn == 'function' ? fn() : null));
  }
}
//Bluebird.resolve(taskCopy()).then(() => taskGenerate());
