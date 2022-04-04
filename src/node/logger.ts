/* eslint-disable prefer-rest-params */

//const original = console;
const logger = {
  /**
   * false to deactivate logger
   */
  active: true,
  assert: function () {
    if (logger.active && logger.doAssert) {
      console.assert.apply(null, arguments);
    }
  },
  clear: function () {
    if (logger.active && logger.doClear) {
      console.clear();
    }
  },
  count: function () {
    if (logger.active && logger.doCount) {
      console.count.apply(null, arguments);
    }
  },
  countReset: function () {
    if (logger.active && logger.doCountReset) {
      console.countReset.apply(null, arguments);
    }
  },
  debug: function () {
    if (logger.active && logger.doDebug) {
      console.debug.apply(null, arguments);
    }
  },
  dir: function () {
    if (logger.active && logger.doDir) {
      console.dir.apply(null, arguments);
    }
  },
  dirxml: function () {
    if (logger.active && logger.doDirxml) {
      console.dirxml.apply(null, arguments);
    }
  },
  error: function () {
    if (logger.active && logger.doError) {
      console.error.apply(null, arguments);
    }
  },
  group: function () {
    if (logger.active && logger.doGroup) {
      console.group.apply(null, arguments);
    }
  },
  groupCollapsed: function () {
    if (logger.active && logger.doGroup) {
      console.groupCollapsed.apply(null, arguments);
    }
  },
  groupEnd: function () {
    if (logger.active && logger.doGroup) {
      console.groupEnd.apply(null, arguments);
    }
  },
  info: function () {
    if (logger.active && logger.doInfo) {
      console.info.apply(null, arguments);
    }
  },
  log: function () {
    if (logger.active && logger.doLog) {
      console.log.apply(null, arguments);
    }
  },
  table: function () {
    if (logger.active && logger.doTable) {
      console.table.apply(null, arguments);
    }
  },
  time: function () {
    if (logger.active && logger.doTime) {
      console.time.apply(null, arguments);
    }
  },
  timeEnd: function () {
    if (logger.active && logger.doTime) {
      console.timeEnd.apply(null, arguments);
    }
  },
  timeLog: function () {
    if (logger.active && logger.doTime) {
      console.timeLog.apply(null, arguments);
    }
  },
  trace: function () {
    if (logger.active && logger.doTrace) {
      console.trace.apply(null, arguments);
    }
  },
  warn: function () {
    if (logger.active && logger.doWarn) {
      console.warn.apply(null, arguments);
    }
  },
  doAssert: true,
  doClear: true,
  doCount: true,
  doCountReset: true,
  doDebug: true,
  doDir: true,
  doDirxml: true,
  doError: true,
  doGroup: true,
  doInfo: true,
  doLog: true,
  doTable: true,
  doTime: true,
  doTrace: true,
  doWarn: true,
  timeStamp: function (label?: string): void {
    return console.timeStamp(label);
  },
  Console: undefined,
  profile: function (label?: string): void {
    return console.profile(label);
  },
  profileEnd: function (label?: string): void {
    return console.profileEnd(label);
  },
};
type newConsole = typeof logger &
  Console & {
    [key: string]: any;
  };
export default logger as newConsole;
