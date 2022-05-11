/*!
 * Start Bootstrap - Blog Home v5.0.8 (https://startbootstrap.com/template/blog-home)
 * Copyright 2013-2022 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-blog-home/blob/master/LICENSE)
 */
// This file is intentionally blank
// Use this file to add JavaScript to your project

// https://github.com/zenorocha/clipboard.js/blob/master/dist/clipboard.min.js
// https://raw.githack.com/zenorocha/clipboard.js/master/dist/clipboard.min.js
// https://rawcdn.githack.com/zenorocha/clipboard.js/2b2f9eef6fd1cf951612740e16e422db2848c00a/dist/clipboard.min.js
(function () {
  const clipboard = new ClipboardJS('[copy-to-clipboard]');
  var lazyloadads = false;
  window.addEventListener(
    'scroll',
    function () {
      var notop = 0 != document.documentElement.scrollTop;
      var notopbody = 0 != document.body.scrollTop;
      var noload = false === lazyloadads;
      if (noload && (notop || notopbody)) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=<%- config.adsense.pub %>';
        script.setAttribute('crossorigin', 'anonymous');
        script.onload = function () {
          var adsbygoogle = window.adsbygoogle || [];
          Array.from(document.querySelectorAll('ins.adsbygoogle')).forEach((ins) => {
            var adsid = ins.getAttribute('data-ad-slot'); //nullable
            if (adsid) {
              adsbygoogle.push({ google_ad_client: '<%- config.adsense.pub %>' });
              console.log('[adsense][ins]', adsid);
            }
          });
        };
        var target = document.getElementsByTagName('script')[0];
        target.parentNode.insertBefore(script, target);
        lazyloadads = true;
      }
    },
    true
  );
})();
