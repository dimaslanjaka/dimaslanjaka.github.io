export function hookChildProcess(cp: any, parsed: any): void;
export function verifyENOENT(status: any, parsed: any): Error & {
    code: string;
    errno: string;
    syscall: string;
    path: any;
    spawnargs: any;
};
export function verifyENOENTSync(status: any, parsed: any): Error & {
    code: string;
    errno: string;
    syscall: string;
    path: any;
    spawnargs: any;
};
export function notFoundError(original: any, syscall: any): Error & {
    code: string;
    errno: string;
    syscall: string;
    path: any;
    spawnargs: any;
};
//# sourceMappingURL=enoent.d.ts.map