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
    const path_2 = await write(tmp('tests', 'parse-parsed.md'), buildPost(parsed));
    expect(parsed).to.have.property('metadata');
    expect(path_2).to.be.a('string');
    console.log(logname + '[parsed]', path_2);
  });

  it('modify target', async () => {
    const modify = modifyPost(parsed, false);
    expect(modify).to.have.property('metadata');
    /** body compare */
    const body = {
      /** original */
      o: parsed.body.trim(),
      /** modified */
      m: modify.body.trim(),
    };
    const dumpBody = await write(tmp('tests', 'modify.md'), modify.body);
    console.log(logname, dumpBody);
    expect(md5(cleanWhiteSpace(body.m))).to.not.equal(md5(cleanWhiteSpace(body.o)));
  });

  /*console.log('->', lf);
    const lf_1 = await write(tmp('tests', 'parse-parsed.json'), parsed);
    console.log('->', lf_1);

    return done();*/
});
