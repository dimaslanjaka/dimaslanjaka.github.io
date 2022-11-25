/// <reference types="node" />
import fs from "fs";
import git from "./git";
/**
 * extract submodule to object
 * @param path
 */
declare function extractSubmodule(path: fs.PathOrFileDescriptor): Submodule[];
export interface Submodule {
    root: string;
    path: string;
    url: string;
    branch?: string;
    github?: git;
}
export default extractSubmodule;
