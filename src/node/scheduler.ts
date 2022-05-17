/** SCHEDULER JOB **/
/*** Postpone executing functions ***/

import chalk from 'chalk';

const logger = console;
const logname = chalk.hex('#f542e0')('[scheduler]');

const fns: { [key: string]: (data?: string) => void }[] = [];
let triggered: boolean;
/**
 * Bind functions to exit handler
 * @param key
 * @param fn
 */
export function bindProcessExit(key: string, fn: () => void): void {
  fns[key] = fn;
  // trigger once
  if (!triggered) {
    triggered = true;
    triggerProcess();
  }
}

/**
 * Handler function on process exit
 * @param options
 * @param exitCode
 */
function exitHandler(options: { cleanup: any; exit: any }, exitCode: any) {
  Object.keys(fns).forEach((key) => {
    if (scheduler.verbose) logger.log(logname, `executing function key: ${key}`);
    fns[key]();
  });
  if (options.cleanup && scheduler.verbose) logger.log(logname, `clean exit(${exitCode})`);
  if (options.exit) process.exit();
}

/**
 * Trigger Process Bindings
 */
function triggerProcess() {
  //do something when app is closing
  process.on('exit', exitHandler.bind(null, { cleanup: true }));

  //catches ctrl+c event
  process.on('SIGINT', exitHandler.bind(null, { exit: true }));

  // catches "kill pid" (for example: nodemon restart)
  process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
  process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

  //catches uncaught exceptions
  process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
}

///// task queue manager

const functions: { [key: string]: () => any }[] = [];

/**
 * @example
 * ```js
 * bindProcessExit("scheduler_on_exit", function () {
 *    console.log("executing scheduled functions");
 *    scheduler.executeAll();
 * });
 * ```
 * or
 * ```js
 * scheduler.register();
 * ```
 */
class scheduler {
  static verbose = true;
  constructor() {
    if (!scheduler.registered) scheduler.register();
  }
  private static registered = false;
  /**
   * Register scheduler
   */
  static register(): void {
    if (scheduler.registered) return;
    scheduler.registered = true;
    bindProcessExit('scheduler_on_exit', function () {
      scheduler.executeAll();
    });
  }
  /**
   * Add function with key to list
   * @param key existing key (duplicate) will be overwritten
   * @param value
   */
  static add(key: string, value: () => any): void {
    functions[key] = value;
    const self = this;
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(self.register());
      }, 3000);
    });
  }
  private static postponeCounter = 0;
  /**
   * Add function to postpone, the functions will be executed every 5 items added
   */
  static postpone(key: string, value: () => any) {
    functions['postpone-' + key] = value;
    scheduler.postponeCounter += 1;
    if (scheduler.postponeCounter == 5) {
      scheduler.executeAll();
      scheduler.postponeCounter = 0;
    }
  }
  /**
   * Execute functon in key and delete
   * @param key
   */
  static execute(key: string, deleteAfter = true) {
    if (typeof functions[key] == 'function') {
      functions[key]();
      if (deleteAfter) delete functions[key];
    } else {
      if (scheduler.verbose) logger.error(`function with key: ${key} is not function`);
    }
  }
  /**
   * Execute all function lists
   */
  static executeAll() {
    Object.keys(functions).forEach((key) => {
      if (scheduler.verbose) logger.log(logname, 'executing', key);
      functions[key]();
    });
    scheduler.clearArray(functions);
  }

  /**
   * Clear Array
   * @param array
   */
  private static clearArray(array: any[]) {
    while (array.length) {
      array.pop();
    }
  }
}

export default scheduler;
