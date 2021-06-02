<?php
/** Script By Dimas Lanjaka (L3n4r0x) **/
session_start();
ob_start();
if(!isset($_SESSION['origURL'])){
if(empty($_SERVER['HTTP_REFERER'])) {
$_SESSION['origURL'] = "Directly Visit";
} else {
$_SESSION['origURL'] = $_SERVER['HTTP_REFERER'];
}
}
require_once('config.php');
include('dom.php');
$url_no_params = $_SERVER['REQUEST_URI'];
$url_no_params = preg_replace('/\?.*/', '', $url_no_params);
$actual_link = (isset($_SERVER['HTTPS']) ? 'https' : 'http').'://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
$crawler=array("pingdom.com","gtmetrix.com","google.com","bing.com","yandex.com","msn.com","ask.com");
    setcookie('G_ENABLED_IDPS', 'google');
    $_COOKIE['G_ENABLED_IDPS'] = "google";
function strposa($haystack, $needles=array(), $offset=0) {
        $chr = array();
        foreach($needles as $needle) {
                $res = strpos($haystack, $needle, $offset);
                if ($res !== false) $chr[$needle] = $res;
        }
        if(empty($chr)) return false;
        return min($chr);
}

function checkssl(){
$check = stream_get_wrappers();
echo 'openssl: ',  extension_loaded  ('openssl') ? 'isload':'noload','<br>';
echo 'http: ', in_array('http', $check) ? 'ok':'no','<br>';
echo 'https: ', in_array('https', $check) ? 'ok':'no','<br>';
}

if (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') {
  if($_SERVER["HTTPS"] != "on"){
    header("Location: https://" . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"]);
    exit();
}}

function dimaslanjaka_safelink(){
 echo "AGC Safelink Converter By Dimas Lanjaka";
}

function getQuery($url, $queries){
$parsed_url = parse_url($url);
$url_query = $parsed_url['query'];
$url_query = parse_str($url_query, $out);
$decodeOut = urldecode($out[$queries]);
return $decodeOut;
}

function parse_ytID_from_url($url){
parse_str( parse_url( $url, PHP_URL_QUERY ), $my_array_of_vars );
return $my_array_of_vars['v'];
}

function file_get_contents_YT($url) {
$ch = curl_init();
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); //Set curl to return the data instead of printing it to the browser.
curl_setopt($ch, CURLOPT_URL, $url);
$data = curl_exec($ch);
curl_close($ch);
return $data;
}

function getUserIP()
{
    $client  = @$_SERVER['HTTP_CLIENT_IP'];
    $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
    $remote  = $_SERVER['REMOTE_ADDR'];

    if(filter_var($client, FILTER_VALIDATE_IP))
    {
        $ip = $client;
    }
    elseif(filter_var($forward, FILTER_VALIDATE_IP))
    {
        $ip = $forward;
    }
    else
    {
        $ip = $remote;
    }

    return $ip;
}

function RealSubdir()
{
    $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
    $domainName = $_SERVER['HTTP_HOST'].'/';
    return $protocol.$domainName.basename(__DIR__).'/';
}

function url_parser($url) {

// multiple /// messes up parse_url, replace 2+ with 2
$url = preg_replace('/(\/{2,})/','//',$url);

$parse_url = parse_url($url);

if(empty($parse_url["scheme"])) {
    $parse_url["scheme"] = "http";
}
if(empty($parse_url["host"]) && !empty($parse_url["path"])) {
    // Strip slash from the beginning of path
    $parse_url["host"] = ltrim($parse_url["path"], '\/');
    $parse_url["path"] = "";
}   

$return_url = "";

// Check if scheme is correct
if(!in_array($parse_url["scheme"], array("http", "https", "gopher"))) {
    $return_url .= 'http'.'://';
} else {
    $return_url .= $parse_url["scheme"].'://';
}

// Check if the right amount of "www" is set.
$explode_host = explode(".", $parse_url["host"]);

// Remove empty entries
$explode_host = array_filter($explode_host);
// And reassign indexes
$explode_host = array_values($explode_host);

// Contains subdomain
if(count($explode_host) > 2) {
    // Check if subdomain only contains the letter w(then not any other subdomain).
    if(substr_count($explode_host[0], 'w') == strlen($explode_host[0])) {
        // Replace with "www" to avoid "ww" or "wwww", etc.
        $explode_host[0] = "www";

    }
}
$return_url .= implode(".",$explode_host);

if(!empty($parse_url["port"])) {
    $return_url .= ":".$parse_url["port"];
}
if(!empty($parse_url["path"])) {
    $return_url .= $parse_url["path"];
}
if(!empty($parse_url["query"])) {
    $return_url .= '?'.$parse_url["query"];
}
if(!empty($parse_url["fragment"])) {
    $return_url .= '#'.$parse_url["fragment"];
}


return $return_url;
}

/*
echo url_parser('//wwww.example.com/lorum.html'); // http://www.example.com/lorum.html
echo url_parser('http:/wwww.example.com/lorum.html'); // http://www.example.com/lorum.html
echo url_parser('gopher:/ww.example.com'); // gopher://www.example.com
echo url_parser('http:/www3.example.com/?q=asd&f=#asd'); // http://www3.example.com/?q=asd&f=#asd
echo url_parser('asd://.example.com/folder/folder/'); // http://example.com/folder/folder/
echo url_parser('.example.com/'); // http://example.com/
echo url_parser('example.com'); // http://example.com
echo url_parser('subdomain.example.com'); // http://subdomain.example.com
*/

function replacecomma($string) {
$string = preg_replace('#\s+#',', ',trim($string));
return $string;
}
function removespecial($string) {
$string = preg_replace('/[0-9]+/', '', $string); //number
$string = str_replace(array( 'Rp ' ), '', $string);
$string = preg_replace("/[^ \w]+/", "", $string); //special
return $string;
}
function http_get_contents($url)
{
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_TIMEOUT, 1);
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
  if(FALSE === ($retval = curl_exec($ch))) {
    error_log(curl_error($ch));
  } else {
    return $retval;
  }
}
function get_contents($url){
$file = $url;
$contents = preg_match("/^http/", $file) ? http_get_contents($file) : file_get_contents($file);
return $contents;
}
/*
function get_title($url){
  $fixurl = str_replace(' ', '%20', $url);
  if(get_contents($fixurl) == FALSE) {
  $str = preg_match("/^http/", $fixurl) ? http_get_contents($fixurl) : file_get_contents($fixurl);
  } else {
  $str = get_contents($fixurl);
  }
  if(strlen($str)>0){
    $str = trim(preg_replace('/\s+/', ' ', $str)); // supports line breaks inside <title>
    preg_match("/\<title\>(.*)\<\/title\>/i",$str,$title); // ignore case
    return $title[1];
  }
}
*/
function get_links($url){
  $str = preg_match("/^http/", $url) ? http_get_contents($url) : file_get_contents($url);
  if(strlen($str)>0){
    $link_regex = '/<a\s+.*?href=[\"\']?([^\"\' >]*)[\"\']?[^>]*>(.*?)<\/a>/i';
    $str = preg_match('/<a\s+.*?href=[\"\']?([^\"\' >]*)[\"\']?[^>]*>(.*?)<\/a>/i', $str, $links);
    return $links[1];
  }
}

function deploy($url) {
$content = get_contents($url);
$first_step = explode( '<div class="content layout-centered">', $content );
$explode = explode( '</div>', $first_step[1] );

return $explode[0];
}

function getValue($key) {
    if (!isset($_GET[$key])) {
        return false;
    }
    return $_GET[$key];
}
/*
function get_meta($val){
$tags = get_meta_tags($val);
return array('author' => $tags['author'], 'description' => $tags['description'], 'keywords' => $tags['keywords']);
}

function get_metas($url){
$html = get_contents($url);
//parsing begins here:
$doc = new DOMDocument();
@$doc->loadHTML($html);
$nodes = $doc->getElementsByTagName('title');
//get and display what you need:
$title = $nodes->item(0)->nodeValue; //titles
$metas = $doc->getElementsByTagName('meta');
for ($i = 0; $i < $metas->length; $i++)
{
    $meta = $metas->item($i);
    if($meta->getAttribute('name') == 'author'){
        $author = $meta->getAttribute('content');
        }
    if($meta->getAttribute('name') == 'description'){
        $description = $meta->getAttribute('content');
        }
    if($meta->getAttribute('name') == 'keywords'){
        $keywords = $meta->getAttribute('content');
        }
}
return array('description' => $description, 'author' => $author, 'keywords' => $keywords);
}

$targeturl = "https://www.webmanajemen.xyz";

if (get_meta_tags($targeturl) == FALSE){
$meta = get_metas($targeturl);
} else {
$meta = get_meta($targeturl);
}

$getDesc = $meta['description'];
$getKey = $meta['keywords'];
$getAuthor = $meta['author'];
*/

function getmeta($url) {
$ch = curl_init();
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_URL, $url);
$data = curl_exec($ch);
curl_close($ch);
return $data;
}

function get_meta($url){
$html = getmeta($url);
//parsing begins here:
$doc = new DOMDocument();
@$doc->loadHTML($html);
$nodes = $doc->getElementsByTagName('title');
//get and display what you need:
$title = $nodes->item(0)->nodeValue; //titles
$metas = $doc->getElementsByTagName('meta');
for ($i = 0; $i < $metas->length; $i++)
{
    $meta = $metas->item($i);
    if(strtolower($meta->getAttribute('name')) == "author" ) {
        $author = $meta->getAttribute('content');
        }
    if(strtolower($meta->getAttribute('name')) == 'description'){
        $description = $meta->getAttribute('content');
        }
    if(strtolower($meta->getAttribute('name')) == 'keywords'){
        $keywords = $meta->getAttribute('content');
        }
}
return array('title' => $title, 'description' => $description, 'author' => $author, 'keywords' => $keywords);
}
function get_title($url){
$metax = get_meta($url);
return $metax['title'];
}
function get_desc($url){
$metax = get_meta($url);
return $metax['description'];
}
function get_keywords($url){
$metax = get_meta($url);
return $metax['keywords'];
}
function get_author($url){
$metax = get_meta($url);
return $metax['author'];
}

if (isset($_GET['type']) == 'javasript') {
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header('Content-Type: application/javascript');
}
if (getValue('pos') == 'body') {
$jsbody = <<<EOF
//-- Iframe Blocker
/*
$(document).ready(function() {
  setTimeout(function() {
if(window.top!==window.self){ // is the outermost document not this document?
  document.write=""; // write an empty text node to the document. (not sure why)
  window.top.location=window.self.location; // set the parent document's location to this document's location.
  setTimeout( function(){document.body.innerHTML=""}, 1); // after 1 millisecond make this document's HTML empty. (Probably a memory leak fix)
  window.self.onload = function(){document.body.innerHTML=""} // Another memory leak fix to clear the current document when it is done loading.
};
if (window.self !== window.top) {
        window.top.location.href = window.location.href;
    }
  }, 5000);
});
*/
//--Verify Url
/*
function isUrlValid(url) {
    return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}

var getallurl = $( 'a' ).each(function() {
  var h = this.href;
  return h
    }).get();


var testCases = getallurl;

var divOutput = document.getElementById("outputValidation");

for(var i=0; i < testCases.length; i++) {
    var test = testCases[i];
    divOutput.innerHTML += (isUrlValid(test) ? "<span style='color:green'>valid</span>:   " : "<span style='color:red'>invalid</span>: ") + "" + test + "\n" + "";
}
*//*
//-- Call External Js
(function() {
var cars = 'https://www.googletagmanager.com/gtag/js?id=UA-104256209-1,https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js,https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js,https://www.googletagmanager.com/gtag/js?id=UA-106238155-1,https://pagead2.googlesyndication.com/pagead/show_ads.js'.split(',');
for (var c in cars) {
    var newElement = document.createElement('script');
    newElement.src = cars[c]; newElement.className = "text/javascript";
    newElement.async = true;
    var head = document.getElementsByTagName('head')[0];
        head.appendChild(newElement);
    document.head.appendChild(newElement);
}})();
*/
//-- Statistik

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-104256209-1');
  gtag('config', 'UA-106238155-1');

(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NXVCJCW');

//-- Load Fonts
WebFont.load({ google: { families: ['Raleway', 'Tahoma', 'Verdana', 'Tangerine', 'Source Code Pro', 'Open Sans Condensed'] } });
//-- Action Blocker /#1 Keyboard Function Disabler /#2 Right/Long Click Disabler
/*
$(document).keydown(function(e){
    if(e.which === 123){
       return false;
    }
});
*/

window.onload = function() {
    document.addEventListener("contextmenu", function(e){
      e.preventDefault();
    }, false);
    document.addEventListener("keydown", function(e) {
    //document.onkeydown = function(e) {
      // "I" key
      if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
        disabledEvent(e);
      }
      // "J" key
      if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
        disabledEvent(e);
      }
      // "S" key + macOS
      if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        disabledEvent(e);
      }
      // "U" key
      if (e.ctrlKey && e.keyCode == 85) {
        disabledEvent(e);
      }
      // "F12" key
      if (event.keyCode == 123) {
        disabledEvent(e);
      }
    }, false);
    function disabledEvent(e){
      if (e.stopPropagation){
        e.stopPropagation();
      } else if (window.event){
        window.event.cancelBubble = true;
      }
      e.preventDefault();
      return false;
    }
  };
  
  /*
$(document).bind("contextmenu",function(e) {
 e.preventDefault();
});
*/
//Disable right click script
var message = "Right Click Disabled";
///////////////////////////////////
function clickIE() {
    if (document.all) {
        (message);
        return false;
    }
}

function clickNS(e) {
    if (document.layers || (document.getElementById && !document.all)) {
        if (e.which == 2 || e.which == 3) {
            (message);
            return false;
        }
    }
}
if (document.layers) {
    document.captureEvents(Event.MOUSEDOWN);
    document.onmousedown = clickNS;
} else {
    document.onmouseup = clickNS;
    document.oncontextmenu = clickIE;
}

document.oncontextmenu = new Function("return false")
/*
//-- Detect Mobile
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
if( isMobile.any() ){ 
//- Android Long Press
window.onload = preventLongPressMenu2(document.getElementsByTagName('a'));
function preventLongPressMenu2(nodes) {
  for(var i=0; i<nodes.length; i++){
     nodes[i].ontouchstart = absorbEvent_;
     nodes[i].ontouchmove = absorbEvent_;
     nodes[i].ontouchend = absorbEvent_;
     nodes[i].ontouchcancel = absorbEvent_;
  }
}
}
*/
	$(".spoiler-trigger").click(function() {
		$(this).parent().next().collapse('toggle');
	});
EOF;
echo $jsbody;
}else if (getValue('pos') == 'head') {
$jshead = <<<EOF
function loads(url) {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = url;
    var x = document.getElementsByTagName('head')[0];
        x.appendChild(s);
    //document.head.appendChild(s);
}
loads('//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
loads('//pagead2.googlesyndication.com/pagead/show_ads.js');
loads('//www.googletagmanager.com/gtag/js?id=UA-104256209-1');
loads('//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
loads('//www.googletagmanager.com/gtag/js?id=UA-106238155-1');
//loads('//codepen.io/dimaslanjaka/pen/rJpGpB.js');
EOF;
echo $jshead;
}

?>