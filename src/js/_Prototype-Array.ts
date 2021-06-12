/// <reference path="./globals.d.ts" />

Array.prototype.shuffle = function () {
  let i = this.length,
    j: number,
    temp: any;
  if (i == 0) return this;
  while (--i) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this[i];
    this[i] = this[j];
    this[j] = temp;
  }
  return this;
};

Array.prototype.last = function (n) {
  if (!n) {
    if (this.length === 0) return undefined;

    return this[this.length - 1];
  } else {
    let start = this.length - n;
    if (start < 0) start = 0;

    return this.slice(start, this.length);
  }
};

Array.prototype.isEmpty = function () {
  return this.length === 0;
};

Array.prototype.range = function (start, end) {
  if (end < start) {
    return [];
  }
  return this.slice(start, end + 1);
};

Array.prototype.add = function (element) {
  this.push(element);
  return this;
};

Array.prototype.addAll = function (others: Array<any>) {
  const self = this;
  others.forEach(function (e: any) {
    self.push(e);
  });
  return self;
};

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

Array.prototype.unique = function () {
  const a = this.concat();
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }

  return a;
};

Array.prototype.contains = function (obj) {
  let i = this.length;
  while (i--) {
    if (this[i] === obj) {
      return true;
    }
  }
  return false;
};

Array.prototype.first = function (n) {
  if (!n) {
    if (this.length === 0) return undefined;

    return this[0];
  } else {
    if (this.length === 0) return [];

    return this.slice(0, n);
  }
};

Array.prototype.compact = function () {
  //var changes = false;
  for (let i = 0; i < this.length; i++) {
    // If element is non-existent, undefined or null, remove it.
    if (!this[i]) {
      this.splice(i, 1);
      i = i - 1;
      //changes = true;
    }
  }
  //if (!changes) return undefined;

  return this;
};

Array.prototype.deleteAt = function (index) {
  if (index < 0) index = this.length + index;

  // If element is non-existent, return undefined:
  if (!this.hasOwnProperty(index)) return undefined;

  const elem = this[index];
  this.splice(index, 1);
  return elem;
};

Array.prototype.unset = function (value) {
  if (this.indexOf(value) != -1) {
    // Make sure the value exists
    this.splice(this.indexOf(value), 1);
  }
};

Array.prototype.exists = function (n: number) {
  return typeof this[n] !== "undefined";
};

if (!Array.prototype.hasOwnProperty("every")) {
  Array.prototype.every = function (fun: any /*, thisp */) {
    "use strict";
    let t: { [x: string]: any; length: number }, len: number, i: string | number, thisp: any;

    if (this == null) {
      throw new TypeError();
    }

    t = Object(this);
    len = t.length >>> 0;
    if (typeof fun !== "function") {
      throw new TypeError();
    }

    thisp = arguments[1];
    for (i = 0; i < len; i++) {
      if (i in t && !fun.call(thisp, t[i], i, t)) {
        return false;
      }
    }

    return true;
  };
}
