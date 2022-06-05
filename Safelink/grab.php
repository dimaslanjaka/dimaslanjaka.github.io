<!DOCTYPE HTML><html><head>
<style>
img{width:100%}.readdownload{display:none}
p,a{word-wrap:break-word}
</style>
<?php 
/** Script By Dimas Lanjaka (L3n4r0x) **/
header("X-Robots-Tag: index, nofollow", true);

if(function_exists('dimaslanjaka_safelink')){
} else {
include("func.php");
}
header('Content-type: text/html; charset=utf-8');
//mb_internal_encoding('UTF-8');
if(empty($actual_link)){
$actual_link = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
}

function grab($url, $div, $divlast){
$url = $url;
$content = getmeta($url);
if(isset($div)){
$first_step = explode( $div , $content );
} else {
echo "Website Development Indonesia © Powered by Dimas Lanjaka";
exit();
}
$second_step = explode( $divlast , $first_step[1] );
$title = get_title($url);
$desc = get_desc($url);
$key = get_keywords($url);
$author = get_author($url);
$_SESSION['title']=$title;
$_SESSION['description']=$desc;
$_SESSION['keywords']=$key;
$_SESSION['author']=$author;
$lastTag = $second_step[0];
$firstimg = preg_match('/<img.+src=[\'"](?P<src>.+?)[\'"].*>/i', $lastTag, $image);
$firstimg = $image['src'];
if(empty($actual_link)){
$actual_link = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
}
$htm1 = '<title>'.$title.'</title>
<meta name="description" content="'.$desc.'"/>
<meta name="keywords" content="'.$key.'"/>
<meta name="author" content="'.$author.'"/>
<meta name="robots" content="index, nofollow"/>
    <link rel="canonical" href="'.$actual_link.'">
    <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "NewsArticle",
        "headline": "'.$title.'",
        "datePublished": "2018-01-07T12:02:41Z",
        "image": [
          "'.$firstimg.'"
        ]
      }
    </script>
</head>
<body>
<div class="container"><!--Start Container-->
     <!-- Static navbar -->
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">SafelinKu</a>
          </div>
          <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
<li><a href="home/">Home</a></li>
<li><a href="about/">About</a></li>
<li><a href="privacy/">Privacy</a></li>
<li><a href="contact/">Contact</a></li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Tools<span class="caret"></span></a>
                <ul class="dropdown-menu">
                  <li><a href="urltodrive/">Save URL to Drive</a></li>
                  <li><a href="amp/">SafeLink AMP</a></li>
                  <li><a href="v3/">Safelink v3</a></li>
                  <li role="separator" class="divider"></li>
                  <li class="dropdown-header"><i class="fa fa-blogger"></i> SafeLink</li>
                  <li><a href="https://www.webmanajemen.xyz/p/a.html">SafeLink</a></li>
                  <li><a href="https://www.webmanajemen.xyz/p/redirect.html">SafeLink v2</a></li>
                </ul>
              </li>
            </ul>
            <!--ul class="nav navbar-nav navbar-right">
              <li class="active"><a href="./">Default <span class="sr-only">(current)</span></a></li>
              <li><a href="../navbar-static-top/">Static top</a></li>
              <li><a href="../navbar-fixed-top/">Fixed top</a></li>
            </ul-->
          </div><!--/.nav-collapse -->
        </div><!--/.container-fluid -->
      </nav>
';
$additional = '<center id="download" class="container">
<button type="button" id="makingdifferenttimer" class="btn btn-alert btn-block" style="display: none;" ><a class="button" alt="'.$title.'" title="'.$title.'" href="../download/?id='.getQuery($actual_link, 'id').'" rel="nofollow" target="_blank">Download</a></button>
<div id="mdtimer">
<b></b>
<div style="font-size: large;">
<b>Please Wait <span>5</span> Seconds</b></div>
</div>
</center>
<div class="container"><div class="jumbotron">
<b>Article Source : </b> <a href="'.$url.'" title="'.$title.'" alt="'.$title.'" rel="nofollow nooperner" class="text-danger">'.$url.'</a>
</div></div>
</div><!--End Container-->';
return $htm1 . $lastTag . $additional;
}

if (strpos($actual_link,'/android/') !== false){
$t = 'http://rexdl.com/android/'.getQuery($actual_link, 'id').'.html/';
$d = '<div class="entry themeform ">';
$l = '<BR>';
} else if (strpos($actual_link,'/ios/') !== false){
$t = 'http://rexdl.com/ios/'.getQuery($actual_link, 'id').'.html/';
$d = '<div class="entry themeform ">';
$l = '<BR>';
} else if (strpos($actual_link,'/mac/') !== false){
$t = 'http://rexdl.com/mac/'.getQuery($actual_link, 'id').'.html/';
$d = '<div class="entry themeform ">';
$l = '<BR>';
}
echo grab($t, $d, $l);
?>
<script>
       //<![CDATA[
       if (typeof(jQuery) == 'undefined') {document.write("<scr" + "ipt type=\"text/javascript\" src=\"//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js\"></scr" + "ipt>");}
       //]]>
</script>
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
<script src="https://getbootstrap.com/docs/3.3/assets/js/ie10-viewport-bug-workaround.js"></script>
<script>
jQuery(document).ready(function() {
var sec = 5
var timer = setInterval(function() {
   $("#mdtimer span").text(sec--);
   if (sec == 0) {
$("#makingdifferenttimer").delay(1000).fadeIn(1000);
$("#mdtimer").hide(1000) .fadeOut(fast);}
},1000);
});
var loadCSSFiles=function(){var e,t,a=['//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css','//getbootstrap.com/docs/3.3/dist/css/bootstrap.min.css','//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css',"//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"],n=document.getElementsByTagName("head")[0];for(t=0;t<a.length;t++)e=document.createElement("link"),e.rel="stylesheet",e.href=a[t],n.appendChild(e)},raf=requestAnimationFrame||mozRequestAnimationFrame||webkitRequestAnimationFrame||msRequestAnimationFrame;raf?raf(loadCSSFiles):window.addEventListener("load",loadCSSFiles);
function loadJs(e){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src=e,(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(t)};
loadJs("//getbootstrap.com/docs/3.3/dist/js/bootstrap.min.js");window.jQuery || loadJs("//getbootstrap.com/docs/3.3/assets/js/vendor/jquery.min.js");
</script>
<script type='text/javascript'>
//<![CDATA[
var myArray = ['https://www.webmanajemen.xyz/p/redirect.html?u=','https://www.webmanajemen.xyz/p/a.html?u='];
var safelink = myArray[Math.floor(Math.random() * myArray.length)];
var protectedLinks = /(bing.com|google|linkedin.com|facebook.com|pinterest|digg.com|twitter|blogger.com|ask.com|secretnetworkforces|sembilanan.tk|webmanajemen.xyz)/
$( 'a' ).each(function() {
if (this.href.match( protectedLinks ) ){
    $(this).attr('href', $(this).attr('href'));
  } else {
    $(this).attr('href', safelink+encodeURIComponent($(this).attr('href')));
  }
});
//]]>
</script>
</body></html>