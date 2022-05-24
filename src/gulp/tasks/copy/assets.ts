import * as gulp from 'gulp';
import color from '../../../node/color';
import { post_public_dir, post_source_dir } from '../../../types/_config';
import { determineDirname } from '../../utils';

/**
 * copy src-post assets to source/_posts
 * @returns
 */
export const copyAssets = () => {
  console.log(
    `${color.magentaBright('[copy][assets]')} cwd=${color.Mahogany(
      post_source_dir
    )} dest=${color['Granny Smith Apple'](post_public_dir)}`
  );
  const run = gulp.src(['**/*.*', `!**/*.md`], { cwd: post_source_dir });
  return determineDirname(run).pipe(gulp.dest(post_public_dir));
};
/**
 * @see {@link copyAssets}
 */
export const copy_assets = copyAssets;
