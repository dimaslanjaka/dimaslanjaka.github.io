/*--- inner-0 --*/


(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q || []).push(arguments)},i[r].l=1 * new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-106238155-1', 'auto');
ga('send', 'pageview');



/*--- inner-3 --*/



  function translatorWidgetStart() {
    var mylang = 'id', // Your website language
      translateBtn = document.getElementById('translate-me'),
      canonical = document.querySelector('link[rel="canonical"]');
    // get href
    if (canonical) canonical = canonical.getAttribute('href').toString().trim();
    translateBtn.onclick = function () {
      var toLang = document
        .querySelector('select#translate-language')
        .value.trim();
      window
        .open(
          'http://translate.google.com/translate?u=' +
          encodeURIComponent(canonical || location.href) +
          '&sl=' +
          mylang +
          '&hl=' +
          toLang,
          'translate'
        )
        .focus();
      return false;
    };
  }
  document.addEventListener('DOMContentLoaded', translatorWidgetStart);




/*--- inner-4 --*/


var disqus_config = function () { this.page.url = 'https://www.webmanajemen.com/chimeraland/blacklist-player.html'; this.page.identifier = 'dimaslanjaka'; this.page.title = document.title; };



/*--- inner-5 --*/


(function() {var d = document, s = d.createElement('script');s.src = '//dimaslanjaka.disqus.com/embed.js';s.setAttribute('data-timestamp', +new Date());(d.head || d.body).appendChild(s);})();


