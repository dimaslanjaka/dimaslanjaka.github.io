/**
 * check if can be pushed
 * @param originName origin name
 */
export declare function dryRun(cwd: string): Promise<boolean>;
export declare const isCanPush: {
  dryRun: typeof dryRun;
};
