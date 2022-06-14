//hash=$(git rev-parse --short HEAD)
//npm version "0.0.1-$hash"

const { gitDescribe } = require('git-describe');
const { write } = require('static-blog-generator/dist/src/node/filemanager');
const { join } = require('upath');
const pkg = require('../package.json');

gitDescribe(process.cwd())
  .then((info) => {
    //console.dir(info)
    //console.log(info.hash);
    const version = `${info.semver.version}-${info.distance}-${info.hash}`;
    pkg.version = version;
    write(
      join(__dirname, '../package.json'),
      JSON.stringify(pkg, null, 2) + '\n'
    );
  })
  .catch((err) => console.error(err));
