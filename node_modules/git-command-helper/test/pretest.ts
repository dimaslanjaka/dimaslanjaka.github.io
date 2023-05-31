import path from 'path';
import gitHelper, { GitOpt } from '../src';
import clone from './clone';
import { TestConfig } from './config';

if (!process.env.ACCESS_TOKEN) {
  process.env.ACCESS_TOKEN = 'token_' + Math.random();
}

(async function () {
  const init = async (cfg: GitOpt) => {
    const git = new gitHelper(cfg.cwd);
    await git.setremote(cfg.remote);
    if (cfg.branch) await git.setbranch(cfg.branch);
    if (cfg.user) await git.setuser(cfg.user);
    if (cfg.email) await git.setemail(cfg.email);
    await git.fetch(['--all'], { stdio: 'pipe' }).then(console.log);
  };

  // clone test repo
  await clone(TestConfig);
  await init(TestConfig);

  // clone my github pages
  const obj = {
    cwd: path.join(__dirname, '../tmp', '.deploy_git'),
    branch: 'master',
    remote: `https://${process.env.ACCESS_TOKEN}@github.com/dimaslanjaka/dimaslanjaka.github.io.git`,
    user: 'dimaslanjaka',
    email: 'dimaslanjaka@gmail.com',
    token: process.env.ACCESS_TOKEN
  };
  await clone(obj);
  await init(obj);
})();
