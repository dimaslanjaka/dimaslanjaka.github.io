const guxid: string = (Math.random().toString(16) + "000000000").substr(2, 8);

/**
 * Get current unique global page user id
 */
function guid() {
  function _p8(s: boolean) {
    const p = guxid;
    return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
  }

  return _p8(false) + _p8(true) + _p8(true) + _p8(false);
}

if (typeof jQuery != "undefined" && !isnode()) {
  jQuery.guid = function () {
    function _p8(s: boolean) {
      const p = guxid;
      return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }

    return _p8(false) + _p8(true) + _p8(true) + _p8(false);
  };
}

/**
 * Generate UUID v4
 */
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
