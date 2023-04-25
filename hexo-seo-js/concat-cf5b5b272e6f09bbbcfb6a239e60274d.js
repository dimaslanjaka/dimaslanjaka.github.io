/*--- inner-0 --*/


(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q || []).push(arguments)},i[r].l=1 * new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-106238155-1', 'auto');
ga('send', 'pageview');



/*--- inner-3 --*/


  function imagE(image_url){        var http = new XMLHttpRequest();        http.open("HEAD", image_url, false);      //http.open("GET", image_url, false);      http.send();      return http.status;      //return http.status != 404;    }    function chx(){  $( "img" ).each(function() {    var image_url = $(this).attr("src");    var img_this = $(this);    if (imagE(image_url) !== 200){      img_this.remove();    }  /*$.get(image_url)      .done(function() {                 }).fail(function() {            img_this.remove();      });*/  });  }/*  setTimeout(function() {  if(typeof jQuery=="undefined") {      var headTag = document.getElementsByTagName("head")[0];      var jqTag = document.createElement("script");      jqTag.type = "text/javascript";      jqTag.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";      jqTag.onload = chx;      headTag.appendChild(jqTag);  } else { chx(); }  }, 500);*/  var limit = 0;  function keluar_ga(){  $( "img" ).each(function() {    var image_url = $(this).attr("src");    var img_this = $(this);    img_this.on("error", function (){ img_this.attr("src", "https://res.cloudinary.com/dimaslanjaka/image/fetch/http://media.wired.com/photos/5926db217034dc5f91becd6b/master/w_900,c_limit/so-logo-s.jpg"); })  });   //return $("body").html("*"+limit+"\n");   //clearInterval(udah);    }    var udah = setInterval(keluar_ga, 100);  



/*--- inner-4 --*/


var disqus_config = function () { this.page.url = 'https://www.webmanajemen.com/2018/11/download-film-meg-2018-subtitle.html'; this.page.identifier = 'dimaslanjaka'; this.page.title = document.title; };



/*--- inner-5 --*/


(function() {var d = document, s = d.createElement('script');s.src = '//dimaslanjaka.disqus.com/embed.js';s.setAttribute('data-timestamp', +new Date());(d.head || d.body).appendChild(s);})();


