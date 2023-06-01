"use strict";
/** SCHEDULER JOB **/
/*** Postpone executing functions ***/
/* global hexo */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduler = exports.bindProcessExit = void 0;
const ansi_colors_1 = __importDefault(require("ansi-colors"));
const bluebird_1 = __importDefault(require("bluebird"));
const chain_1 = require("./chain");
const _log = typeof hexo !== 'undefined' ? hexo.log : console;
const logname = ansi_colors_1.default.magentaBright('[scheduler]');
const fns = {};
let triggered;
/**
 * Bind functions to exit handler
 * @param key
 * @param fn
 */
function bindProcessExit(key, fn) {
    fns[key] = fn;
    // trigger once
    if (!triggered) {
        triggered = true;
        triggerProcess();
    }
}
exports.bindProcessExit = bindProcessExit;
/**
 * Handler function on process exit
 * @param options
 * @param exitCode
 */
async function exitHandler(options, exitCode = 0) {
    const funcs = [];
    for (const key in fns) {
        if (Object.prototype.hasOwnProperty.call(fns, key)) {
            funcs.push({
                callback: fns[key],
                opt: {
                    before: () => {
                        if (scheduler.verbose)
                            _log.info(logname, `executing function key: ${key}`);
                    }
                }
            });
        }
    }
    if (options === null || options === void 0 ? void 0 : options.cleanup)
        (0, chain_1.chain)(funcs);
    if ((options === null || options === void 0 ? void 0 : options.cleanup) && scheduler.verbose)
        _log.info(logname, `clean exit(${exitCode})`);
    if (options === null || options === void 0 ? void 0 : options.exit)
        process.exit();
}
/**
 * Trigger Process Bindings
 */
function triggerProcess() {
    // before exit
    //process.on('beforeExit', exitHandler.bind(undefined, { exit: true }));
    //do something when app is closing
    process.on('exit', exitHandler.bind(undefined, { cleanup: true }));
    // process.on('disconnect', exitHandler.bind(undefined, { exit: true }));
    //catches ctrl+c event
    process.on('SIGINT', exitHandler.bind(undefined, { exit: true }));
    //process.on('SIGKILL', exitHandler.bind(undefined, { exit: true }));
    // catches "kill pid" (for example: nodemon restart)
    process.on('SIGUSR1', exitHandler.bind(undefined, { exit: true }));
    process.on('SIGUSR2', exitHandler.bind(undefined, { exit: true }));
    //catches uncaught exceptions
    process.on('uncaughtException', exitHandler.bind(undefined, { exit: true }));
}
///// task queue manager
const functions = {};
/**
 * @example
 * ```js
 * bindProcessExit("scheduler_on_exit", function () {
 *    _log.info("executing scheduled functions");
 *    scheduler.executeAll();
 * });
 * ```
 * or
 * ```js
 * scheduler.register();
 * ```
 */
class scheduler {
    constructor() {
        if (!scheduler.registered)
            scheduler.register();
    }
    /**
     * Register scheduler to process system
     */
    static register() {
        if (scheduler.registered)
            return;
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
    static add(key, value) {
        functions[key] = value;
        const self = this;
        new Promise((resolve) => {
            setTimeout(() => {
                resolve(self.register());
            }, 3000);
        });
    }
    /**
     * Add function to postpone, the functions will be executed every 5 items added
     */
    static postpone(key, value) {
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
    static execute(key, deleteAfter = true) {
        if (typeof functions[key] == 'function') {
            functions[key]();
            if (deleteAfter)
                delete functions[key];
        }
        else {
            if (scheduler.verbose)
                console.error(`function with key: ${key} is not function`);
        }
    }
    /**
     * Execute all function lists
     */
    static async executeAll() {
        const keys = Object.keys(functions);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (scheduler.verbose)
                _log.info(logname, 'executing', key);
            await bluebird_1.default.promisify(functions[key])();
        }
    }
}
scheduler.verbose = true;
scheduler.registered = false;
scheduler.postponeCounter = 0;
exports.scheduler = scheduler;
exports.default = scheduler;
