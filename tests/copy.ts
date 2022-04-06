import chalk from 'chalk';
import { modifyPost } from '../src/gulp/tasks/article-copy';
import { renderer } from '../src/gulp/tasks/article-generate';
import { buildPost, parsePost, parsePostReturn } from '../src/markdown/transformPosts';
import { cwd, join, removeMultiSlashes, write } from '../src/node/filemanager';
import config, { tmp } from '../src/types/_config';

console.clear();
const logname = chalk.red('[test][copy]');
const targets = ['src-posts/The Legend Of Neverland/Quiz.md'].map((s) => join(cwd(), s));
const target = targets[0];
const public_target = target.replace('src-posts/', config.source_dir + '/_posts/');
const generated_target = target.replace('src-posts/', config.public_dir + '/').replace(/.md$/, '.html');
let parsed = parsePost(target, target, false);
parsed.fileTree.public = public_target;
parsed.fileTree.source = target;
write(tmp('tests', 'parsed.md'), buildPost(parsed)).then(console.log);
const original = buildPost(parsed);
const modify = modifyPost(parsed, false);
const modified = buildPost(modify);
parsed = Object.assign(
  {
    /**
     * post type
     */
    type: 'post',
    /** Full path (also cache key) */
    path: generated_target,
    /** Permalink path */
    permalink: removeMultiSlashes(target.replaceArr([cwd(), '_posts/'], '/')).replace(/.md$/, '.html'),
    /** Is Cached */
    cached: false,
  },
  parsed
);
// render test
renderer(parsed, {} /*{ min: { ignoreCustomComments: [/^!/, /^\s*#/] } }*/).then((rendered) => {
  write(generated_target, rendered).then(console.log);
});
