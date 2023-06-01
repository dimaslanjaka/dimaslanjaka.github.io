import spawn from '../cross-spawn/src';

// git log <commit hash 1>..<commit hash 2> --oneline | cut -d " " -f 1
// git rev-list --ancestry-path 7b4a07a..ecf5891
// https://github.com/dimaslanjaka/git-command-helper/compare/486f19e..ad3e9ee
// git rev-list --ancestry-path 486f19e..ad3e9ee
// git log 486f19e..ad3e9ee --oneline | cut -d " " -f 1
// git log monorepo --since="<date 486f19e>" --until="<date ad3e9ee>" --oneline

spawn
  .spawnAsync('git', ['log', '486f19e..ad3e9ee', '--oneline'], {
    cwd: __dirname
  })
  .then((res) => {
    const output = res.output.split(/\r?\n/);
    /** parse output string into array of objects */
    const parse = output
      .map((str) => {
        const exec = Array.from(/^([a-f0-9]{7})\s(.*)/.exec(str) || []);
        if (exec.length > 1) {
          const commitMsg = exec[2];
          // start filtering
          const rgs = [/^Update build from https:\/\//, /^Merge branch\s+'/, /^chore\(tarball\)/];
          if (rgs.some((rg) => rg.test(commitMsg))) return;
          return { [exec[1]]: commitMsg };
        }
      })
      .filter((o) => typeof o === 'object') as { [key: string]: string }[];
    /** convert array of objects into single object */
    const obj = parse.reduce((prev, curr) => ({ ...prev, ...curr }), {});
    console.log(obj);
    return obj;
  });
