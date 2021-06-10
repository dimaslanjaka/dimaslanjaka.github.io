"use strict";

class is {
  /**
   * check string is json
   * @param {string} str
   * @description check validate json
   */
  static json(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = is;
  exports = is;
  exports.is = is;
}
