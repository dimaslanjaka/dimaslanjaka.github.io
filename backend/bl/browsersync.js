// static browsersync
// listen to public dir of hexo generate
const browserSync = require('browser-sync').create();
browserSync.init('./docs/**/**', {
  server: {
    baseDir: './docs',
    serveStaticOptions: {
      extensions: ['html'],
    },
  },
  port: 4000,
});
