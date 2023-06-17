/**
 * search yarn root workspace folder
 * @param ctx option with property `base_dir`
 */
declare function findYarnRootWorkspace(ctx: {
    base_dir: string;
}): string | null;
export { findYarnRootWorkspace };
export default findYarnRootWorkspace;
