const gulp = require('gulp');
const { publish } = require('./typedoc-runner');

const docs = async function () {
  await publish();
};

gulp.task('docs', docs);
