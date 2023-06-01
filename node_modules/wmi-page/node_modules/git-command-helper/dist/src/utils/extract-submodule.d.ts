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
declare function extractSubmodule(gitmodulesPath: string): Submodule[];
export default extractSubmodule;
