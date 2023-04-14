/*--- inner-0 --*/


(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q || []).push(arguments)},i[r].l=1 * new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-106238155-1', 'auto');
ga('send', 'pageview');



/*--- /js/common.js --*/


window.$claudia = {
    throttle: function (func, time) {
        var wait = false
        return function () {
            if (wait) return
            wait = true

            setTimeout(function () {
                func()
                wait = false
            }, time || 100)
        }
    },
    fadeInImage: function(imgs, imageLoadedCallback) {
        var images = imgs || document.querySelectorAll('.js-img-fadeIn')

        function loaded(event) {
            var image = event.currentTarget

            image.ontransitionend = function () {
                image.ontransitionend = null
                image.style.transition = null
            }
            image.style.transition = 'opacity 320ms'
            image.style.opacity = 1

            if (image.parentElement && image.parentElement.classList.contains('skeleton')) {
                image.parentElement.classList.remove('skeleton')
            }
            imageLoadedCallback && imageLoadedCallback(image)
        }

        images.forEach(function (img) {
            if (img.complete) {
                return loaded({ currentTarget: img })
            }

            img.addEventListener('load', loaded)
        })
    },
    blurBackdropImg: function(image) {
        if (!image.dataset.backdrop) return

        var parent = image.parentElement //TODO: Not finish yes, must be a pure function
        var parentWidth = Math.round(parent.getBoundingClientRect().width)
        var childImgWidth = Math.round(image.getBoundingClientRect().width)

        var isCovered = parentWidth === childImgWidth
        var blurImg = parent.previousElementSibling //TODO: Not finish yes, must be a pure function

        isCovered ? blurImg.classList.add('is-hidden') : blurImg.classList.remove('is-hidden')
    },
    getSystemTheme(callback) {
        var media = window.matchMedia('(prefers-color-scheme: dark)')
        media.addEventListener('change', function (e){
            callback && callback(e.matches ? "dark" : "light")
        })

        callback && callback(media.matches ? 'dark' : 'light')
    }
}




/*--- /js/widget-search.js --*/


// caller layout/widget/widget-search.pug

/**
 * @type {HTMLCollection}
 */
var searchDatabase = [];
var searchInputEl = document.getElementById('searchInput');
var searchButtonEl = document.getElementById('searchButton');
var searchResultEl = document.getElementById('searchContent');

if (searchInputEl) {
  searchInputEl.oninput = function (evt) {
    var searchValue = evt.srcElement.value;
    var haveSearchValue = Boolean(searchValue.trim());
    if (!haveSearchValue) {
      searchResultEl.style.height = 0;
      searchResultEl.innerHTML = null;
      return;
    }

    var searchResults = searching(searchValue);

    if (searchResults.length > 0) {
      renderSearchResults(searchResults);
    }
  };
}

function renderSearchResults(results) {
  searchResultEl.innerHTML = null;
  var fragment = document.createDocumentFragment();

  results.forEach(function (item) {
    var link = document.createElement('a');
    var title = document.createElement('h5');
    var content = document.createElement('p');

    title.className = 'mb-1';
    title.innerText = item.title;
    content.innerText = item.content;

    link.href = item.link;
    link.appendChild(title);
    link.appendChild(content);
    link.className = 'p-4 is-block';

    fragment.appendChild(link);
  });

  searchResultEl.appendChild(fragment);
  searchResultEl.style.height = 'auto';
}

function searching(inputText) {
  var inputTexts = inputText.split(' ');
  var searchResults = [];
  inputTexts.forEach(function (searchKey) {
    var haveSearchValue = Boolean(searchKey.trim());
    if (!haveSearchValue) return;

    var key = searchKey.toLowerCase();

    for (var entry of searchDatabase) {
      if (!entry) {
        continue;
      }
      var title = entry.getElementsByTagName('title')[0].textContent;
      var link = 'https://google.com/search?q=site:www.webmanajemen.com+' + inputText;
      let linkElement = entry.getElementsByTagName('link');
      let urlElement = entry.getElementsByTagName('url');
      const hyperlinkEl = urlElement || linkElement || entry.querySelector('url');
      if (isNodeList(hyperlinkEl)) {
        link = hyperlinkEl[0].getAttribute('href') || hyperlinkEl[0].textContent;
      } else {
        link = hyperlinkEl.textContent;
      }
      // remove double slashes
      link = link.replace(/^\/{2,}/, '/');
      // console.log({ title, link });

      const contentEl = entry.getElementsByTagName('content');
      var contentWithTags = isNodeList(contentEl)
        ? entry.getElementsByTagName('content')[0].textContent
        : entry.getElementsByTagName('content').textContent;
      var rawContent = contentWithTags
        .trim()
        .replace(/<[^>]+>/g, '')
        .toLowerCase();

      var LENGTH = 80;
      var finalContent = '';
      var contentLength = rawContent.length;
      var searchResultIdx = rawContent.indexOf(key);

      var startIdx = searchResultIdx - 20,
        endIdx = startIdx + LENGTH;

      if (startIdx < 0) {
        startIdx = 0;
        endIdx = 100;
      }

      endIdx > contentLength && (endIdx = contentLength);

      finalContent = rawContent.substring(startIdx, endIdx);

      if (title.indexOf(key) > -1 || searchResultIdx > -1) {
        searchResults.push({
          link: link,
          title: title,
          content: finalContent
        });
      }
    }
  });
  return searchResults;
}

function fetchDatabase() {
  if (searchDatabase.length > 0) return;

  return fetch(window.location.href + '/search.xml')
    .then((res) => res.text())
    .then((res) => {
      var domparser = new DOMParser();
      var doc = domparser.parseFromString(res, 'application/xml');
      searchDatabase = doc.getElementsByTagName('search')[0].children;
    })
    .catch((e) => {
      console.error('cannot fetch search result', e);
    });
}

searchButtonEl.onclick = fetchDatabase;

fetchDatabase().finally(() => {
  searching('quiz');
});

function isNodeList(nodes) {
  var stringRepr = Object.prototype.toString.call(nodes);

  return (
    typeof nodes === 'object' &&
    /^\[object (HTMLCollection|NodeList|Object)\]$/.test(stringRepr) &&
    typeof nodes.length === 'number' &&
    (nodes.length === 0 || (typeof nodes[0] === 'object' && nodes[0].nodeType > 0))
  );
}




/*--- inner-3 --*/


$claudia.fadeInImage(null, $claudia.blurBackdropImg)

window.addEventListener('resize', $claudia.throttle(function () {
    var images = document.querySelectorAll('.js-img-fadeIn')

    images.forEach($claudia.blurBackdropImg)
}, 150))



/*--- inner-5 --*/


$claudia.fadeInImage(null, $claudia.blurBackdropImg)

window.addEventListener('resize', $claudia.throttle(function () {
    var images = document.querySelectorAll('.js-img-fadeIn')

    images.forEach($claudia.blurBackdropImg)
}, 150))


