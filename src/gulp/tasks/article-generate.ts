/* eslint-disable @typescript-eslint/no-unused-vars */
import gulp from 'gulp';
import { toUnix } from 'upath';
import { cwd, join, resolve, rmdirSync } from '../../node/filemanager';
import config, { root } from '../../types/_config';
import through from 'through2';
import vinyl from 'vinyl';
import 'js-prototypes';

const source_dir = toUnix(resolve(join(root, config.source_dir)));
const generated_dir = toUnix(resolve(join(root, config.public_dir)));
//rmdirSync(generated_dir);
export default function generate() {
  const src: string[] = [];
  const exclude = (arr: string[]) => {
    arr.map((s) => '!' + join(source_dir, '**', s)).forEach((s) => src.push(s));
  };
  const include = (arr: string[]) => {
    arr.map((s) => join(source_dir, '**', s)).forEach((s) => src.push(s));
  };

  const copyAssets = () => {
    include(['**/**']);
    // exclude markdown files
    exclude(['_data/**', '_drafts/**', '**/**.md']);
    return gulp
      .src(src)
      .pipe(
        through.obj(function (file: vinyl, enc, cb) {
          if (file.dirname.includes('/_posts')) file.dirname = file.dirname.replace('/_posts/', '/');
          //const pathfile = toUnix(file.path);
          //const contents = fn(String(file.contents), toUnix(file.path), file) || file.contents;
          //file.contents = !Buffer.isBuffer(contents) ? Buffer.from(contents) : contents;
          /*if (!file.basename.toString().match(/\.min\.[js,css,html]/gi)) {
          switch (file.extname) {
            case '.js':
              // minify js
              console.log(file.basename);
              break;

            default:
              break;
          }
        }*/
          cb(null, file);
        })
      )
      .pipe(gulp.dest(generated_dir));
  };

  const renderArticle = () => {
    // only markdown files
    src.length = 0;
    include(['**.md', '_posts/**/**.md']);
    exclude(['_data/**', '_drafts/**', '**/readme.md', '**/README.md']);
    console.log(src);
    return gulp.src(src).pipe(
      through.obj((file: vinyl, encoding, cb) => {
        const filepath = toUnix(file.path);
        file.extname = '.html';
        //filepath.replace(cwd(), ''),
        if (file.dirname.includes('/_posts')) file.dirname = file.dirname.replace('/_posts/', '/');
        if (file.dirname.match(/README/gi)) console.log(file.dirname);
        cb(null, file);
      })
    );
  };

  return copyAssets().once('end', () => renderArticle().pipe(gulp.dest(generated_dir)));
}
