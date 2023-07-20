/**
 * @example
 * const console = Logger
 * Logger.log('hello world'); // should be written in <temp folder>/logs/[trace-name].log
 */
export declare class Logger {
    static log(...args: any[]): void;
    static info(...args: any[]): void;
    static error(...args: any[]): void;
    private static tracer;
}
export default Logger;
