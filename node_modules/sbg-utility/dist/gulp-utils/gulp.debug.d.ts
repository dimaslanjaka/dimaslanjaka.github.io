/// <reference types="node" />
/// <reference types="hexo/dist/hexo/router" />
export declare function gulpDebug(filename?: string): import("stream").Transform;
/**
 * log all files
 * @returns
 */
export declare function gulpLog(logname?: string): import("stream").Transform;
export default gulpDebug;
