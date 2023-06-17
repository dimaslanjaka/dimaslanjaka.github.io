import debuglib from 'debug';
/**
 * debug helper
 * @param name
 * @returns
 */
export declare function debug(name: string): debuglib.Debugger;
export default debug;
/**
 * debug with default name `sbg`
 * @returns
 */
export declare function sbgDebug(): debuglib.Debugger;
