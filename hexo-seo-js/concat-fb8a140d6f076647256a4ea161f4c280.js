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




/*--- inner-8 --*/



  /*! loadCSS. [c]2017 Filament Group, Inc. MIT License */
  (function (w) {
    "use strict";
    /* exported loadCSS */
    var loadCSS = function (href, before, media, attributes) {
      // Arguments explained:
      // `href` [REQUIRED] is the URL for your CSS file.
      // `before` [OPTIONAL] is the element the script should use as a reference for injecting our stylesheet <link> before
      // By default, loadCSS attempts to inject the link after the last stylesheet or script in the DOM. However, you might desire a more specific location in your document.
      // `media` [OPTIONAL] is the media type or query of the stylesheet. By default it will be 'all'
      // `attributes` [OPTIONAL] is the Object of attribute name/attribute value pairs to set on the stylesheet's DOM Element.
      var doc = w.document;
      var ss = doc.createElement("link");
      var ref;
      if (before) {
        ref = before;
      }
      else {
        var refs = (doc.body || doc.getElementsByTagName("head")[0]).childNodes;
        ref = refs[refs.length - 1];
      }

      var sheets = doc.styleSheets;
      // Set any of the provided attributes to the stylesheet DOM Element.
      if (attributes) {
        for (var attributeName in attributes) {
          if (attributes.hasOwnProperty(attributeName)) {
            ss.setAttribute(attributeName, attributes[attributeName]);
          }
        }
      }
      ss.rel = "stylesheet";
      ss.href = href;
      // temporarily set media to something inapplicable to ensure it'll fetch without blocking render
      ss.media = "only x";

      // wait until body is defined before injecting link. This ensures a non-blocking load in IE11.
      function ready(cb) {
        if (doc.body) {
          return cb();
        }
        setTimeout(function () {
          ready(cb);
        });
      }
      // Inject link
      // Note: the ternary preserves the existing behavior of "before" argument, but we could choose to change the argument to "after" in a later release and standardize on ref.nextSibling for all refs
      // Note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
      ready(function () {
        ref.parentNode.insertBefore(ss, (before ? ref : ref.nextSibling));
      });
      // A method (exposed on return object for external use) that mimics onload by polling document.styleSheets until it includes the new sheet.
      var onloadcssdefined = function (cb) {
        var resolvedHref = ss.href;
        var i = sheets.length;
        while (i--) {
          if (sheets[i].href === resolvedHref) {
            return cb();
          }
        }
        setTimeout(function () {
          onloadcssdefined(cb);
        });
      };

      function loadCB() {
        if (ss.addEventListener) {
          ss.removeEventListener("load", loadCB);
        }
        ss.media = media || "all";
      }

      // once loaded, set link's media back to `all` so that the stylesheet applies once it loads
      if (ss.addEventListener) {
        ss.addEventListener("load", loadCB);
      }
      ss.onloadcssdefined = onloadcssdefined;
      onloadcssdefined(loadCB);
      return ss;
    };
    // commonjs
    if (typeof exports !== "undefined") {
      exports.loadCSS = loadCSS;
    }
    else {
      w.loadCSS = loadCSS;
    }
  }(typeof global !== "undefined" ? global : this));
  loadCSS("https://rawcdn.githack.com/dimaslanjaka/Web-Manajemen/9128da3f6bc1fedafb84d09179ed679c353a2d6e/WMI/style.css");




/*--- /r-ads.js --*/


/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-global-assign */
/* global adsbygoogle */

// <reference path="./cookie.js" />

/**
 * ADSENSE FULLY AUTOMATIC
 */

/*document.addEventListener('DOMContentLoaded', function () {
  if (!islocalhost()) {
    window.addEventListener('scroll', triggerAdsense);
  } else {
    triggerAdsense();
  }
});*/

document.addEventListener('DOMContentLoaded', triggerAdsense);

/**
 * Prevent Duplicate
 */
let called = false;

/**
 * Trigger adsense
 * @param {Event} _e
 * @returns
 */
function triggerAdsense(_e) {
  if (called) return;
  called = true;

  /**
   * debug on localhost
   */
  const log = islocalhost()
    ? console.log
    : function (..._args) {
        //
      };

  const existingIns = Array.from(document.querySelectorAll('ins[class*=adsbygoogle]'));
  log('existing ins', existingIns.length);

  for (let i = 0; i < existingIns.length; i++) {
    const ins = existingIns[i];

    if (islocalhost()) {
      log('apply test ad to existing ins', i + 1);
      ins.setAttribute('data-adtest', 'on');
    }
  }

  /**
   * do not show ads to these page title
   */
  const banned = [/lagu|jackpot|montok|hack|crack|nulled/gi];
  if (banned.map((regex) => regex.test(document.title)).some((result) => result == true)) {
    // skip showing ads from banned page
    return;
  }

  const allAds = [
    {
      name: 'kiki',
      pub: '2188063137129806',
      ads: [
        {
          style: 'display: block; text-align: center',
          'data-ad-layout': 'in-article',
          'data-ad-format': 'fluid',
          'data-ad-slot': '5634823028'
        },
        {
          style: 'display: block; text-align: center',
          'data-ad-layout': 'in-article',
          'data-ad-format': 'fluid',
          'data-ad-slot': '8481296455'
        },
        {
          style: 'display:block',
          'data-ad-slot': '2667720583',
          'data-ad-format': 'auto',
          'data-full-width-responsive': 'true'
        },
        {
          style: 'display:block',
          'data-ad-format': 'fluid',
          'data-ad-layout-key': '-gw-3+1f-3d+2z',
          'data-ad-slot': '6979059162'
        }
      ]
    }
  ].sort(function () {
    // shuffle
    return 0.5 - Math.random();
  });

  // select ads
  // cookie key
  const ck = 'currentAds';
  // select previous ads id from cookie
  const ca = getCookie(ck);
  /**
   * @type {typeof allAds[number]}
   */
  let currentSlot = allAds.find((item) => item.pub === ca);

  if (ca.length > 0 && typeof currentSlot === 'object') {
    log('cached pub', ca);
  } else {
    currentSlot = allAds[0];

    if (location.pathname != '/') {
      log('caching pub', currentSlot.pub);
      setCookie(
        ck,
        currentSlot.pub,
        1,
        location.pathname,
        location.hostname,
        location.protocol.includes('https') && location.host === 'www.webmanajemen.com'
      );
    }
  }

  log('total ads banner', currentSlot.ads.length);

  // find element *[adsense="fill"] for render first
  const fixedPlacement = Array.from(document.querySelectorAll('[adsense="fill"]'));
  if (fixedPlacement.length > 0) {
    for (let i = 0; i < fixedPlacement.length; i++) {
      const place = fixedPlacement[i];
      const attr = currentSlot.ads.shift();
      if (attr) {
        attr['data-ad-client'] = 'ca-pub-' + currentSlot.pub;
        const ins = createIns(attr);
        log('insert ads to adsense="fill"', i + 1);
        replaceWith(ins, place);
      }
    }
  }

  // find content/article wrapper
  let findPlaces = Array.from(document.querySelectorAll('article'));
  if (findPlaces.length === 0) {
    // theme-next main content
    findPlaces = Array.from(document.querySelectorAll('.page.main-inner'));
  }
  if (findPlaces.length === 0) {
    findPlaces = Array.from(document.querySelectorAll('#main-content'));
  }
  if (findPlaces.length === 0) {
    // bootstrap wrapper
    findPlaces = Array.from(document.querySelectorAll('#bootstrap-wrapper'));
  }
  if (findPlaces.length === 0) {
    // typedoc documentation page
    findPlaces = Array.from(document.querySelectorAll('[class="col-8 col-content"]'));
  }
  // fallback search at body
  if (findPlaces.length === 0) {
    findPlaces = Array.from(document.querySelectorAll('body'));
  }

  // select random place
  let adsPlaces = findPlaces
    .map(getAllPlaces)
    .flat(1)
    .sort(function () {
      return 0.5 - Math.random();
    })
    .filter((el) => el !== null)
    .sort(function () {
      return 0.5 - Math.random();
    });

  log('total targeted ads places', adsPlaces.length);

  if (adsPlaces.length > 0 && currentSlot.ads.length > 0) {
    for (let i = 0; i < currentSlot.ads.length; i++) {
      const attr = currentSlot.ads[i];
      if (attr) {
        attr['data-ad-client'] = 'ca-pub-' + currentSlot.pub;
        const ins = createIns(attr);
        let nextOf = adsPlaces.shift(); // get first element and remove it from list
        while (!nextOf) {
          // find next when nextOf = null
          if (adsPlaces.length > 0) {
            // select next place
            nextOf = adsPlaces.shift();
          } else {
            // if ads places empty, put to any div
            nextOf = document.querySelector('div');
          }
        }

        log('add banner', i + 1);
        insertAfter(ins, nextOf);
      }
    }
  }

  // create pagead
  const script = document.createElement('script');
  script.src = `//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${currentSlot.pub}`;
  script.async = true;
  script.setAttribute('crossorigin', 'anonymous');
  document.head.appendChild(script);

  const allIns = Array.from(document.querySelectorAll('ins'));
  log('total ins', allIns.length);

  for (let i = 0; i < allIns.length; i++) {
    log('apply banner', i + 1);
    const ins = allIns[i];
    if (!ins) continue;
    if (!ins.getAttribute('data-ad-client')) {
      console.log(ins);
      continue;
    }
    const adclient = ins.getAttribute('data-ad-client').replace('ca-pub-', '');
    const anonclient = adclient.slice(0, 3) + 'xxx' + adclient.slice(adclient.length - 3);
    const adsid = ins.getAttribute('data-ad-slot');
    const anonid = adsid.slice(0, 3) + 'xxx' + adsid.slice(adsid.length - 3);
    const bg = `https://via.placeholder.com/200x50/FFFFFF/000000/?text=${anonclient}-${anonid}`;
    ins.style.backgroundImage = `url('${bg}')`;
    ins.style.backgroundRepeat = 'no-repeat';
    // log('parent width banner', i + 0, ins.parentElement.offsetWidth);

    if (ins.parentElement.offsetWidth === 0) {
      // remove banner when parent width is 0 or display: none
      log('remove banner', i + 1);
      ins.remove();
    } else if (ins.innerHTML.trim().length === 0) {
      (adsbygoogle = window.adsbygoogle || []).push({});
    }
  }

  /** FUNC START */

  /**
   * create ins
   * @param {Record<string,any>} attributes
   * @returns
   */
  function createIns(attributes) {
    if (!attributes['data-ad-client']) {
      attributes['data-ad-client'] = 'ca-pub-' + currentSlot.pub;
    }
    const ins = document.createElement('ins');
    Object.keys(attributes).forEach((key) => {
      ins.setAttribute(key, attributes[key]);
    });
    if (!ins.classList.contains('adsbygoogle')) {
      ins.classList.add('adsbygoogle');
    }
    if (!ins.classList.contains('bannerAds')) {
      ins.classList.add('bannerAds');
    }
    if (islocalhost()) {
      ins.setAttribute('data-adtest', 'on');
    }
    return ins;
  }

  /**
   * insert next other
   * @param {HTMLElement} newNode
   * @param {HTMLElement|undefined} referenceNode insert after this element
   */
  function insertAfter(newNode, referenceNode) {
    if (referenceNode) {
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
  }

  /**
   * Create detailed cookie
   * @param {string} name
   * @param {string} value
   * @param {number} expires
   * @param {string} path
   * @param {string} domain
   * @param {boolean} secure
   */
  function setCookie(name, value, expires, path, domain, secure) {
    let exp = '';
    if (expires) {
      const d = new Date();
      d.setTime(d.getTime() + parseInt(expires) * 24 * 60 * 60 * 1000); // days
      exp = '; expires=' + d.toGMTString(); // toGMTString | toUTCString
    }
    if (!path) {
      path = '/';
    }
    const cookie =
      name +
      '=' +
      encodeURIComponent(value) +
      exp +
      '; path=' +
      path +
      (domain ? '; domain=' + domain : '') +
      (secure ? '; secure' : '');
    log(cookie);
    document.cookie = cookie;
  }

  /**
   * get all ads places
   * @param {Element|Document} from
   */
  function getAllPlaces(from) {
    return Array.from(from.querySelectorAll('h1,h2,h3,h4,h5,pre,header,hr,br,table,blockquote'))
      .sort(function () {
        return 0.5 - Math.random();
      })
      .filter((el) => el !== null);
  }

  /**
   * get cookie by name
   * @param {string} cname
   * @returns
   */
  function getCookie(cname) {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  /**
   * Replace elements with new
   * @param {HTMLElement} newElement
   * @param {HTMLElement} oldElement
   */
  function replaceWith(newElement, oldElement) {
    if (!oldElement.parentNode) {
      log(oldElement, 'parent null');
      let d = document.createElement('div');
      d.appendChild(oldElement);
    } else {
      //log(oldElement.parentNode.tagName);
      oldElement.parentNode.replaceChild(newElement, oldElement);
    }
  }

  /** FUNC END */
}

/**
 * check current script running on localhost
 * @returns
 */
function islocalhost() {
  // local hostname
  if (['adsense.webmanajemen.com', 'localhost', '127.0.0.1'].includes(location.hostname)) return true;
  // local network
  if (location.hostname.startsWith('192.168.')) return true;
  // port defined
  if (location.port.length > 0) return true;
  return false;
}



