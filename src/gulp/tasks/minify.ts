import htmlmin from 'html-minifier-terser';
import { globSrc, join, read, write } from '../../node/filemanager';
import config, { root } from '../../types/_config';
import gulp from 'gulp';
import { TaskCallback } from 'undertaker';

/**
 * Minify all generated html files
 * @see {@link https://github.com/terser/html-minifier-terser}
 * @param options
 * @param callback
 * @returns
 */
function MinifyHTML(options?: htmlmin.Options, callback?: CallableFunction & (() => any)) {
  return globSrc('**/*.html', { cwd: join(root, config.public_dir) })
    .each((file) => {
      const content = read(file);
      const min = htmlmin.minify(String(content), options);
      min
        .then((minified) => {
          write(file, minified);
        })
        .catch(console.log);
    })
    .finally(callback);
}

gulp.task('generate:minify-html', (done?: TaskCallback) => {
  MinifyHTML(
    {
      minifyCSS: true,
      minifyJS: true,
      html5: true,
      removeComments: true,
      removeEmptyAttributes: true,
      ignoreCustomComments: [/^!/, /^\s*#/],
      caseSensitive: true,
    },
    done
  );
});

gulp.task('generate:minify', gulp.series('generate:minify-html'));
