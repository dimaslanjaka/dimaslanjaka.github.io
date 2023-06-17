/** git config */
/// <reference types="bluebird" />
import { git } from '..';
export declare class gitConfig {
    cwd: string;
    git: git;
    constructor(opt: {
        cwd: string;
    } | git);
    /**
     * custom spawn
     * @param args cli argument without `git config`
     */
    custom(...args: string[]): import("bluebird")<string>;
    ignoreCase(toBe: boolean | string): import("bluebird")<string>;
    /**
     * set end of line all files
     * @param type
     * @returns
     */
    eol(type: 'lf' | 'crlf'): import("bluebird")<string>;
    /**
     * The `git config core.autocrlf` command is used to change how Git handles line endings. It takes a single argument.
     * @param toBe true - Configure Git to ensure line endings in files you checkout are correct for Windows.
     * @returns
     */
    autocrlf(toBe: boolean | string): import("bluebird")<string>;
}
