import { existsSync } from 'fs-extra';
import { join } from 'upath';
import parsePost from '../src/markdown/transformPosts/parsePost';
import { globSrc, write } from '../src/node/filemanager';
import jdom from '../src/node/jsdom';
import { tmp } from '../src/types/_config';

const dir = join(__dirname, '../src-posts');
const match = '<div dir="ltr" style="text-align: left;" trbidi="on">';

globSrc('**/*.md', { cwd: dir })
  .map((item) => join(dir, item))
  .filter(existsSync)
  .map((item) => parsePost(item))
  .filter((item) => item && typeof item == 'object')
  .map((post) => Object.assign(post, post.metadata))
  .each(async (post) => {
    if (post.body.includes(match)) {
      const dom = new jdom();
      const doc = dom.parse(post.body);
      Array.from(doc.querySelectorAll('*[style]')).forEach((el) => {
        el.removeAttribute('style');
      });
      const getBody = dom.body();
      const save = await write(tmp('inline-style', post.title + '.html'), getBody.innerHTML);
      console.log(save);
    }
  });
