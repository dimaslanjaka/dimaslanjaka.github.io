import gulp from 'gulp';
import config from '../../types/_config';
import './deploy/firebase';
import './deploy/git';

gulp.task('deploy', gulp.series('deploy-' + config.deploy.type));
