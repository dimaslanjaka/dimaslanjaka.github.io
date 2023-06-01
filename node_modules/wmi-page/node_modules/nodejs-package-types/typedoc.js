const fs = require('fs');
const path = require('upath');
const pkgjson = require('./package.json');

// required: npm i upath
// required: npm i -D typedoc typedoc-plugin-missing-exports
// update   : curl -L https://github.com/dimaslanjaka/nodejs-package-types/raw/main/typedoc.js > typedoc.js
// repo     : https://github.com/dimaslanjaka/nodejs-package-types/blob/main/typedoc.js

/**
 * @type {import('typedoc').TypeDocOptions['entryPoints']}
 */
let entryPoints = fs.readdirSync(path.join(__dirname, 'src')).map((path) => './src/' + path);
const getFilesRecursively = (directory) => {
  const filesInDirectory = fs.readdirSync(directory);
  for (const file of filesInDirectory) {
    const absolute = path.join(directory, file);
    if (fs.statSync(absolute).isDirectory()) {
      getFilesRecursively(absolute);
    } else {
      entryPoints.push('.' + absolute.replace(path.toUnix(__dirname), ''));
      // unique
      entryPoints = entryPoints.filter(function (x, i, a) {
        return a.indexOf(x) === i;
      });
    }
  }
};

getFilesRecursively(path.join(__dirname, 'src'));
// filter ts only and remove duplicates
entryPoints = entryPoints.filter((path) => /.ts$/.test(path)).filter((v, i, a) => a.indexOf(v) === i);

// console.log(entryPoints);

/**
 * Build Readme
 */
const readme = [path.join(__dirname, 'readme.md'), path.join(__dirname, 'README.md')].filter((str) =>
  fs.existsSync(str)
)[0];
if (typeof readme === 'string') {
  if (fs.existsSync(readme)) {
    let content = fs.readFileSync(readme, 'utf-8');

    // add changelog if exist
    const changelog = [path.join(__dirname, 'changelog.md'), path.join(__dirname, 'CHANGELOG.md')].filter((str) =>
      fs.existsSync(str)
    )[0];
    if (typeof changelog === 'string') {
      content += '\n\n' + fs.readFileSync(changelog, 'utf-8');
    }

    const tmp = path.join(__dirname, 'tmp');
    if (!fs.existsSync(tmp)) fs.mkdirSync(tmp);
    fs.writeFileSync(path.join(tmp, 'readme.md'), content);
  }
}

/**
 * TypeDoc options (see TypeDoc docs http://typedoc.org/api/interfaces/typedocoptionmap.html)
 * @type {import('typedoc').TypeDocOptions}
 */
const defaultOptions = {
  name: pkgjson.projectName || 'Static Blog Generator Gulp',
  //entryPoints: pkgjson.main.replace('dist', 'src'),
  entryPoints,
  // Output options (see TypeDoc docs http://typedoc.org/api/interfaces/typedocoptionmap.html)
  // NOTE: the out option and the json option cannot share the same directory
  out: './docs/' + pkgjson.name,
  json: './docs/' + pkgjson.name + '/info.json',
  entryPointStrategy: 'expand',
  gaID: 'UA-106238155-1',
  commentStyle: 'all',
  hideGenerator: true,
  searchInComments: true,
  cleanOutputDir: true,
  navigationLinks: {
    Homepage: 'https://www.webmanajemen.com',
    GitHub: 'https://github.com/dimaslanjaka'
  },
  inlineTags: ['@link'],
  readme: './tmp/readme.md',
  tsconfig: fs.existsSync(path.join(__dirname, 'tsconfig.build.json'))
    ? './tsconfig.build.json'
    : fs.existsSync(path.join(__dirname, 'tsconfig-build.json'))
    ? './tsconfig-build.json'
    : './tsconfig.json',
  //includes: ['src'],
  exclude: ['*.test.ts', '*.test.js'],
  htmlLang: 'en',
  //gitRemote: 'https://github.com/dimaslanjaka/static-blog-generator-hexo.git',
  gitRevision: 'master',
  githubPages: true,
  //theme: 'hierarchy',
  plugin: ['typedoc-plugin-missing-exports']
  //ignoreCompilerErrors: true,
  //logger: 'none'
  //version: true,
  //includeVersion: true
};

const generatedOptionFile = path.join(__dirname, 'tmp/typedocs/options.json');
let typedocOptions = defaultOptions;
if (fs.existsSync(generatedOptionFile)) {
  typedocOptions = JSON.parse(_readfile(generatedOptionFile, 'utf-8'));
  typedocOptions = Object.assign(defaultOptions, typedocOptions);
}

const cjson = path.join(__dirname, 'typedoc.json');
const scriptName = path.basename(__filename);

// run json creation when filename endswith -config.js
if (scriptName.endsWith('-config.js')) {
  typedocOptions['$schema'] = 'https://typedoc.org/schema.json';
  fs.writeFileSync(cjson, JSON.stringify(typedocOptions, null, 2));
} else {
  if (fs.existsSync(cjson)) fs.rm(cjson);
}

/**
 * read file with validation
 * @param {string} str
 * @param {import('fs').EncodingOption} encoding
 * @returns
 */
function _readfile(str, encoding = 'utf-8') {
  if (fs.existsSync(str)) {
    if (fs.statSync(str).isFile()) {
      return fs.readFileSync(str, encoding);
    } else {
      throw str + ' is directory';
    }
  } else {
    throw str + ' not found';
  }
}

/**
 * write to file recursively
 * @param {string} dest
 * @param {any} data
 */
function _writefile(dest, data) {
  if (!fs.existsSync(path.dirname(dest))) fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (fs.existsSync(dest)) {
    if (fs.statSync(dest).isDirectory()) throw dest + ' is directory';
  }
  fs.writeFileSync(dest, data);
}

module.exports = typedocOptions;
