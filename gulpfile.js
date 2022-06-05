var Hexo = require('hexo');
var gulp = require('gulp');
var hexo = new Hexo(process.cwd(), {});



gulp.task('default', async () => {
  hexo.init().then(function () {
    hexo.load().then(function (err, val) {
      hexo.locals.invalidate();
      console.log(hexo.locals.get('posts'));
    });
  });
});
