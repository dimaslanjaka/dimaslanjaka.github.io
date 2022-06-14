//hash=$(git rev-parse --short HEAD)
//npm version "0.0.1-$hash"

const { gitDescribe } = require('git-describe');
const { spawn } = require('hexo-util');
const { write } = require('static-blog-generator/dist/src/node/filemanager');
const { join } = require('path');
const pkg = require('../package.json');

gitDescribe(process.cwd())
  .then((info) => {
    //console.dir(info)
    //console.log(info.hash);
    const version = `${info.semver.version}-${info.distance}-${info.hash}`;
    pkg.version = version;
    return write(
      join(__dirname, '../package.json'),
      JSON.stringify(pkg, null, 2) + '\n'
    ).then(() => {
      return spawn('npm', ['install'], { cwd: join(__dirname, '..') }).then(
        () => {
          return spawn('git', ['add', 'package.json'], {
            cwd: join(__dirname, '..')
          }).then(() => {
            return spawn('git', ['add', 'package-lock.json'], {
              cwd: join(__dirname, '..')
            }).then(() => {
              return spawn('git', ['commit', '-m', 'update ' + info.hash], {
                cwd: join(__dirname, '..')
              });
            });
          });
        }
      );
    });
  })
  .catch((err) => console.error(err));
