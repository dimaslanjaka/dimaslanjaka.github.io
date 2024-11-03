console.clear();

/* eslint-disable no-prototype-builtins */

if (location.host == 'cdpn.io') {
  console.clear();

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

let quizSrc = [];

function jQueryMethod() {
  // ul questions
  const searchElementQuery = '#search-questions';
  const inputSearch = document.querySelector(searchElementQuery);

  // searcher
  let searchLi = function (filter) {
    if (!filter) {
      console.log('input empty');
      return;
    }
    let listQuiz = jQuery("ul[id*='questions'] li");
    listQuiz.each(function (_index) {
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
  function fetchQuizUrl(quizUrl) {
    let url_parse = new URL(quizUrl);
    // url_parse.search = '?uid=' + new Date();
    // console.log('parse_query_url', parse_query_url(url_parse.toString()));
    // console.log(url_parse.toString());
    // console.log(quizUrl);
    return fetch(url_parse.toString())
      .then(function (response) {
        // The API call was successful!
        return response.text();
      })
      .then(processResponse)
      .catch(function () {
        const log = 'cannot fetch ' + url_parse.toString();
        const debugEl = document.getElementById('quiz-debug');
        if (debugEl) {
          debugEl.innerHTML += log + '<hr/>';
        } else {
          console.log(log);
        }
      });
  }

  fetchQuizUrl('https://backend.webmanajemen.com/tlon/quiz.php?show').catch(() => {
    fetchQuizUrl(
      'https://raw.githubusercontent.com/dimaslanjaka/source-posts/posts/The%20Legend%20Of%20Neverland/Quiz/quiz.txt'
    );
  });

  function processResponse(data) {
    if (typeof data === 'string') {
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
      )
        // remove empties
        .filter((str) => str.trim().length > 0);
      // transform
      transformArray2Li();
    }
  }

  /**
   * start searching
   */
  function doSearch() {
    if (inputSearch && inputSearch.value && inputSearch.value.trim().length > 0) {
      searchLi(inputSearch.value);
    }
  }

  // attach event listener

  // filter only (O)
  // listen input#O_only
  $('#O_only').on('change', function (e) {
    e.preventDefault();
    if (this.checked) {
      $('.isFalse').remove();
    } else {
      transformArray2Li();
    }

    doSearch();
  });

  const jqInput = jQuery(searchElementQuery);
  const inputListener = () => searchLi(jqInput.val());
  let listenerTimer;
  // on input typed and changed https://stackoverflow.com/a/7757327/6404439
  jqInput.on('keyup change', () => {
    if (listenerTimer) {
      clearTimeout(listenerTimer);
      listenerTimer = undefined;
    }
    listenerTimer = setTimeout(inputListener, 700);
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

if (typeof window.jQuery === 'undefined') {
  loadJScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js', jQueryMethod);
} else {
  jQueryMethod();
}

/**
 * How URL native work {@link https://dmitripavlutin.com/parse-url-javascript/}
 * @see {@link https://stackoverflow.com/questions/8486099/how-do-i-parse-a-url-query-parameters-in-javascript}
 * @see {@link http://jsfiddle.net/drzaus/8EE8k/}
 * @param {string|URL} url
 * @returns {Record<string, any>|undefined}
 */
function parse_query_url(url) {
  if (url instanceof URL) url = url.toString();
  if (typeof url !== 'string') return; //throw new Error('Please provide url');
  // http://jsfiddle.net/drzaus/8EE8k/
  const deparam = (function (d, x, params, p, i, j) {
    return function (qs) {
      // start bucket; can't cheat by setting it in scope declaration or it overwrites
      params = {};
      // remove preceding non-querystring, correct spaces, and split
      qs = qs
        .substring(qs.indexOf('?') + 1)
        .replace(x, ' ')
        .split('&');
      // march and parse
      for (i = qs.length; i > 0; ) {
        p = qs[--i];
        // allow equals in value
        j = p.indexOf('=');
        // what if no val?
        if (j === -1) params[d(p)] = undefined;
        else params[d(p.substring(0, j))] = d(p.substring(j + 1));
      }

      return params;
    }; //--  fn  deparam
  })(decodeURIComponent, /\+/g);
  return deparam(url);
}

/*

function parse_url(url) {
  let parse = new URL(url);
  parse.search = parse_query_url(parse.search);
  return parse;
}*/

if (typeof jQuery !== 'undefined') {
  $(document).on('click', '#clear-cache', function () {
    $.ajax({
      url: '',
      context: document.body,
      success: function (s, _x) {
        $('html[manifest=saveappoffline.appcache]').attr('content', '');
        $(this).html(s);
      }
    });
  });
}
