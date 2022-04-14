import './generate-sitemap';
import './generate-after';
import './generate-archives';
import './generate-feed';
import './generate-posts';
import './remove-inline-style';
import './minify';
import gulp from 'gulp';

gulp.task('generate', gulp.series('generate:assets', 'generate:template', 'generate:posts', 'generate:archive', 'generate:sitemap', 'generate:after'));
