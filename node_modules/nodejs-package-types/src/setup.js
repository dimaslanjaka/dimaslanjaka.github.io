const fs = require('fs-extra');
const path = require('path');
const axios = require('axios');
const tcp = require('true-case-path');
const colors = require('ansi-colors');

function setup(
  options = {
    force: false,
    includes: []
  }
) {
  const defs = ['packer.js', 'postinstall.js', 'preinstall.js', '.github/workflows/build-release.yml'];
  let { includes } = options;
  if (!includes) includes = defs;
  includes.forEach((downloadPath) => {
    const packer = path.join(process.cwd(), downloadPath);
    if (!fs.existsSync(packer) || options.force) {
      download(
        'https://raw.githubusercontent.com/dimaslanjaka/nodejs-package-types/main/' + downloadPath,
        path.join(process.cwd(), downloadPath)
      );
    }
  });
}

function download(url, output) {
  if (!fs.existsSync(path.dirname(output))) fs.mkdirpSync(path.dirname(output));
  axios
    .get(url, { responseType: 'blob' })
    .then((response) => {
      fs.writeFile(output, response.data, (err) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log('The file (' + colors.greenBright(tcp.trueCasePathSync(output)) + ') has been saved!');
        }
      });
    })
    .catch((e) => console.log(url, e.message));
}

module.exports = setup;
