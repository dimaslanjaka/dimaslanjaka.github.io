/// <reference path="globals.d.ts" />

String.prototype.parse_url = function () {
  let parser = document.createElement("a"),
    searchObject: Array<Object | any>,
    queries: string[],
    split: Array<Object | any>,
    i: number;
  // Let the browser do the work
  parser.href = this.toString();
  // Convert query string to object
  queries = parser.search.replace(/^\?/, "").split("&");
  for (i = 0; i < queries.length; i++) {
    split = queries[i].split("=");
    searchObject[split[0]] = split[1];
  }
  return {
    protocol: parser.protocol,
    host: parser.host,
    hostname: parser.hostname,
    port: parser.port,
    pathname: parser.pathname,
    search: parser.search,
    searchObject: searchObject,
    hash: parser.hash,
    protohost: parser.protocol + "//" + parser.host,
  };
};

/**
 * Load css
 */
String.prototype.CSS = function () {
  const e = document.createElement("link");
  e.rel = "stylesheet";

  e.href = this.toString();
  const n = document.getElementsByTagName("head")[0];
  window.addEventListener
    ? window.addEventListener(
        "load",
        function () {
          n.parentNode.insertBefore(e, n);
        },
        !1
      )
    : window.attachEvent
    ? window.attachEvent("onload", function () {
        n.parentNode.insertBefore(e, n);
      })
    : (window.onload = function () {
        n.parentNode.insertBefore(e, n);
      });
};

String.prototype.trim = function () {
  return this.replace(/^\s+|\s+$/gm, "");
};
String.prototype.hexE = function () {
  let hex: string, i: number;

  let result = "";
  for (i = 0; i < this.length; i++) {
    hex = this.charCodeAt(i).toString(16);
    result += ("000" + hex).slice(-4);
  }

  return result;
};

String.prototype.hexD = function () {
  let j: number;
  const hexes = this.match(/.{1,4}/g) || [];
  let back = "";
  for (j = 0; j < hexes.length; j++) {
    back += String.fromCharCode(parseInt(hexes[j], 16));
  }

  return back;
};

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.rot13 = function () {
  return this.replace(/[a-zA-Z]/g, function (c: any) {
    return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
  });
};

String.prototype.truncate = function (n: number, useWordBoundary: boolean | null) {
  if (this.length <= n) {
    return this;
  }
  const subString = this.substr(0, n - 1); // the original check
  return (useWordBoundary ? subString.substr(0, subString.lastIndexOf(" ")) : subString) + "&hellip;";
};

String.prototype.isEmpty = function () {
  if (this != null || typeof this != "undefined") {
    return this.length === 0 || !this.trim();
  }
  return false;
};
