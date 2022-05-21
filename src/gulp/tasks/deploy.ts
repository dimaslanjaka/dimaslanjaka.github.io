import gulp from 'gulp';
import config from '../../types/_config';
import './deploy/firebase';
import { deployerGit } from './deploy/git';

gulp.task('deploy-git', deployerGit);
gulp.task('deploy', gulp.series('deploy-' + config.deploy.type));
