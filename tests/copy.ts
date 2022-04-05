import { expect } from 'chai';
import { modifyPost } from '../src/gulp/tasks/article-copy';
import { buildPost, parsePost, parsePostReturn } from '../src/markdown/transformPosts';
import { cwd, existsSync, write } from '../src/node/filemanager';
import { tmp } from '../src/types/_config';
import 'mocha';
import { toUnix } from 'upath';
import { join } from 'path';
import scheduler from '../src/node/scheduler';
import chalk from 'chalk';
import { cleanWhiteSpace } from '../src/node/utils';
import { md5 } from '../src/node/md5-file';
scheduler.verbose = false;

console.clear();
const logname = chalk.red('[test]');

describe('copy', () => {
  const targets = ['src-posts\\The Legend Of Neverland\\Quiz.md'].map(toUnix).map((s) => join(cwd(), s));
  const target = targets[0];
  let parsed: parsePostReturn;
  it('target exists', (done) => {
    expect(existsSync(target)).to.be.true;
    done();
  });

  it('parse target', async () => {
    parsed = parsePost(target, target, false);
    const path_2 = await write(tmp('tests', 'parsed.md'), buildPost(parsed));
    expect(parsed).to.have.property('metadata');
    expect(path_2).to.be.a('string');
    console.log(logname + '[parsed]', path_2);
  });

  it('modify target', async () => {
    const original = buildPost(parsed);
    const modify = modifyPost(parsed, false);
    const modified = buildPost(modify);
    expect(modify).to.have.property('metadata');
    const dumpBody = await write(tmp('tests', 'modify.md'), modified);
    console.log(logname + '[modified]', dumpBody);
    expect(md5(cleanWhiteSpace(original))).to.not.equal(md5(cleanWhiteSpace(modified)));
    expect(modified).to.not.match(/<!--\s+(script|css|now|include)\s/gm);
  });

  /*console.log('->', lf);
    const lf_1 = await write(tmp('tests', 'parse-parsed.json'), parsed);
    console.log('->', lf_1);

    return done();*/
});
