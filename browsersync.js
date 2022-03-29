// static browsersync
// listen to public dir of hexo generate
const browserSync = require('browser-sync').create();
/*const path = require('path');const YAML = require('yaml');
const fs = require('fs');
const config_file = path.join(__dirname, '_config.yml');
const file = fs.readFileSync(config_file, 'utf8');
const config = YAML.parse(file);
const files = [path.join(__dirname, config.public_dir, '/*')];*/
browserSync.init('./docs/**/**', {
  server: {
    baseDir: './docs',
    serveStaticOptions: {
      extensions: ['html'],
    },
  },
  port: 4000,
});
