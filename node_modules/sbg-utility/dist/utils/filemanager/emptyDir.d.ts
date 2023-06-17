interface emptyDirOpt {
    ignore: (string | RegExp)[];
}
/**
 * empty dir with filters
 * @param dir
 * @param param1
 */
export declare function emptyDir(dir: string, { ignore }: emptyDirOpt): void;
export {};
