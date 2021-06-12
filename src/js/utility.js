if (typeof module == "undefined" && !module.exports) {
  /**
   * @todo Auto replace placeholder textarea newLines
   */
  const textAreas = document.getElementsByTagName("textarea");
  Array.prototype.forEach.call(textAreas, function (elem) {
    elem.placeholder = elem.placeholder.replace(/\\n/g, "\n");
  });

  /**
   * @todo Disable hotkey
   */
  $(document).bind("keydown", function (e) {
    e = e || window.event;
    if (e.ctrlKey && e.which == 83) {
      e.preventDefault();
      toastr.info("CTRL+S disabled", "Hotkey");
      return false;
    } else if ((e.keyCode == 82 && e.ctrlKey) || e.keyCode == 116) {
      e.preventDefault();
      document.location.reload(true);
      return false;
    }
  });

  /**
   * @todo Textarea placeholders
   */
  $("textarea").each(function (index, el) {
    if ($(this).val().toString().length) return;
    const placeholder = $(this).attr("placeholder");
    $(this).removeAttr("placeholder");
    let id = $(this).attr("id");
    if (!id || id.length == 0) {
      id = makeid(5);
      $(this).attr("id", id);
    }
    $(this).val(formatNewLines(placeholder));
    tafocus("#" + id, placeholder);
  });

  /**
   * @todo datatables select2 jquery tooltip
   */
  $(document).ready(function () {
    /** Tooltip */
    if (jQuery.fn.tooltip && $('[data-toggle="tooltip"]')) {
      $("body").tooltip({
        selector: '[data-toggle="tooltip"]',
      });
      //$('[data-toggle="tooltip"]').tooltip();

      // colored tooltip

      $('[data-toggle="tooltip-primary"]').tooltip({
        template:
          '<div class="tooltip tooltip-primary" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
      });

      $('[data-toggle="tooltip-secondary"]').tooltip({
        template:
          '<div class="tooltip tooltip-secondary" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
      });

      $('[data-toggle="tooltip-danger"]').tooltip({
        template:
          '<div class="tooltip tooltip-danger" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
      });
    }

    /** datatables */
    if (jQuery.fn.DataTable && $("#datatable1").length) {
      $("#datatable1").DataTable({
        responsive: true,
        language: {
          searchPlaceholder: "Search...",

          sSearch: "",
          lengthMenu: "_MENU_ items/page",
        },
      });
    }

    /** Select2 */
    var ds = $(".dataTables_length select");
    if (typeof jQuery.fn.select2 != "undefined") {
      if (ds.length || ds.data("select2")) {
        ds.select2({
          minimumResultsForSearch: Infinity,
        });
      }
    }
  });
}

/**
 * textarea focus
 * @param {String} id
 * @param {String} placeholder
 */
function tafocus(id, placeholder) {
  var count_newlines = countNewLines(placeholder);

  $(id).on("focus", function (e) {
    var count_length = $(this).val().length;
    if (count_length === count_newlines || $(this).val() == placeholder) {
      $(this).val("");
    }
  });

  $(id).on("blur", function (e) {
    var count_length = $(this).val().length;
    if (!count_length) {
      $(this).val(formatNewLines(placeholder));
    }
  });
}

/**
 * format new lines
 * @param {String} placeholder
 */
function formatNewLines(placeholder) {
  for (let index = 0; index < 1000; index++) {
    if (!placeholder) break;
    placeholder = placeholder.replace("\\n", "\n");
    if (!placeholder.match(/\\n/g)) {
      break;
    }
  }
  return placeholder;
}

/**
 * Count newLines
 * @param {String} placeholder
 */
function countNewLines(placeholder) {
  if (!placeholder) return placeholder;
  var match = placeholder.match(/\\n/g) || "";
  return placeholder.length - match.length;
}

/**
 * find duplicate array
 * @param {Array<any>} arr
 * @param {Function} callback
 */
function findDups(arr, callback) {
  var sorted_arr = arr.slice().sort();
  var results = [];
  for (var i = 0; i < sorted_arr.length - 1; i++) {
    if (sorted_arr[i + 1] == sorted_arr[i]) {
      results[i] = sorted_arr[i];
    }
  }
  if (typeof callback == "function") {
    return callback(results);
  } else {
    return results;
  }
}

//=========== Auto id
/**
 * Auto Generate ID
 * @param length number digits
 * @param prefix prefix
 */
function makeid(length, prefix = "") {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return (prefix + result).trim();
}

/**
 * Javascript caller
 * @param {String} url
 * @param {Function} callback
 */
function JavaScriptCaller(url, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    //IE
    script.onreadystatechange = function () {
      if (script.readyState == "loaded" || script.readyState == "complete") {
        script.onreadystatechange = null;
        if (typeof callback == "function") {
          callback();
        }
      }
    };
  } else {
    //Others
    script.onload = function () {
      if (typeof callback == "function") {
        callback();
      }
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

/**
 * Function initialization
 */

if (typeof module == "undefined" && !module.exports) {
  if ($("#logout").length) {
    $(document).one("click", "#logout", function (e) {
      e.preventDefault();
      jQuery.post(
        location.href,
        {
          logout: true,
        },
        function () {
          jQuery.get($(this).attr("href"));

          window.location.reload(1);
        }
      );
    });
  }

  /** Query URL */
  function getLocationHash() {
    var hash = window.location.hash.substr(1);

    var result = hash.split("&").reduce(function (result, item) {
      var parts = item.split("=");
      result[parts[0]] = parts[1];
      return result;
    }, {});

    if (hash.length > 1) {
      console.log(result);
    }
  }

  /** datetime-local */
  if (typeof dimas == "object" && typeof framework().datetimelocal != "undefined") {
    framework().datetimelocal(undefined);
  }

  /** Progress bar */
  var elm = $("[countdown]");
  if (elm.length) {
    elm.each(function (e) {
      var t = $(this);
      framework().pctd(t);
    });
  }

  /** document body listener */
  $(document.body).on("click", "[data-redirect]", function (E) {
    var red = $(this).attr("data-redirect").toString();
    if (red && red.trim() != "") {
      window.open(red, location.host).focus();
    }
  });

  /** Linkify */
  if (typeof mask_link != "undefined") {
    /**
     * @type {JQuery<HTMLElement>} L
     */
    var L = $("[data-linkify]").length ? $("[data-linkify]") : $(document.body);
    window.onload = function () {
      L.linkify({
        target: "_blank",
        attributes: null,
        className: "linkified",

        format: function (value, type) {
          return value;
        },

        formatHref: function (href, type) {
          return (
            "/youtube/s/" +
            btoa(CryptoJS.AES.encrypt(href, typeof hash_pass != "undefined" ? hash_pass : location.host))
          );
        },
      });
    };
  }

  /**
   * links new tab form submit
   */
  var aform = $("[form]");
  if (aform.length > 1) {
    aform.click(function (e) {
      e.preventDefault();
      var id_form = $(this).attr("form");
      if (typeof id_form != "undefined") {
        var winame = document.getElementById(id_form).getAttribute("target"); //reduce caching
        console.log("Submiting Form ID#" + id_form);
        window.open("", winame.length ? winame : "FormDynamic").focus();
        document.getElementById($(this).attr("form")).submit();
      }
      //w = window.open('', 'bagas31-post');
      //$('form#' + $(this).attr('form')).submit();
      //w.focus();
    });
  }
}

/**
 * get currency symbol from navigator
 */
function get_currency_symbol() {
  var amount = 0;
  var ident = navigator.language;
  var currency_type;
  switch (ident) {
    case "de-DE":
      currency_type = "EUR";
      break;
    case "id-ID":
      currency_type = "IDR";
      break;
    default:
      currency_type = "USD";
      break;
  }
  var format = amount.toLocaleString(ident, {
    style: "currency",
    currency: currency_type,
  });
  return format.toString().replace("0,00", "");
}

/**
 * Create JSON
 * @param {any} jsObj
 * @param {boolean} tabs
 */
function createJSON(jsObj, tabs) {
  if (tabs) {
    return JSON.stringify(jsObj, null, "\t"); // stringify with tabs inserted at each level
  } else {
    return JSON.stringify(jsObj, null, 4); // stringify with 4 spaces at each level}
  }
}

/**
 * Loading.io
 * @param {string} text
 * @param {Function} callback
 * @param {"enable" | "enabled" | "disable" | "disabled"} mode
 */
function loadingio(text, callback, mode) {
  if (typeof text == "undefined" || typeof text == "boolean" || !text) {
    text = "Please wait";
  }
  text.toString().toUpperCase();
  if (document.getElementById("loadingio-wrapper")) {
    if (mode == "disabled" || mode == "disable") {
      document.getElementById("loadingio-wrapper").classList.remove("running");
    } else if (typeof mode == "undefined" || (typeof mode != "undefined" && (mode == "enable" || mode == "enabled"))) {
      document.getElementById("loadingio-text").innerHTML = text;
      document.getElementById("loadingio-wrapper").classList.toggle("running");
    }
  } else {
    var elemDiv = document.createElement("div");
    elemDiv.innerHTML =
      '<div id="loadingio-wrapper" class="ld-over-full running"><span class="ld"><span class="ld ld-ball ld-bounce"></span><span id="loadingio-text" class="text pt-3">' +
      text +
      '<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></span></span></div>';
    document.body.appendChild(elemDiv);
  }

  if (typeof callback == "function") {
    callback(arguments);
  }
}

/**
 function target(a) {
    alert(a);
}

 var o = {
    suffix: " World",
    target: function(s) { alert(s + this.suffix); }
};

 __call("target", "Hello");

 __call.call(o, "target", "Hello");
 */

/**
 * parse proxy from string
 * @param {string} str
 * @return {Array<any>} proxy list filtered
 */
function parse_proxy(str) {
  var matchs,
    px = [];
  loadingio("Parsing proxies", function () {
    /*
         while (match = /([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}):?([0-9]{1,6})?/g.exec(str)) {
         console.log('Match: "' + match[0] + '" first group: -> "' + match[1] + '" second group -> ' + match[2]);
         if (typeof match[0] != 'undefined' && typeof match[2] != 'undefined' && !inArray(match[0], px)) {
         px.push(match[0]);
         }
         }
         */
    if (typeof str == "string") {
      var regex = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\:[0-9]{1,6}/gm,
        match,
        proxyMatch;
      while ((match = regex.exec(str))) {
        proxyMatch = match[0];
        //console.log(proxyMatch);
        if (proxyMatch.includes(":") && !inArray(proxyMatch, px)) {
          px.push(proxyMatch);
        }
      }
      var regex = /Proxy\([\'\"]([a-zA-Z0-9\=]*)[\'\"]\)/gm,
        match,
        proxyMatch;
      while ((match = regex.exec(str))) {
        proxyMatch = atob(match[1]);
        //console.log(proxyMatch);
        if (proxyMatch.includes(":") && !inArray(proxyMatch, px)) {
          px.push(proxyMatch);
        }
      }
    }
    loadingio(null, null, "disabled");
    return px;
  });

  return array_shuffle(array_unique(px));
}

/**
 * Add class if not exists
 * @param {Element} element element from DOM
 * @param {string} className class name
 */
function toogleClass(element, className) {
  return element.classList.toggle(className);
}

/**
 * jQuery pseudo builder
 * @param {string} string
 */
function pseudo_builder(string) {
  if (string) {
    return string.replace(/[\W\s]/gm, "");
  }
}

/**
 * Loop key value of object
 * @param {Object} object
 * @param {Function} callback
 */
function foreach(object, callback) {
  var key, value;
  Object.keys(object).forEach(function (key) {
    if (typeof callback == "function") {
      callback(key, object[key]);
    }
  });
  /*
     for ([key, value] of Object.entries(object)) {
     if (typeof callback == 'function'){
     callback(key, value);
     } else {
     console.log(key, value);
     }
     }
     */
}

/**
 * Get multiple random element from array
 * @param {Array<any>} arr array sources
 * @param {Number} n maximum element to be in result
 * @param {Function} callback function to process result
 */
function getRandom(arr, n, callback) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len) {
    var msg = "getRandom: more elements taken than available";
    alert(msg);
    throw new RangeError(msg);
  }
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  if (typeof callback == "function") {
    return callback(result);
  } else {
    return result;
  }
}

if (typeof module != "undefined" && module.exports) {
  module.exports.makeid = makeid;
}
