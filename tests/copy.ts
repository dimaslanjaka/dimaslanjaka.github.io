import { expect } from 'chai';
import { modifyPost } from '../src/gulp/tasks/article-copy';
import { buildPost, parsePost, parsePostReturn } from '../src/markdown/transformPosts';
import { cwd, existsSync, removeMultiSlashes, write } from '../src/node/filemanager';
import config, { tmp } from '../src/types/_config';
import 'mocha';
import { toUnix } from 'upath';
import { join } from 'path';
import scheduler from '../src/node/scheduler';
import chalk from 'chalk';
import { cleanWhiteSpace } from '../src/node/utils';
import { md5 } from '../src/node/md5-file';
import { renderer } from '../src/gulp/tasks/article-generate';
scheduler.verbose = false;

console.clear();
const logname = chalk.red('[test][copy]');
const targets = ['src-posts/The Legend Of Neverland/Quiz.md'].map((s) => join(cwd(), s));
const target = targets[0];
const public_target = target.replace('src-posts/', config.source_dir + '/_posts/');
const generated_target = target.replace('src-posts/', config.public_dir + '/').replace(/.md$/, '.html');
let parsed: parsePostReturn;

describe('copy', () => {
  it('1. target exists', (done) => {
    expect(existsSync(target)).to.be.true;
    done();
  });

  it('2. parse target', async () => {
    parsed = parsePost(target, target, false);
    parsed.fileTree.public = public_target;
    parsed.fileTree.source = target;
    const path_2 = await write(tmp('tests', 'parsed.md'), buildPost(parsed));
    console.log(logname + '[parsed]', path_2);
    ['body', 'metadata'].forEach((k) => expect(parsed).to.have.property(k));
    ['title', 'date', 'updated'].forEach((k) => expect(parsed.metadata).to.have.property(k));
    expect(path_2).to.be.a('string');
  });

  it('3. modify target', async () => {
    const original = buildPost(parsed);
    const modify = modifyPost(parsed, false);
    const modified = buildPost(modify);
    expect(modify).to.have.property('metadata');
    const dumpBody = await write(tmp('tests', 'modify.md'), modified);
    console.log(logname + '[modified]', dumpBody);
    expect(md5(cleanWhiteSpace(original))).to.not.equal(md5(cleanWhiteSpace(modified)));
    expect(modified).to.not.match(/<!--\s+(script|css|now|include)\s/gm);
  });

  it('generate', (done) => {
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
    renderer(parsed).then((rendered) => {
      expect(rendered).to.be.a('string');
      write(tmp('tests', 'rendered.html'), rendered).then(console.log);
      done();
    });
  }).timeout(60000);
});
