import gulp from 'gulp';
import { join, resolve, toUnix } from 'upath';
import { existsSync, write } from '../../node/filemanager';
import config, { root } from '../../types/_config';
import './generate-after';
import './generate-archives';
import './generate-feed';
import './generate-posts';
import './generate-sitemap';
import './import';
import './minify';

const generated_dir = toUnix(resolve(join(root, config.public_dir)));
// .nojekyll
const nojekyll = join(generated_dir, '.nojekyll');
if (!existsSync(nojekyll)) write(nojekyll, '');

gulp.task(
  'generate',
  gulp.series(
    'generate:assets',
    'generate:template',
    'generate:posts',
    'generate:archive',
    'generate:sitemap',
    'generate:after'
  )
);
