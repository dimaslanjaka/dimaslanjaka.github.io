/*--- inner-0 --*/


(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q || []).push(arguments)},i[r].l=1 * new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-106238155-1', 'auto');
ga('send', 'pageview');



/*--- inner-3 --*/


countDown();



/*--- inner-4 --*/


function progress(timeleft, timetotal, $element) {     var progressBarWidth = timeleft * $element.width() / timetotal;     $element.find('div').animate({ width: progressBarWidth }, timeleft == timetotal ? 0 : 1000, 'linear').html(timeleft + " secs");     if(timeleft > 0) {         setTimeout(function() {             progress(timeleft - 1, timetotal, $element);         }, 1000);     } };  progress(10, 10, $('#progressBar')); 



/*--- inner-5 --*/


var disqus_config = function () { this.page.url = 'https://www.webmanajemen.com/2018/02/actually-what-is-internet-marketing.html'; this.page.identifier = 'dimaslanjaka'; this.page.title = document.title; };



/*--- inner-6 --*/


(function() {var d = document, s = d.createElement('script');s.src = '//dimaslanjaka.disqus.com/embed.js';s.setAttribute('data-timestamp', +new Date());(d.head || d.body).appendChild(s);})();


