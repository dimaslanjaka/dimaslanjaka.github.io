import gulp from 'gulp';
import htmlmin from 'html-minifier-terser';
import { TaskCallback } from 'undertaker';
import color from '../../node/color';
import { cwd, globSrc, join, read, write } from '../../node/filemanager';
import config from '../../types/_config';

const logname = color['Blue Violet']('[generate]') + color.Indigo('[minify]');
/**
 * Minify all generated html files
 * @see {@link https://github.com/terser/html-minifier-terser}
 * @param options
 * @param callback
 * @returns
 */
function MinifyHTML(options?: htmlmin.Options, callback?: CallableFunction & (() => any)) {
  const workdir = join(cwd(), config.public_dir);
  return globSrc('**/*.html', { cwd: workdir })
    .map((path) => join(workdir, path))
    .each((file) => {
      const content = read(file);
      const min = htmlmin.minify(String(content), options);
      min
        .then((minified) => {
          write(file, minified).then((file) => console.log(logname, file));
        })
        .catch(console.log);
    })
    .finally(callback);
}

gulp.task('generate:minify-html', (done?: TaskCallback) => {
  return MinifyHTML(
    {
      minifyCSS: true,
      minifyJS: true,
      html5: true,
      removeComments: true,
      removeEmptyAttributes: true,
      ignoreCustomComments: [/^!/, /^\s*#/],
      caseSensitive: true
    },
    done
  );
});

gulp.task('generate:minify', gulp.series('generate:minify-html'));
