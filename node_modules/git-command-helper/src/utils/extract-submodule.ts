import fs from 'fs-extra';
import ini from 'ini';
import { dirname, join } from 'upath';
import git, { GitOpt } from '../git';

export interface Submodule extends GitOpt {
  [key: string]: any;
  github: git;
  path: string;
  url: string;
  branch: string;
  cwd: string;
}

/**
 * extract submodule to object
 * @param gitmodulesPath
 */
function extractSubmodule(gitmodulesPath: string) {
  const config = ini.parse(fs.readFileSync(gitmodulesPath).toString());
  return Object.keys(config).map((key) => {
    if (key.startsWith('submodule')) {
      const submodule = config[key] as Submodule;
      submodule.cwd = join(dirname(String(gitmodulesPath)), submodule.path);
      const github = new git(submodule);
      submodule.github = github;
      return submodule;
    }
  });
}

export default extractSubmodule;
