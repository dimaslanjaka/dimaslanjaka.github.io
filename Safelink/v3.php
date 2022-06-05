<!DOCTYPE HTML>
<html><head>
<?php
error_reporting(0);
 include('func.php');
  include('date.php');
$check = true;
if ($check === true){
if(empty($actual_link)){
$actual_link = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
}
function generatePIN($digits = 4){
    $i = 0; //counter
    $pin = ""; //our default pin is blank.
    while($i < $digits){
        //generate a random number between 0 and 9.
        $pin .= mt_rand(0, 9);
        $i++;
    }
    return $pin;
 //echo generatePIN(); for 4 digits
 //echo generatePIN(x); for custom digits (x)
}

$rebuildPIN = preg_replace('/\buid\b=+[0-9]+/', 'uid='.generatePIN(), $actual_link);
$uid = getQuery($actual_link, 'uid');
$genUID = $actual_link . '?uid=' . generatePIN();
if (strpos($_SERVER[REQUEST_URI],'uid=') == false) { 
echo '<script>window.location.href="'.$genUID.'"</script>';
exit();
}
$gen='https://linkshrink.net/zslz='.$rebuildPIN.'?uid='.generatePIN();
if (strposa($_SERVER[HTTP_REFERER],$crawler,0)) {
if(!isset($_COOKIE['lilis'])) {
    setcookie('lilis', '✓');
    $_COOKIE['lilis'] = '✓';
echo '<script>window.location.href="'.$gen.'"</script>';
exit();
} else
if(isset($_COOKIE['lilis']) && !isset($_COOKIE['pepex'])) {
    setcookie('pepex', '✓');
    $_COOKIE['pepex'] = '✓';
echo '<script>window.location.href="https://go.oclasrv.com/afu.php?zoneid=1483768"</script>';
exit();
}}
}
echo '<script>//Site_Config
var working_domain = "'.$working_domain.'";
</script>';
?>
<script>
var loadCSSFiles=function(){var e,t,a=["https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-beta.3/css/bootstrap.css","//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"],n=document.getElementsByTagName("head")[0];for(t=0;t<a.length;t++)e=document.createElement("link"),e.rel="stylesheet",e.href=a[t],n.appendChild(e)},raf=requestAnimationFrame||mozRequestAnimationFrame||webkitRequestAnimationFrame||msRequestAnimationFrame;raf?raf(loadCSSFiles):window.addEventListener("load",loadCSSFiles);
</script>
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({
          google_ad_client: "ca-pub-7975270895217217",
          enable_page_level_ads: true
     });

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
</script>
<script>
function loads(url) {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = url;
(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(s);
}
//loads('//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
//loads('//pagead2.googlesyndication.com/pagead/show_ads.js');
loads('//cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js?lang=css&skin=sunburst');
loads('//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-beta.3/js/bootstrap.min.js');
loads('//codepen.io/dimaslanjaka/pen/QQVJxM.js');
loads('//st-n.ads1-adnow.com/js/adv_out.js');
loads('//st-n.pc5ads.com/js/adv_out.js');
if(window.location.host.indexOf(working_domain) > -1) {
loads('//www.google.com/recaptcha/api.js');
}
</script>
<script>
<?php include __DIR__ ."/adshield.min.js"; ?>
</script>
<style>
.block{display:block}.none{display:none}
iframe{width:100%}
.clear{clear: both}
#comments,.comments{display:none}
.overflow{overflow:auto}
.fa{color:green}*{max-width:100%}
div#gtag{display:none}
<?php
if(!isset($_COOKIE['captcha'])) {
echo "#continue{display:none}";
} else {
echo "#captcha,g-recaptcha{display:none}";
}
?>
</style>
</head>
<body>
<div class="container">
<?php include('header.php'); ?>
<?php include('breadcrumbs.php'); ?>
<meta content='Lawyers, safe, Personal, isuranceQS, Insurance, Cheap, Auto, Cheap Car, Distance,' name='keywords'/>
<center>
<?php
if(strpos($_SERVER[HTTP_HOST],'webmanajemen.xyz') !== false) {
echo '<div id="captcha">
<div class="g-recaptcha" data-callback="recaptchaCallback" data-sitekey="6LdD7T4UAAAAACUSq-URfR5pQBCA3wV1SiyrIdmL"></div>
</div>';
}
?>
<img src="https://tools.ip2location.com/468x60.png" title="IP" width="468" height="60" /></center>
<script type='text/javascript'>
       //<![CDATA[
       if (typeof(jQuery) == 'undefined') {document.write("<scr" + "ipt type=\"text/javascript\" src=\"//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js\"></scr" + "ipt>");}
       function recaptchaCallback() {
    setCookie('captcha','✓',1);
  window.location.reload();
 };
       //]]>
       </script>
<script>
document.write('<pre><code><b>User-agent:</b> '+navigator.userAgent+'<br/><b>Browser Language:</b> '+navigator.language+'<br/><b>Platform:</b> '+navigator.platform+'<br/><b>Browser Name:</b> '+navigator.appName+' v'+navigator.appVersion+'<br/></code></pre>');
function getQueryVariable(variable) {
 var query = window.location.search.substring(1);
 var vars = query.split("&");
 for (var i=0;i<vars.length;i++) {
 var pair = vars[i].split("=");
 if(pair[0] == variable){return pair[1];}
 }
 return(false);
}

  var count = 11;
  var rurl = window.location.href;
  var rpath = window.location.pathname;
  var hashtag = window.location.hash.substr(1);
  var queryU = getQueryVariable('u');
if (rurl.indexOf(rpath+'?u=') > -1){
var targeturls = queryU;
} else if (rurl.indexOf(rpath+'#') > -1){
var targeturls = hashtag;
} else {
document.write('<style>#timer,#done,#ket{display:none}</style>');
}
  var redirect = decodeURIComponent(targeturls);
  var noprotocol = redirect.replace(/(^\w+:|^)\/\//, '');
</script>

<center>
<div class="clear"></div>
<div class="overflow">
<!-- Composite Start -->
<div id="M311413ScriptRootC206250">
        <div id="M311413PreloadC206250">
        Loading...    </div>
        <script>
                (function(){
            var D=new Date(),d=document,b='body',ce='createElement',ac='appendChild',st='style',ds='display',n='none',gi='getElementById';
            var i=d[ce]('iframe');i[st][ds]=n;d[gi]("M311413ScriptRootC206250")[ac](i);try{var iw=i.contentWindow.document;iw.open();iw.writeln("<ht"+"ml><bo"+"dy></bo"+"dy></ht"+"ml>");iw.close();var c=iw[b];}
            catch(e){var iw=d;var c=d[gi]("M311413ScriptRootC206250");}var dv=iw[ce]('div');dv.id="MG_ID";dv[st][ds]=n;dv.innerHTML=206250;c[ac](dv);
            var s=iw[ce]('script');s.async='async';s.defer='defer';s.charset='utf-8';s.src="//jsc.mgid.com/w/e/webmanajemen.xyz.206250.js?t="+D.getYear()+D.getMonth()+D.getDate()+D.getHours();c[ac](s);})();
    </script>
</div>
<!-- Composite End -->
</div>
<script>
(function() {document.write("<div id='continue' class='text-center d-inline-block'><i class='fa fa-arrow-circle-right' aria-hidden='true'></i> <a href='https://nullrefer.com/?"+redirect+"' target=\"_blank\" onclick='javascript:window.location.href=\"https://linkshrink.net/zslz=\"+window.location.href+\"?n=\"+Math.random();' class='btn bg-default'><i class=\"fa fa-link\" aria-hidden=\"true\"></i> Continue <i class=\"fa fa-external-link\"></i></a> <i class='fa fa-arrow-circle-left' aria-hidden='true'></i></div>")})();
</script>
</div>
<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-7975270895217217" data-ad-slot="4163345568" data-ad-format="auto"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({})</script>
<div class="container text-center">
<script>
(function() {document.write("<div id='continue' class='text-center d-inline-block'><i class='fa fa-arrow-circle-right' aria-hidden='true'></i> <a href='https://nullrefer.com/?"+redirect+"' target=\"_blank\" onclick='javascript:window.location.href=\"https://go.oclasrv.com/afu.php?zoneid=1483768\"' class='btn bg-default'><i class=\"fa fa-link\" aria-hidden=\"true\"></i> Continue <i class=\"fa fa-external-link\"></i></a> <i class='fa fa-arrow-circle-left' aria-hidden='true'></i></div>")})();
</script>
<div class="overflow">
<div id="SC_TBlock_481591" class="SC_TBlock">loading...</div>
</div>
<div class="clear"></div>
<script type="text/javascript">
(function() {document.write("<div id='continue' class='text-center d-inline-block'><i class='fa fa-arrow-circle-right' aria-hidden='true'></i> <a href='https://nullrefer.com/?"+redirect+"' target=\"_blank\" onclick='javascript:window.location.href=\"https://linkshrink.net/zslz=\"+window.location.href+\"?n=\"+Math.random();' class='btn bg-default'><i class=\"fa fa-link\" aria-hidden=\"true\"></i> Continue <i class=\"fa fa-external-link\"></i></a> <i class='fa fa-arrow-circle-left' aria-hidden='true'></i></div>")})();
</script>
<script>
var ad_idzone="2935872",ad_width="300",ad_height="250";
</script>
<script type="text/javascript" src="https://ads.exdynsrv.com/ads.js"></script>
<noscript><a href="https://main.exdynsrv.com/img-click.php?idzone=2935872" target="_blank" title="ads"><img src="https://syndication.exdynsrv.com/ads-iframe-display.php?idzone=2935872&amp;output=img&amp;type=300x250" width="300" height="250" title="ads" /></a></noscript>
<script>
(function() {document.write("<div id='continue' class='text-center d-inline-block'><i class='fa fa-arrow-circle-right' aria-hidden='true'></i> <a href='https://nullrefer.com/?"+redirect+"' target=\"_blank\" onclick='javascript:window.location.href=\"https://linkshrink.net/zslz=\"+window.location.href+\"?n=\"+Math.random();' class='btn bg-default'><i class=\"fa fa-link\" aria-hidden=\"true\"></i> Continue <i class=\"fa fa-external-link\"></i></a> <i class='fa fa-arrow-circle-left' aria-hidden='true'></i></div>")})();
</script>
<div class="overflow">
<div id="SC_TBlock_487364" class="SC_TBlock">loading...</div>
</div>
</center>
<script type="text/javascript">
    (sc_adv_out = window.sc_adv_out || []).push({
        id : "487364",
        domain : "n.pc5ads.com"
    });
    (sc_adv_out = window.sc_adv_out || []).push({
        id : "481591",
        domain : "n.ads1-adnow.com"
    });
</script>
</div>
<div class="clear"></div>
<div class="row">
<ins class="adsbygoogle" data-ad-client="ca-pub-7975270895217217" data-ad-format="auto" data-ad-slot="2600604346" style="display:block"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({})</script>
<div class="clear"></div>
<ins class="adsbygoogle" data-ad-client="ca-pub-7975270895217217" data-ad-format="autorelaxed" data-ad-slot="6234751119" style="display:block"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({})</script>
<div class="clear"></div>
<ins class="adsbygoogle" data-ad-client="ca-pub-7975270895217217" data-ad-format="auto" data-ad-slot="7267894124" style="display:block"></ins><script>(adsbygoogle=window.adsbygoogle||[]).push({})</script>
</div>
<div class="clear"></div>
<!--Footer-->
<div class="container panel panel-primary">
Copyright © 2018 <a href="//www.webmanajemen.xyz" alt="website development indonesia" title="website development indonesia" rel="follow">Website Development Indonesia</a>. All right Reserved.
</div>
<div id="gtag">
<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NXVCJCW"
height="0" width="0"></iframe>
</div>
<script>
$("pre").addClass("prettyprint");/*
$('ins').after('<div class="clear"></div>');
$('ins').before('<div class="clear"></div>');*/
</script>
<?=file_get_contents('http://aadblock.payclick.com/aadbPayClick.php?ids=487364');?>
</body>
</html>