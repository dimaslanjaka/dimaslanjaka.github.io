import gulp from 'gulp';
import config from '../../types/_config';
import './deploy/git';
import './deploy/firebase';

gulp.task('deploy', gulp.series('deploy-' + config.deploy.type));
