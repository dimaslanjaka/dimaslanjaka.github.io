/* eslint-disable no-undef */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-inner-declarations */
//console.clear();

if (location.host == 'cdpn.io') {
  function rangeAlphabetic(start, stop) {
    var result = [];
    for (var idx = start.charCodeAt(0), end = stop.charCodeAt(0); idx <= end; ++idx) {
      result.push(String.fromCharCode(idx));
    }
    return result;
  }

  let aZ = rangeAlphabetic('a', 'z')
    .concat(rangeAlphabetic('A', 'Z'))
    .filter(function (el) {
      return el != null;
    }); // a-zA-Z array

  // automated test
  setTimeout(function () {
    let inputSearch = document.getElementById('search-questions');
    var keyword = aZ[Math.floor(Math.random() * aZ.length)];
    inputSearch.value = keyword;
    inputSearch.dispatchEvent(new Event('keyup'));
  }, 3000);
}

/*** MAIN SCRIPT START ***/

/**
 * this function will work cross-browser for loading scripts asynchronously
 * @param {string} src
 * @param {function} callback
 */
function loadJScript(src, callback) {
  var s, r, t;
  r = false;
  s = document.createElement('script');
  s.type = 'text/javascript';
  s.src = src;
  s.onload = s.onreadystatechange = function () {
    //console.log( this.readyState ); //uncomment this line to see which ready states are called.
    if (!r && (!this.readyState || this.readyState == 'complete')) {
      r = true;
      if (typeof callback == 'function') callback();
    }
  };
  t = document.getElementsByTagName('script')[0];
  t.parentNode.insertBefore(s, t);
}

/**
 * Unique Array
 * @param {Array} a
 * @returns
 */
function uniqArr(a) {
  var seen = {};
  return a.filter(function (item) {
    return seen.hasOwnProperty(item) ? false : (seen[item] = true);
  });
}

/**
 * Escape regexp
 * @param {string} string
 * @returns
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

let quizUrls = [
  'https://dimaslanjaka-cors.herokuapp.com/https://raw.githubusercontent.com/dimaslanjaka/public-source/master/assets/tlon/Quiz/quiz.txt',
  'https://dimaslanjaka-cors.herokuapp.com/http://backend.webmanajemen.com/tlon/quiz.txt',
  'https://www.webmanajemen.com/assets/tlon/Quiz/quiz.txt'
];
let quizSrc = [];

function jQueryMethod() {
  // ul questions
  let questions = document.getElementById('questions');
  let inputSearch = document.getElementById('search-questions');
  let O_only = document.getElementById('O_only');

  // searcher
  let searchLi = function (filter) {
    if (!filter) {
      console.log('input empty');
      return;
    }
    let listQuiz = jQuery("ul[id*='questions'] li");
    listQuiz.each(function (index) {
      // search from first characters
      let searchFirst =
        jQuery(this)
          .text()
          .search(new RegExp('^' + escapeRegExp(filter), 'gmi')) < 0;
      if (searchFirst) {
        jQuery(this).hide();
      } else {
        jQuery(this).show();
        // move to first position
        jQuery(this).prependTo(jQuery("ul[id*='questions']"));
      }

      // search wildcards
      let searchWild =
        jQuery(this)
          .text()
          .search(new RegExp(escapeRegExp(filter), 'gmi')) < 0;
      if (searchWild) {
        jQuery(this).hide();
      } else {
        jQuery(this).show();
      }
    });
  };

  let processLi = function () {
    jQuery('#search-questions').on('keyup', function () {
      searchLi(jQuery(this).val());
    });
  };

  // transform array to li
  let transformArray2Li = function () {
    // clean orphan text
    $('#questions').text('');
    // remove existing li's
    $('#questions li').remove();

    for (let i = 0; i < quizSrc.length; i++) {
      let str = quizSrc[i];
      let isTrue = /\(O\)$/i;
      let li = document.createElement('li');
      li.innerHTML = str;
      if (isTrue.test(str)) {
        li.setAttribute('class', 'isTrue');
      } else {
        li.setAttribute('class', 'isFalse');
      }
      document.getElementById('questions').appendChild(li);
    }
  };

  // step 1: get new question sources
  quizUrls.forEach(function (quizUrl) {
    let url_parse = new URL(quizUrl);
    url_parse.search = '?uid=#uniqid()';
    //console.log(url_parse.toString());

    //console.log(quizUrl);
    $.get(url_parse.toString()).then(function (data) {
      if (data) {
        // split newLine from retrieved text into array
        let split = data.split('\n');
        // trim
        quizSrc = quizSrc.map(function (str) {
          return str.trim();
        });
        // merge and remove duplicates
        quizSrc = uniqArr(
          // merge
          quizSrc
            .concat(split)
            // trim
            .map(function (str) {
              return str.trim();
            })
        );
        // transform
        transformArray2Li();
      }
      // attach event listener
      processLi();
    });
  });

  // filter only (O)
  $('#O_only').on('change', function (e) {
    e.preventDefault();
    if (this.checked) {
      $('.isFalse').remove();
    } else {
      transformArray2Li();
    }

    if (inputSearch && inputSearch.value && inputSearch.value.trim().length > 0) {
      searchLi(inputSearch.value);
    }
  });

  // form add quiz
  /*
  $("form#addQuiz").on("submit", function (e) {
    e.preventDefault();
    let t = $(this);
    $.ajax({
      url: t.attr("action"),
      type: "post",
      //dataType: "json",
      data: t.serialize(),
      success: function (data) {
        console.log(data);
      }
    });
  });
  */
}

if (typeof jQuery === 'undefined') {
  loadJScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js', jQueryMethod);
} else {
  jQueryMethod();
}

/**
 * How URL native work {@link https://dmitripavlutin.com/parse-url-javascript/}
 * @see {@link https://stackoverflow.com/questions/8486099/how-do-i-parse-a-url-query-parameters-in-javascript}
 * @param {string} url
 * @returns
 */
function parse_query_url(url) {
  if (!url) throw 'Please provide url';
  var query = url.substr(1); // skip first ?
  var result = {};
  query.split('&').forEach(function (part) {
    var item = part.split('=');
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
}

function parse_url(url) {
  let parse = new URL(url);
  parse.search = parse_query_url(parse.search);
  return parse;
}
