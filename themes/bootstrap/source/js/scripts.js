/*!
 * Start Bootstrap - Blog Home v5.0.8 (https://startbootstrap.com/template/blog-home)
 * Copyright 2013-2022 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-blog-home/blob/master/LICENSE)
 */
// Use this file to add JavaScript to your project

document.onreadystatechange = function () {
  if (document.readyState == 'complete') {
    initClipboard();
  }
};

/**
 * * source {@link https://github.com/zenorocha/clipboard.js/blob/master/dist/clipboard.min.js}
 * * development {@link https://raw.githack.com/zenorocha/clipboard.js/master/dist/clipboard.min.js}
 * * production {@link https://rawcdn.githack.com/zenorocha/clipboard.js/2b2f9eef6fd1cf951612740e16e422db2848c00a/dist/clipboard.min.js}
 */
function initClipboard() {
  var clipboardLoaded = false;
  window.addEventListener(
    'scroll',
    function () {
      var notop = 0 != document.documentElement.scrollTop;
      var notopbody = 0 != document.body.scrollTop;
      var noload = false === clipboardLoaded;
      if (noload && (notop || notopbody)) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src =
          'https://rawcdn.githack.com/zenorocha/clipboard.js/2b2f9eef6fd1cf951612740e16e422db2848c00a/dist/clipboard.min.js';
        script.setAttribute('crossorigin', 'anonymous');
        script.onload = function () {
          const clip = new ClipboardJS('[copy-to-clipboard]');
          clip.on('success', function (e) {
            console.log('codes copied');
            console.info('Action:', e.action);
            console.info('Text:', e.text);
            console.info('Trigger:', e.trigger);

            e.clearSelection();
          });
        };
        var target = document.getElementsByTagName('script')[0];
        target.parentNode.insertBefore(script, target);
        clipboardLoaded = true;
      }
    },
    true
  );
}
