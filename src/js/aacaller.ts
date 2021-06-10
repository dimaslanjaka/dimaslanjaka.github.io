let root: any;
//declare let global: any;

(function () {
  if (typeof global == "undefined" || (global && !global)) {
    global = this;
  }
  // Establish the root object, `window` in the browser, or `global` on the server.
  root = this;
})();

/**
 * Is Node ?
 */
function isnode() {
  return typeof module !== "undefined" && module.exports;
}

/**
 * Class reflection
 * @see https://stackoverflow.com/a/1250766
 * @param obj
 */
function getNativeClass(obj: any) {
  if (typeof obj === "undefined") return "undefined";
  if (obj === null) return "null";
  return Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/)[1];
}

/**
 * Class reflection
 * @see https://stackoverflow.com/a/1250766
 * @param obj
 */
function getAnyClass(obj: any) {
  if (typeof obj === "undefined") return "undefined";
  if (obj === null) return "null";
  return obj.constructor.name;
}

if (isnode()) {
  module.exports.isnode = isnode;
} else {
  global.isnode = isnode;
}

/**
 * call_user_func
 * @param functionName function name
 */
function ___call(functionName: string, context?: Window, args?: any) {
  var args = Array.prototype.slice.call(arguments, 2);
  const namespaces = functionName.split(".");
  const func = namespaces.pop();
  if (typeof window[func] != "undefined") {
    window[func](args);
  } else if (context && context instanceof Window) {
    if (typeof context[func] != "undefined") {
      context[func](args);
    }
  } else {
    try {
      eval(functionName);
    } catch (error) {
      console.error(error);
      console.error(functionName + " is not function");
    }
  }
}

if (isnode()) {
  module.exports.___call = ___call;
} else {
  global.___call = ___call;
}

/**
 * call_user_func
 * @param functionName
 * @param context
 * @param args
 */
function call_user_func(functionName: string, context: Window & typeof globalThis, args: any) {
  var args = Array.prototype.slice.call(arguments, 2);
  const namespaces = functionName.split(".");
  const func = namespaces.pop();
  for (let i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]];
  }
  return context[func].apply(context, args);
}

if (isnode()) {
  module.exports.call_user_func = call_user_func;
} else {
  global.call_user_func = call_user_func;
}

/**
 * Make function async
 * @param callback
 */
function async_this(callback: Function): Promise<any> {
  return new Promise(function (resolve, reject) {
    if (typeof callback == "function") {
      callback();
      resolve(true);
    } else {
      reject(new Error("callback is not function"));
    }
  });
}

if (isnode()) {
  module.exports.async_this = async_this;
} else {
  global.async_this = async_this;
}

/**
 * call_user_func
 * @param func function name
 */
function __call(func: string) {
  this[func].apply(this, Array.prototype.slice.call(arguments, 1));
}

if (isnode()) {
  module.exports.__call = __call;
} else {
  global.__call = __call;
}

/**
 * check empty
 * @param str
 */
function empty(str: string | object | Array<any> | boolean | null | undefined | number) {
  const type = typeof str;
  if (typeof str == "boolean" || typeof str == "undefined" || str == null) {
    return true;
  } else if (typeof str == "object") {
    return str.length != 0;
  } else if (type == "string" || type == "number") {
    return str.toString().trim().length != 0;
  } else if (Array.isArray(str)) {
    return str.length;
  }
}

if (isnode()) {
  module.exports.empty = empty;
} else {
  global.empty = empty;
}

/**
 * Get current function name
 */
function getFuncName() {
  return getFuncName.caller.name;
}

if (isnode()) {
  module.exports.getFuncName = getFuncName;
} else {
  global.getFuncName = getFuncName;
}

/**
 * Is Development Mode
 */
function is_development() {
  return document.getElementsByTagName("html")[0].getAttribute("environtment") == "development";
}

if (isnode()) {
  module.exports.is_development = is_development;
} else {
  global.is_development = is_development;
}

/**
 * Generate random string with length
 * @param length length to generate
 * @global
 * @see https://dev.to/oyetoket/fastest-way-to-generate-random-strings-in-javascript-2k5a
 */
const generateRandomString = function (length = 6) {
  return Math.random().toString(20).substr(2, length);
};

if (isnode()) {
  module.exports.generateRandomString = generateRandomString;
}

/**
 * Create uniqueid with prefix or suffix
 * @param prefix
 * @param suffix
 */
function uniqid(prefix: any, suffix: any) {
  return ((prefix ? prefix : "") + generateRandomString() + (suffix ? suffix : "")).toString();
}

if (isnode()) {
  module.exports.uniqid = uniqid;
} else {
  global.uniqid = uniqid;
}

if (typeof now == "undefined") {
  function now() {
    return Date.now();
  }

  if (isnode()) {
    module.exports.now = now;
  } else {
    global.now = now;
  }
}

/**
 * Get unique array
 * @param {any} value
 * @param {any} index
 * @param {any[]} self
 * @example dataArray.filter(onlyUnique)
 */
function onlyUnique(value: any, index: any, self: any[]) {
  return self.indexOf(value) === index;
}

/**
 * Parse string to float/number
 * @param total_amount_string string including numbers
 */
function parseNumber(total_amount_string: string) {
  let total_amount_int = "";
  if (typeof total_amount_string != "undefined" || total_amount_string != null) {
    total_amount_int = parseFloat(total_amount_string.replace(/,/g, ".")).toFixed(2);
  }
  return parseFloat(total_amount_int);
}

function typedKeys<T>(o: T): (keyof T)[] {
  // type cast should be safe because that's what really Object.keys() does
  return Object.keys(o) as (keyof T)[];
}
