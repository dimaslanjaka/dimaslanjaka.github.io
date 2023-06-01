#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { Minimatch } = require('minimatch');

const args = require('minimist')(process.argv.slice(2));
const cwd = process.cwd();
const packagejson = path.join(cwd, 'package.json');
const verbose = args['v'] || args['verbose'];
const usingYarn = args['yarn'];

(async function npmRunSeries() {
  const { execa } = await import('execa');
  if (fs.existsSync(packagejson)) {
    /**
     * @type {import('../package.json')}
     */
    const parse = JSON.parse(fs.readFileSync(packagejson, 'utf-8'));

    if (parse !== null && typeof parse === 'object') {
      if ('scripts' in parse) {
        const patterns = args._;
        const scripts = parse.scripts;
        const scriptNames = Object.keys(scripts);
        for (let i = 0; i < patterns.length; i++) {
          const pattern = patterns[i];
          const matcher = new Minimatch(pattern, { nonegate: true });
          for (let ii = 0; ii < scriptNames.length; ii++) {
            const scriptName = scriptNames[ii];
            const match = matcher.match(scriptName);
            if (verbose) console.log({ pattern, scriptName, match });
            if (match === true) {
              await execa(usingYarn ? 'yarn' : 'npm', ['run', scriptName], {
                cwd,
                stdio: 'inherit'
              });
            }
          }
        }
      }
    }
  }
})();
