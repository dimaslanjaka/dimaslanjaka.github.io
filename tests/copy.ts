import chalk from 'chalk';
import gulp from 'gulp';
import { renderer } from '../src/gulp/tasks/generate-posts';
import { parseAfterGen } from '../src/gulp/tasks/generate-after';
import { buildPost, parsePost } from '../src/markdown/transformPosts';
import { modifyPost } from '../src/markdown/transformPosts/modifyPost';
import { cwd, join, write } from '../src/node/filemanager';
import config, { tmp } from '../src/types/_config';

// copy assets to generated directory
gulp.series('generate:assets', 'generate:template')(null);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const logname = chalk.red('[test][copy]');
const targets = ['src-posts/Test/markdown-links.md', 'src-posts/The Legend Of Neverland/Quiz.md'].map((s) => join(cwd(), s));
const target = targets[1];
const public_target = target.replace('src-posts/', config.source_dir + '/_posts/');
const generated_target = target.replace('src-posts/', config.public_dir + '/').replace(/.md$/, '.html');
const parsed = parsePost(target, target, false);

parsed.fileTree.public = public_target;
parsed.fileTree.source = target;

const original = buildPost(parsed); // original markdown post
write(tmp('tests', 'parsed.md'), original).then(console.log);
const modify = modifyPost(parsed, null, false);
const modified = buildPost(modify); // modified markdown post
write(tmp('tests', 'modified.md'), modified).then(console.log);
const prepare = Object.assign(
  {
    /** post type */
    type: 'post',
    /** Full path (also cache key) */
    path: generated_target,
    /** Is Cached */
    cached: false,
  },
  modify
);

// render test
renderer(prepare, {}).then((rendered) => {
  write(generated_target, rendered).then(console.log);
  parseAfterGen([generated_target]);
});
