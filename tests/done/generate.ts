import { renderBodyMarkdown } from '../markdown/toHtml';
import { parsePost } from '../markdown/transformPosts';
import { existsSync, write } from '../node/filemanager';
import { tmp } from '../types/_config';
import Promise from 'bluebird';
import { modifyPost } from '../gulp/tasks/article-copy';

const targets = ['D:\\Repositories\\gh-pages\\source\\_posts\\The Legend Of Neverland\\Quiz.md'];
const target = targets[0];
if (!existsSync(target)) console.error(target, 'not found');
Promise.resolve(parsePost(target, target, false)).then((parsed) => {
  write(tmp('tests', 'generate-parsed.json'), parsed)
    .then((lf) => console.log('->', lf))
    .then(() => {
      Promise.resolve(modifyPost(parsed, false)).then((modified) => {
        write(tmp('tests', 'generate-modified.md'), modified.body).then((lf) => console.log('->'.repeat(2), lf));
        write(tmp('tests', 'generate-modified.json'), modified)
          .then((lf) => console.log('->'.repeat(2), lf))
          .then(() => {
            Promise.resolve(renderBodyMarkdown(modified)).then((rendered) => {
              write(tmp('tests', 'generate-rendered.json'), rendered).then((lf) => console.log('->'.repeat(3), lf));
            });
          });
      });
    });
});
//const render = renderBodyMarkdown(parsePost(target));
