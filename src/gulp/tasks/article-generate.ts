import gulp from 'gulp';
import { toUnix } from 'upath';
import { join } from '../../node/filemanager';
import { post_source_dir } from '../../types/_config';

gulp.src(join(toUnix(post_source_dir), '**/**'));
