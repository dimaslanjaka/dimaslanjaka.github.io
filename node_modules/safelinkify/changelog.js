const { writeFileSync } = require('fs');
const { EOL } = require('os');
const { join } = require('path');
const pkg = require('./package.json');
const spawn = require('child_process').spawn;

/**
 * git
 * @param {string[]} command
 * @returns {Promise<string>}
 */
const gitExec = (command) =>
  new Promise((resolve, reject) => {
    const thread = spawn('git', command, { stdio: ['inherit', 'pipe', 'pipe'] });
    const stdOut = [];
    const stdErr = [];

    thread.stdout.on('data', (data) => {
      stdOut.push(data.toString('utf8'));
    });

    thread.stderr.on('data', (data) => {
      stdErr.push(data.toString('utf8'));
    });

    thread.on('close', () => {
      if (stdErr.length) {
        reject(stdErr.join(''));
        return;
      }
      resolve(stdOut.join());
    });
  });

let markdown = `
## CHANGELOG of safelinkify

**1.0.0**
- initial commit

**1.0.1**
- fix aes

**1.0.2**
- fix object encyrption result

**1.0.3**
- add password aes option

**1.0.5 - 1.0.6**
- remove useless dependencies
- detach private script
- add object redirect url to result query parser

**1.0.7**
- fix query string resolver

**1.0.8 - 1.0.9**
- fix process on nodejs

**1.1.0**
- fix main file js

**1.1.1**
- fix process on nodejs read from file

**1.1.2**
- fix same link when included as other element (non-hyperlink)

**1.1.3**
- Compile to ES5

**1.1.4**
- \`parse\` now async
- \`parse\` always return string
- add more docs for easy development
- add \`tsconfig.build.json\` excluding test files
`;

// git log reference https://www.edureka.co/blog/git-format-commit-history/
// git log date format reference https://stackoverflow.com/questions/7853332/how-to-change-git-log-date-formats
// custom --pretty=format:"%h %ad | %s %d [%an]" --date=short v1.1.4...v1.1.8
// default --pretty=oneline v1.1.4...v1.1.8
const args = [
  'log',
  `--pretty=format:"%h !|! %ad !|! %s %d"`,
  `--date=format:"%Y-%m-%d %H:%M:%S"`,
  'v1.1.4...v' + pkg.version
];
gitExec(args)
  .then(function (commits) {
    commits
      .split(/\r?\n/gm)
      .slice()
      .reverse()
      .forEach((str, index, all) => {
        const splitx = str.split('!|!').map((str) => str.trim());
        const o = {
          hash: splitx[0],
          date: splitx[1],
          message: splitx[2]
        };
        if (o.message.includes('tag: v')) {
          markdown += `\n**${o.message.replace(/\(.*\),?/, '').trim()}**\n` + EOL;
        } else {
          markdown +=
            `- [ _${o.date}_ ] [${o.hash}](https://github.com/dimaslanjaka/safelink/commit/${
              o.hash
            }) ${o.message.replace(/,$/, '')}` + EOL;
        }
        if (index === all.length - 1) {
          writeFileSync(join(__dirname, 'CHANGELOG.md'), markdown);
        }
      });
  })
  .catch((e) => {
    console.error(e);
    console.log(args.join(' '));
  });
