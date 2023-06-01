/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const depcheck = require('depcheck');
const fs = require('fs-extra');
const path = require('upath');

// Check dependencies using depcheck
// required : npm i -D depcheck
// repo     : https://github.com/dimaslanjaka/hexo-seo/blob/master/unused.js
// raw      : https://raw.githubusercontent.com/dimaslanjaka/hexo-seo/master/unused.js
// update   : curl -L https://raw.githubusercontent.com/dimaslanjaka/hexo-seo/master/unused.js > unused.js

/** @type {depcheck.Config} */
const options = {
  ignoreBinPackage: false, // ignore the packages with bin entry
  skipMissing: false, // skip calculation of missing dependencies
  ignorePatterns: [
    // files matching these patterns will be ignored
    'sandbox',
    'dist',
    'bower_components',
    'node_modules',
    'docs',
    'exclude',
    'test'
  ],
  ignoreMatches: [
    // ignore dependencies that matches these globs
    'grunt-*',
    'hexo-*',
    '@typescript-eslint/*',
    'eslint-*',
    'depcheck',
    'npm-run-all',
    'nodemon',
    'lerna',
    'typescript'
  ],
  parsers: {
    // the target parsers
    '**/*.ts': depcheck.parser.typescript,
    '**/*.js': depcheck.parser.es6,
    '**/*.jsx': depcheck.parser.jsx
  },
  detectors: [
    // the target detectors
    depcheck.detector.requireCallExpression,
    depcheck.detector.importDeclaration
  ],
  specials: [
    // the target special parsers
    depcheck.special.eslint,
    depcheck.special.webpack
  ],
  package: {
    // may specify dependencies instead of parsing package.json
    dependencies: {
      lodash: '^4.17.15'
    },
    devDependencies: {
      eslint: '^6.6.0'
    },
    peerDependencies: {},
    optionalDependencies: {}
  }
};

depcheck(__dirname, options).then((unused) => {
  let content = '';
  content += `install missing dependencies ${tripleTicks('bash')}${Object.keys(
    unused.missing
  ).join(' ')}${tripleTicks()}\n`;
  content += '```json\n' + JSON.stringify(unused, null, 2) + '\n```\n\n';
  fs.writeFileSync(path.join(__dirname, 'unused.md'), content);
});

function tripleTicks(lang = '') {
  return '\n```' + lang + '\n';
}
