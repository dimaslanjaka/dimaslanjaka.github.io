import * as gulp from 'gulp';
import { post_public_dir, post_source_dir } from '../../../types/_config';
import { determineDirname } from '../../utils';

/**
 * copy src-post assets to source/_posts
 * @returns
 */
export const copyAssets = () => {
  const run = gulp.src(['**/*.*', `!**/*.md`], { cwd: post_source_dir });
  return determineDirname(run).pipe(gulp.dest(post_public_dir));
};
