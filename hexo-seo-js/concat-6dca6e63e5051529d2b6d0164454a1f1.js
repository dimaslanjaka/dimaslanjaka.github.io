/*--- inner-0 --*/


(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q || []).push(arguments)},i[r].l=1 * new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-106238155-1', 'auto');
ga('send', 'pageview');



/*--- inner-3 --*/



function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
<p>function getCookie(cname) {<br>
var name = cname + “=”;<br>
var ca = document.cookie.split(‘;’);<br>
for(var i = 0; i < ca.length; i++) {<br>
var c = ca[i];<br>
while (c.charAt(0) == ’ ') {<br>
c = c.substring(1);<br>
}<br>
if (c.indexOf(name) == 0) {<br>
return c.substring(name.length, c.length);<br>
}<br>
}<br>
return “”;<br>
}</p>
<p>function checkCookie() {<br>
var user = getCookie(“username”);<br>
if (user != “”) {<br>
alert("Welcome again " + user);<br>
} else {<br>
user = prompt(“Please enter your name:”, “”);<br>
if (user != “” && user != null) {<br>
setCookie(“username”, user, 365);<br>
}<br>
}<br>
}<br>




/*--- inner-4 --*/



$("div #info").html('<div><b>User-agent:</b> '+navigator.userAgent+'<br/><b>Browser Language:</b> '+navigator.language+'<br/><b>Platform:</b> '+navigator.platform+'<br/><b>Browser Name:</b> '+navigator.appName+' v'+navigator.appVersion+'</div>');




/*--- inner-5 --*/



(adsbygoogle = window.adsbygoogle || []).push({});




/*--- inner-6 --*/



function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
var redirectURL = getCookie('redirect') ? getCookie('redirect') : (getParameterByName('url') ? getParameterByName('url') : false);
if (redirectURL){
location.replace('https://www.webmanajemen.com/page/safelink.html?url='+redirectURL);
}
$('#continue').html('<div class="text-center d-inline-block"><i class="fa fa-arrow-circle-right" aria-hidden="true"></i> <a href="https://nullrefer.com/?' rel="external nofollow noreferrer"+decodeURIComponent(redirectURL)+'" target="_blank" class="btn w3-button button bg-default"><i class="fa fa-link" aria-hidden="true"></i> <img src="https://res.cloudinary.com/dimaslanjaka/image/fetch/http://denalidestroyers.org/wp-content/uploads/continue-button-1024x282.png" style="display:inline-block !important;height:15px;width:120px" align="top" title="Continue!" /> <i class="fa fa-external-link"></i></a> <i class="fa fa-arrow-circle-left" aria-hidden="true"></i></div>');




/*--- inner-7 --*/



  (sc_adv_out = window.sc_adv_out || []).push({
    id: "708314",
    domain: "n.ads1-adnow.com",
  });
  (sc_adv_out = window.sc_adv_out || []).push({
    id: "708314",
    domain: "n.ads5-adnow.com",
    no_div: false,
  });




/*--- inner-10 --*/



var loadCSSFiles=function(){var e,t,a=[/*"//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css",*/"//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"],n=document.getElementsByTagName("head")[0];for(t=0;t<a.length;t++)e=document.createElement("link"),e.rel="stylesheet",e.href=a[t],n.appendChild(e)},raf=requestAnimationFrame||mozRequestAnimationFrame||webkitRequestAnimationFrame||msRequestAnimationFrame;raf?raf(loadCSSFiles):window.addEventListener("load",loadCSSFiles);




/*--- inner-11 --*/



(adsbygoogle = window.adsbygoogle || []).push({});
(adsbygoogle = window.adsbygoogle || []).push({});
(adsbygoogle = window.adsbygoogle || []).push({});




/*--- inner-12 --*/



     (adsbygoogle = window.adsbygoogle || []).push({});



