<?php
error_reporting(0);
header('Referer: '.$refses);
ini_set('suhosin.get.max_value_length', '1000');
if(function_exists('dimaslanjaka_safelink')){
} else {
include("func.php");
}
include('keywords.php');

$actual_link = (isset($_SERVER['HTTPS']) ? 'https' : 'http').'://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
/*
var_dump(parse_url($actual_link));
*/
parse_str($_SERVER['QUERY_STRING'], $outputUrl);
print_r($outputUrl, TRUE);
$targetOutput = $outputUrl['url'];
if (strpos($targetOutput, 'ifttt') !== false) {
header('Location: http://adf.ly/11024561/' . $outputUrl['url']);
exit();
} else {
$opts = [
    "http" => [
        "method" => "GET",
        "header" => "Accept: */*\r\n" .
            "Accept-Encoding: deflate, gzip\r\n" .
            //"User-Agent: Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.102011-10-16 20:23:10\r\n" .
            "Referer: http://urltinyfy.appspot.com/\r\n"
    ]
];

$context = stream_context_create($opts);

if($_GET['url']!='') {
$QueriesUrl = utf8_decode(urldecode($_GET['url']));
$urlTarget = url_parser($QueriesUrl);
} else {
$urlTarget = "http://webmanajemen.xyz";
}

$titleTarget = get_title($urlTarget);

//SafeMn ShortLink 
$safemnUrl = 'http://urltinyfy.appspot.com/safemn?url='.urlencode($urlTarget).'&callback=foo&title='.urlencode($titleTarget).'&unify=1';
$safemnGet = file_get_contents($safemnUrl, false, $context);
$safemnGet = str_replace(array( 'foo(', ')' ), '', $safemnGet);
$safemnDecode = json_decode($safemnGet);
$safemn =  $safemnDecode->{'tinyurl'};
$safemnLong = $safemnDecode->{'longurl'};

// Goo.gl ShortLink
$googlurl = 'http://urltinyfy.appspot.com/googl?url='.urlencode($urlTarget).'&jsonp=foo&title='.urlencode($titleTarget).'&unify=1';
$getGoogl = file_get_contents($googlurl, false, $context);
$googlJSON = $getGoogl;
$googlJSON = str_replace(array( 'foo(', ')' ), '', $googlJSON);
$resultGoogl = json_decode($googlJSON);
$googl = $resultGoogl->{'short_url'};
$googlLong = $resultGoogl->{'longUrl'};

//Tinyurl.com shortlink
$tinyUrl = 'http://urltinyfy.appspot.com/tinyurl?url='.urlencode($urlTarget).'&callback=foo&title='.urlencode($titleTarget).'&unify=1';
$getTinyurl = file_get_contents($tinyUrl, false, $context);
$tinyurlJSON = $getTinyurl;
$tinyurlJSON = str_replace(array( 'foo(', ')' ), '', $tinyurlJSON);
$resultTinyurl = json_decode($tinyurlJSON);
$tinyurl = $resultTinyurl->{'tinyurl'};
$tinyurlLong = $resultTinyurl->{'longurl'};

//Random Shortlink Target
$servList = [$googl, $safemn, $tinyurl];
if (strlen($urlTarget)<150){
$getServ = $servList[mt_rand(0, count($servList) - 1)];
} else if (strlen($urlTarget)>150) {
$getServ = $urlTarget;
}

//Random LongUrl Target
$longServ = [$googlLong, $safemnLong, $tinyurlLong];
$getLong = $longServ[mt_rand(0, count($longServ) - 1)];

//Safelink initialization
if($_GET['safelink']!='') {
$randomSafelink = $_GET['safelink'];
} else {
$safelinkList = ['https://information.webmanajemen.xyz/2018/02/atlanta-personal-injury-lawyers-1.html?u=','https://www.webmanajemen.xyz/p/redirect.html?u=', 'https://information.webmanajemen.xyz/2018/02/choosing-personal-injury-lawyer.html?u=','https://www.webmanajemen.xyz/p/a.html?u=','https://bot.webmanajemen.xyz/safelink/get/?u='];
$randomSafelink = $safelinkList[mt_rand(0, count($safelinkList) - 1)];
}

if($_GET['test_safelink']!='') {
$SafelinK = $_GET['test_safelink'];
} else {
$SafelinK = $randomSafelink . $getServ;
}

$SafeLong = $randomSafelink . $urlTarget;
$fixSafeLong = str_replace(' ', '%20', $SafeLong);
$arr = array(
'Your Safelink' => $SafelinK,
'Shorten Target Url' => $getServ,
'Without Shorten' => $fixSafeLong,
'Title' => $titleTarget,
);

if (getValue('redirect') == 'true') {
header('Content-Type: text/html; charset=utf-8');
echo '<!DOCTYPE html><html lang="en"><head><title>'.$keyword1.' & '.$keyword2.'</title><meta name="description" content="'.$desc.' '.$desc2.' '.$desc3.' '.$desc4.' '.$keyword1.' '.$keyword2.'" /><meta name="robots" content="noindex, nofollow"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1"><meta content="Lawyers, Domain, Personal, Insurance, Cheap, Auto, Cheap Car, Distance" name="keywords"/><meta http-equiv="Content-Type" content="text/html; charset=windows-1252"></head><body><b>Your URL is : </b><a href="'.$SafelinK.'" title="'.$titleTarget.'" alt="'.$titleTarget.'" rel="nofollow noopener">'.$SafelinK.'</a><form action="'.$randomSafelink.'" method="GET" id="redirect"><input type="hidden" name="u" value="'.$getServ.'"/></form> <script> document.getElementById("redirect").submit(); </script></body></html>';
} else if (getValue('type') == 'html') {
header('Content-Type: text/html; charset=utf-8');
echo '<!DOCTYPE html><html lang="en"><head><title>'.$keyword1.' & '.$keyword2.'</title><meta name="description" content="'.$desc.' '.$desc2.' '.$desc3.' '.$desc4.' '.$keyword1.' '.$keyword2.'" /><meta name="robots" content="noindex, nofollow"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1"><meta content="Lawyers, Domain, Personal, Insurance, Cheap, Auto, Cheap Car, Distance" name="keywords"/><meta http-equiv="Content-Type" content="text/html; charset=windows-1252"></head><body><b>Your URL is : </b><a href="'.$SafelinK.'" title="'.$titleTarget.'" alt="'.$titleTarget.'" rel="nofollow noopener">'.$SafelinK.'</a><form action="'.$randomSafelink.'" method="GET" id="redirect" target="_blank"><input type="hidden" name="u" value="'.$getServ.'"/><input type="submit" name="submit" value="'.$getServ.'"/></form></body></html>';
} else if (getValue('type') == 'xml') {
	header("Content-type: Content-Type:application/atom+xml; charset=UTF-8");
$xml = new SimpleXMLElement('<root/>');
array_walk_recursive($arr, array ($xml, 'addChild'));
print $xml->asXML();
} else if (getValue('type') == 'json') {
 header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($arr, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);

 	}
}

include("log.php");
?>