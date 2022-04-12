'use strict';

var lodash = require('lodash');
var index = require('./_index');
var storage = require('./file-sync');

module.exports = function low(source) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  opts.storage = opts.storage || storage;

  return index(source, opts, lodash);
};
