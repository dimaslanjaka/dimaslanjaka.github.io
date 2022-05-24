import { copyFileSync, existsSync, mkdirSync, statSync } from 'fs';
import gulp from 'gulp';
import { dirname, join } from 'upath';
import color from '../../node/color';
import { globSrc } from '../../node/filemanager';
import config, {
  post_generated_dir,
  post_public_dir
} from '../../types/_config';
const global_exclude = ['**/_drafts/**', '**/_data/**'];
const logname = color.hex('#fcba03')('[render assets]');

/**
 * copy and process assets from {@link config.source_dir} to {@link config.public_dir}
 */
const renderAssets = async () => {
  console.log(
    logname + color.magentaBright('[assets]'),
    'copy ->',
    post_generated_dir
  );
  const exclude = config.exclude.map((ePattern) => ePattern.replace(/^!+/, ''));
  const ignore = ['**/*.md', '**/.git*', ...exclude, ...global_exclude];
  const glob = await globSrc('**/*.*', {
    cwd: post_public_dir,
    ignore: ignore,
    dot: true,
    stat: true
  }).then((s) => {
    if (config.verbose) {
      console.log(logname + '[total]', s.length);
      console.log(ignore);
    }
    return s;
  });
  for (let i = 0; i < glob.length; i++) {
    const file = glob[i];
    const src = join(post_public_dir, file);
    const stat = statSync(src);
    const dest = join(post_generated_dir, file.replace('_posts/', '/'));
    if (!existsSync(dirname(dest))) mkdirSync(dirname(dest));
    if (!stat.isDirectory() && existsSync(src)) {
      copyFileSync(src, dest);
      console.log(logname + color.greenBright(`[${i}]`), src, '->', dest);
    }
  }
};

gulp.task('generate:assets', renderAssets);
