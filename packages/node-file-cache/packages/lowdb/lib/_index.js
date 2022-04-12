'use strict';

var isPromise = require('is-promise');

module.exports = function (source) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref$format = _ref.format,
    format = _ref$format === undefined ? null : _ref$format,
    _ref$storage = _ref.storage,
    storage = _ref$storage === undefined ? null : _ref$storage,
    _ref$writeOnChange = _ref.writeOnChange,
    writeOnChange = _ref$writeOnChange === undefined ? true : _ref$writeOnChange;

  var lodash = arguments[2];

  // Create a fresh copy of lodash
  var _ = lodash.runInContext();

  var db = _.chain({});

  if (source) {
    if (format) {
      if (format.serialize) {
        db.serialize = format.serialize;
      }
      if (format.deserialize) {
        db.deserialize = format.deserialize;
      }
    }

    if (storage) {
      if (storage.read) {
        db.read = function () {
          var s = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : source;

          var res = storage.read(s, db.deserialize);
          var init = function init(obj) {
            db.__wrapped__ = obj;
            db._checksum = JSON.stringify(db.__wrapped__);
          };

          if (isPromise(res)) {
            return res.then(function (obj) {
              init(obj);
              return db;
            });
          }

          init(res);
          return db;
        };
      }

      if (storage.write) {
        db.write = function () {
          var dest = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : source;
          return storage.write(dest, db.__wrapped__, db.serialize);
        };
      }
    }
  }

  // Persist database state
  function persist() {
    if (db.source && db.write && writeOnChange) {
      var str = JSON.stringify(db.__wrapped__);

      if (str !== db._checksum) {
        db._checksum = str;
        db.write(db.source);
      }
    }
  }

  // Modify value function to call save before returning result
  _.prototype.value = _.wrap(_.prototype.value, function (value) {
    var v = value.apply(this);
    persist();
    return v;
  });

  // Get or set database state
  db.getState = function () {
    return db.__wrapped__;
  };
  db.setState = function (state) {
    db.__wrapped__ = state;
    persist();
  };

  db._ = _;
  db.source = source;

  // Read
  if (db.read) {
    return db.read();
  } else {
    return db;
  }
};
