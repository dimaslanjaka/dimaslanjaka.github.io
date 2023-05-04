import git from './git';
/**
 * extract submodule to object
 * @param gitmodulesPath
 */
declare function extractSubmodule(gitmodulesPath: string): Submodule[];
export interface Submodule {
  root: string;
  path: string;
  url: string;
  branch?: string;
  github?: git;
}
export default extractSubmodule;
