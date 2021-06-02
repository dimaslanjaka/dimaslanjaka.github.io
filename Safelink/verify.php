<?php
/** Script By Dimas Lanjaka (L3n4r0x) **/
error_reporting(0);
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Content-Type: text/html; charset=utf-8");
header('Referer: '.$_SERVER['HTTP_REFERER']);
include('func.php'); include('keywords.php');
?>
<!DOCTYPE html>
<html><head>
<?php
include('date.php');
?>
<script src='<?php echo RealSubdir(); ?>adshield.min.js'></script>
<link href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" rel="stylesheet" />
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" integrity="sha256-NuCn4IvuZXdBaFKJOAcsU2Q3ZpwbdFisd5dux4jkQ5w=" crossorigin="anonymous" />
<style>
.clear,#clear{clear:both}
.none{display:none}
body{-webkit-touch-callout: none;                /* prevent callout to copy image, etc when tap to hold */
    -webkit-user-select: none; }
#log-table-wrapper{overflow: auto}
#log-table-wrapper table td{
        white-space: pre-wrap; /* css-3 */
        white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
        white-space: -pre-wrap; /* Opera 4-6 */
        white-space: -o-pre-wrap; /* Opera 7 */
        word-wrap: break-word; /* Internet Explorer 5.5+ */
}   
</style>
<script>
<?php
echo file_get_contents(RealSubdir() . 'func.php?pos=head&type=javascript'); 
?>
</script>
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({
    google_ad_client: "ca-pub-7975270895217217",
    enable_page_level_ads: true
  });
</script>
<!-- Bootstrap core CSS -->
<link href="//getbootstrap.com/docs/3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
<link href="//getbootstrap.com/docs/3.3/assets/css/ie10-viewport-bug-workaround.css" rel="stylesheet">
<!-- Custom styles for this template -->
<link href="//getbootstrap.com/docs/3.3/examples/navbar/navbar.css" rel="stylesheet">
<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
<script src="//oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
<script src="//oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->
</head>
<body>
<script src="//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js">
</script>
<script>
function getQueryVariable(variable) {
 var query = window.location.search.substring(1);
 var vars = query.split("&");
 for (var i=0;i<vars.length;i++) {
 var pair = vars[i].split("=");
 if(pair[0] == variable){return pair[1];}
 }
 return(false);
}

  var count = 16;
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

function countDown(){
    var timer = document.getElementById("timer");
    var done = document.getElementById("done");
    var ket = document.getElementById("ket");
    if(count > 0){
        count--;
        timer.innerHTML = "<div id='timer' class='panel text-center panel-default'><div class='panel-heading'>Your Link Will Be Appears In <b>"+count+"</b> Seconds.</div></div>";
        setTimeout("countDown()", 1000);
    }else{
document.getElementById("timer-container").style.display = "block";
timer.innerHTML = "<div id='timer' class='panel panel-default text-center'><div class='panel-heading'>Your Link Already Appeared, <b>Scroll Down</b> To View.</div></div>";
done.innerHTML = "<div class='text-center d-inline-block'><i class='fa fa-arrow-circle-right' aria-hidden='true'></i> <a href='https://nullrefer.com/?"+redirect+"' target=\"_blank\" onclick='javascript:window.location.href=\"https://linkshrink.net/zslz=www.webmanajemen.xyz/?n=\"+Math.random();' class='btn bg-default'><i class=\"fa fa-link\" aria-hidden=\"true\"></i> Continue <i class=\"fa fa-external-link\"></i></a> <i class='fa fa-arrow-circle-left' aria-hidden='true'></i></div>";
ket.innerHTML = "<div class='text-center d-inline-block'><b>URL Validation Results</b> <pre>"+redirect+"</pre></div>";
    }
}
</script>
<div class="container">
<?php
include('header.php');
if(isset($_GET['privacy'])){
include('privacy.php');
} else {
?>
<div class="clear"></div>
<div id="timer-container" class="container">
<span id="timer">
<script>
$(window).bind("load", function() {
  countDown();
});
</script>
</span>
</div>
<?php include("youtube.php"); ?>
<div class="clear"></div>
<?php include('ads-top.php'); ?>
<div class="clear"></div>
<span id="done"></span>
<div class="clear"></div>
<?php include('ads-middle.php'); ?>
<div class="clear"></div>
<span id="ket"></span>
<div class="clear"></div>
<?php include('ads-bottom.php'); ?>
<!--div class="jumbotron">
<div class="text-center">
<b>URL Validation Results</b>
</div>
<pre id="outputValidation"></pre-->
</div>
<?php
$user_ip = getUserIP();
//http://ipinfo.io/{$user_ip}/json
$jsonc = get_contents("http://ip-api.com/json/{$user_ip}");
$get_ip_details = json_decode($jsonc);
$cityIP = $get_ip_details->city;
$countryIP = $get_ip_details->country;
$regionIP = $get_ip_details->region;
$orgIP = $get_ip_details->org;
/*
var_dump($get_ip_details);
var_dump($jsonc);
*/
?>
<div class="container"><div class="jumbotron"><div class="text-center"><b>Insurance Of Your Location</b></div>
<?php
echo '<div class="container" id="log-table-wrapper">
<table class="table">
  <thead class="thead-dark">
    <tr>
      <th>Date</th>
      <th>IP</th>
      <th>Details</th>
      <th>Title</th>
      <th>URL</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td scope="row">'.date('Y-m-d H:i:s').'</td>
      <td>'.$user_ip.'</td>
      <td>'.$orgIP.' | '.$cityIP.' | '.$regionIP.' | '.$countryIP.'</td>
      <td>'.$p_title.'</td>
      <td>'.$actual_link.' From: '.$_SESSION['origURL'].'</td>
    </tr>
  </tbody>
</table>
</div>
';
?>
</div></div>
<?php include('modal.php'); ?>
<?php
}
include("PayPal.php");
?>
</div>
<footer class="main-footer w3-light-grey">
    <div class="container">
      <div class="pull-right hidden-xs">
        <a href="//www.webmanajemen.xyz/p/privacy.html"><b>Privacy Policy</b></a>
      </div>
      <strong>Copyright 2018 <a href="//webmanajemen.xyz">Verifying Links Page</a>.</strong> All rights
      reserved.
    </div>
</footer>
<!--div id="debug"></div-->
<!-- Bootstrap core JavaScript
================================================== -->
<!-- Placed at the end of the document so the pages load faster -->
<script>window.jQuery || document.write('<script src="//getbootstrap.com/docs/3.3/assets/js/vendor/jquery.min.js"><\/script>')</script>
<script src="//getbootstrap.com/docs/3.3/dist/js/bootstrap.min.js">
</script>
<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
<script src="//getbootstrap.com/docs/3.3/assets/js/ie10-viewport-bug-workaround.js">
</script>
<script>
<?php
echo file_get_contents(RealSubdir() . 'func.php?pos=body&type=javascript'); 
?>
</script>
<?php
include('log.php');
?>
</body>
</html>