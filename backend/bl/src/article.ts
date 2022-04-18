import { extract } from 'article-parser';
import { writeFileSync } from 'fs-extra';
import { cwd } from 'process';
import { join } from 'upath';
import md5 from 'md5';

export default function articleParser(url: string) {
  extract(url)
    .then((article) => {
      writeFileSync(join(cwd(), 'results', md5(url) + '.json'), JSON.stringify(article));
    })
    .catch((err) => {
      console.trace(err);
    });
}
