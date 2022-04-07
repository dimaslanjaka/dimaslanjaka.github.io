import chalk from 'chalk';
import { filter_external_links } from '../src/gulp/tasks/after-generate';
import { modifyPost } from '../src/gulp/tasks/article-copy';
import { renderer } from '../src/gulp/tasks/article-generate';
import { buildPost, parsePost, parsePostReturn } from '../src/markdown/transformPosts';
import { cwd, join, removeMultiSlashes, write } from '../src/node/filemanager';
import config, { tmp } from '../src/types/_config';

console.clear();
const logname = chalk.red('[test][copy]');
const targets = ['src-posts/Test/markdown-links.md', 'src-posts/The Legend Of Neverland/Quiz.md'].map((s) => join(cwd(), s));
const target = targets[0];
const public_target = target.replace('src-posts/', config.source_dir + '/_posts/');
const generated_target = target.replace('src-posts/', config.public_dir + '/').replace(/.md$/, '.html');
const parsed = parsePost(target, target, false);
parsed.fileTree.public = public_target;
parsed.fileTree.source = target;
write(tmp('tests', 'parsed.md'), buildPost(parsed)).then(console.log);
const original = buildPost(parsed);
const modify = modifyPost(parsed, false);
const modified = buildPost(modify);
const prepare = Object.assign(
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
  modify
);

// render test
renderer(prepare, {} /*{ min: { ignoreCustomComments: [/^!/, /^\s*#/] } }*/).then((rendered) => {
  const regex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/gm;
  Array.from(rendered.matchAll(regex)).forEach((m) => {
    const href = m[2];
    const filter = filter_external_links(href);
    if (!filter.internal) {
      rendered = rendered.replace(href, filter.href);
    }
  });

  write(generated_target, rendered).then(console.log);
});
