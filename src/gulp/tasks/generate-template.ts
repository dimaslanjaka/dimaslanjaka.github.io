import gulp from 'gulp';
import sass from 'node-sass';
import through2 from 'through2';
import { join } from 'upath';
import color from '../../node/color';
import { post_generated_dir, theme_dir } from '../../types/_config';

const logname = color.hex('#fcba03')('[render template]');

const renderTemplate = () => {
  const src = join(theme_dir, 'source/**/**');
  console.log(
    logname + color.magentaBright('[template]'),
    'copy',
    src,
    '->',
    post_generated_dir
  );
  return gulp
    .src([src, '!**/.git*'], { cwd: process.cwd() })
    .pipe(
      through2.obj((file, enc, next) => {
        if (file.isNull()) {
          return next(null, file);
        }
        const path = file.path;
        const ext = file.extname;

        if (ext == '.scss') {
          file.extname = '.css';
          const result = sass.renderSync({
            data: String(file.contents)
          });
          file.contents = result.css;
          console.log('[sass]', 'compiled', path);
        }
        next(null, file);
      })
    )
    .pipe(gulp.dest(post_generated_dir));
  //.on('end', () => console.log(logname + chalk.magentaBright('[template]'), chalk.green('finish')));
};

gulp.task('generate:template', renderTemplate);
