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



