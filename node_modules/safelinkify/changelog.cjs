const fs = require('fs');
const path = require('path');
const { EOL } = require('os');
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

/**
 * Extracts all version numbers in X.X.X format from a multiline string.
 * @param {string} str
 * @returns {string[]}
 */
function extractVersions(str) {
  const regex = /\bv?(\d+\.\d+\.\d+)\b/g;
  const matches = [];
  let match;
  while ((match = regex.exec(str)) !== null) {
    matches.push(match[1]);
  }
  return Array.from(new Set(matches));
}

// Git log format used:
// %h   - Abbreviated commit hash
// %ad  - Author date (formatted as "YYYY-MM-DD HH:MM:SS")
// %B   - Raw body (commit message)
// %d   - Ref names (branch, tag, etc.)
// Fields are separated by " !|! "
// Example: --pretty=format:"%h !|! %ad !|! %B %d" --date=format:"%Y-%m-%d %H:%M:%S"
// `--pretty=format:"%h !|! %ad !|! %B %d"`, `--date=format:"%Y-%m-%d %H:%M:%S"`
// Now includes author and committer name/email in the log format
(async () => {
  const log = await gitExec([
    'log',
    '--reverse',
    `--pretty=format:"=!=%h !|! %ad !|! %an !|! %cn !|! %s !|! %B !|! %d=!="`,
    `--date=format:"%Y-%m-%d %H:%M:%S"`
  ]);
  let markdown = `## CHANGELOG of ${pkg.name}\n\n`;
  const repo = await gitExec(['remote', 'get-url', 'origin']);
  const repoUrl = repo.trim().replace(/\.git$/, '');
  console.log(`Repository URL: ${repoUrl}`);

  const matches = [...log.matchAll(/=!=(.*?)(?:=!=|=!=,)/gs)];
  const results = matches.map((m) => m[1].trim());
  /** @type {Record<string, string[]>} */
  const versionsCommits = {};
  let currentVersionCommit = '';
  for (const str of results) {
    const splitx = str.split('!|!').map((s) => s.trim());
    // Now splitx: [hash, date, authorName, committerName, summary, message, ref]
    const o = {
      hash: splitx[0] ? splitx[0] : '',
      date: splitx[1] ? splitx[1].replace(/^"|"$/g, '') : '',
      authorName: splitx[2] ? splitx[2] : '',
      committerName: splitx[3] ? splitx[3] : '',
      summary: splitx[4] ? splitx[4] : '',
      message: splitx[5] ? splitx[5] : '',
      ref: splitx[6] ? splitx[6] : ''
    };
    let isBumped =
      /chore\(bump\)|chore: release/i.test(o.summary) || /release/i.test(o.summary) || /tag: v/i.test(o.summary);
    if (o.summary.trim().startsWith('v')) {
      isBumped = true; // Treat any commit starting with 'v' as a version bump
    }
    if (/^\d+\.\d+\.\d+$/.test(o.summary.trim())) {
      isBumped = true; // Treat commits with version format as version bumps
    }
    if (o.summary.trim().startsWith('fix:')) {
      isBumped = false; // Do not treat 'fix:' commits as version bumps
    }
    if (isBumped && !extractVersions(o.summary).length > 0) isBumped = false; // Ensure we have a version in the summary
    if (o.hash && o.date && o.message) {
      // Skip commits by dependabot[bot]
      if (o.authorName === 'dependabot[bot]') {
        continue;
      }
      // Skip commits by regex
      if (
        /^chore\(tarball\): update|merge pull request|merge branch|^migrate from|^update$|^update build from https?:\/\//i.test(
          o.message
        )
      ) {
        continue;
      }
      // Skip build summary messages like "Build Tue Dec 27 20:18:29 UTC 2022"
      if (/^Build\s+\w{3}\s+\w{3}\s+\d{1,2}\s+\d{2}:\d{2}:\d{2}\s+\w+\s+\d{4}$/i.test(o.summary)) {
        continue;
      }
      if (/initial commit/i.test(o.message)) {
        versionsCommits['0.0.0'] = [];
        currentVersionCommit = '0.0.0';
        continue;
      }
      if (isBumped) {
        console.log(`Detected version bump: ${o.summary}`);
        const v = extractVersions(o.message).join(', ');
        versionsCommits[v] = [];
        currentVersionCommit = v;
      } else {
        if (!currentVersionCommit) {
          throw new Error(`No current version commit set for message: ${o.message} (hash: ${o.hash})`);
        }
        // Remove all trailing quotes, spaces, and commas from message
        const cleanMsg = o.message.replace(/["'\s,]+$/g, '');
        // Overwrite previous entry if message is duplicated (keep latest hash)
        const commitsArr = versionsCommits[currentVersionCommit];
        // Find index of previous entry with the same message (message is now on the line after the metadata)
        const prevIdx = commitsArr.findIndex((entry) => {
          // Extract the message part (after the first empty line)
          const parts = entry.split(/\r?\n/);
          // Find the first non-empty line after the metadata line
          let msgLine = '';
          for (let i = 1; i < parts.length; i++) {
            if (parts[i].trim() !== '') {
              msgLine = parts[i].trim();
              break;
            }
          }
          return msgLine === cleanMsg;
        });
        // Add changelog entry without author/committer info
        let newEntry;
        if (cleanMsg.includes('\n')) {
          // Multiline message: put message on new line
          newEntry = `- [ _${o.date}_ ] [${o.hash}](<${repoUrl}/commit/${o.hash}>)` + EOL + EOL + `${cleanMsg}`;
        } else {
          // Single line message: put message on same line
          newEntry = `- [ _${o.date}_ ] [${o.hash}](<${repoUrl}/commit/${o.hash}>) ${cleanMsg}`;
        }
        if (prevIdx !== -1) {
          // Overwrite previous occurrence with the latest hash/date
          commitsArr[prevIdx] = newEntry;
        } else {
          commitsArr.push(newEntry);
        }
      }
    }
  }

  // Iterate versionsCommits in reverse order
  const versions = Object.keys(versionsCommits).sort((a, b) => {
    const aParts = a.split('.').map(Number);
    const bParts = b.split('.').map(Number);
    for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
      const aPart = aParts[i] || 0; // Default to 0 if part is missing
      const bPart = bParts[i] || 0; // Default to 0 if part is missing
      if (aPart !== bPart) {
        return bPart - aPart; // Sort in descending order
      }
    }
    return 0; // They are equal
  });
  for (const version of versions) {
    if (versionsCommits[version].length > 0) {
      markdown += `\n### ${version}\n\n`;
      markdown += versionsCommits[version]
        .map((str) => {
          const lines = str.trim().split(/\r?\n/);
          return [lines[0], ...lines.slice(1).map((line) => '    ' + line)].join(EOL);
        })
        .join(EOL);
    } else {
      markdown += `\n### ${version}\n\n`;
      markdown += `- No changes recorded for this version.\n`;
    }
  }

  fs.mkdirSync(path.join(__dirname, 'tmp'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'tmp/original.md'), log);
  fs.writeFileSync(path.join(__dirname, 'CHANGELOG.md'), markdown);
  console.log(`Original log written to tmp/original.md`);
  console.log(`Changelog updated successfully. You can find it at CHANGELOG.md`);
})();
