import path from 'path';
import gitCmdHelper from '../src/git.es';

const git = new gitCmdHelper.git({
  cwd: path.join(__dirname, '.deploy_git'),
  url: 'https://github.com/dimaslanjaka/dimaslanjaka.github.io',
  ref: 'master'
});
console.log(git.submodules);
