/** Style compiler */

import { writeFileSync } from 'fs';
import { join } from 'path';
import sass from 'sass';

const paths = [
  {
    source: join(__dirname, 'style.scss'),
    output: join(__dirname, 'style.css')
  },
  {
    source: join(__dirname, 'readme.scss'),
    output: join(__dirname, 'readme.css')
  }
];

paths.forEach(compileScss);

function compileScss({ source, output }: typeof paths[number]) {
  const result = sass.compile(source);
  writeFileSync(output, result.css);
}
