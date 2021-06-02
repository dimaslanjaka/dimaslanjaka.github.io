<?php
error_reporting(E_ALL);
/*
$headers = apache_request_headers();

foreach ($headers as $header => $value) {
    echo "$header : $value <br />\n";
}

*/
function getRequestHeaders() {
    $headers = array();
    foreach($_SERVER as $key => $value) {
        if (substr($key, 0, 5) <> 'HTTP_') {
            continue;
        }
        $header = str_replace(' ', '-', ucwords(str_replace('_', ' ', strtolower(substr($key, 5)))));
        $headers[$header] = $value;
    }
    return $headers;
}

$headers = getRequestHeaders();
$headerList = [];
foreach ($headers as $header => $value) {
if (!preg_match('(agent|server|via|host|encoding|x-)', strtolower($header))){
    $hv = "$header: $value";
echo $hv . "\n";
    $headerList[] = $hv;
}
}
if (isset($_SERVER['HTTP_USER_AGENT'])){
$UA = $_SERVER['HTTP_USER_AGENT'];
} else {
$UA = "Google.com";
}


    function fetch( $url, $z=null ) {
            $ch =  $curl = curl_init();

            $useragent = isset($z['useragent']) ? $z['useragent'] : 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:10.0.2) Gecko/20100101 Firefox/10.0.2';

            curl_setopt( $ch, CURLOPT_URL, $url );
            curl_setopt($curl, CURLOPT_ENCODING, isset($z['encoding']) ? $z['encoding'] : 'gzip,deflate');
            curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );
            curl_setopt( $ch, CURLOPT_AUTOREFERER, true );
            curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, true );
            curl_setopt( $ch, CURLOPT_POST, isset($z['post']) );

            if( isset($z['post']) )         curl_setopt( $ch, CURLOPT_POSTFIELDS, $z['post'] );
            if( isset($z['refer']) )        curl_setopt( $ch, CURLOPT_REFERER, $z['refer'] );

            curl_setopt( $ch, CURLOPT_USERAGENT, $useragent );
            curl_setopt( $ch, CURLOPT_CONNECTTIMEOUT, ( isset($z['timeout']) ? $z['timeout'] : 30 ) );
      if (isset($z['cookiefile'])){
            curl_setopt( $ch, CURLOPT_COOKIEJAR,  $z['cookiefile'] );
            curl_setopt( $ch, CURLOPT_COOKIEFILE, $z['cookiefile'] );
      }

  if (isset ($z['header']) ){
  curl_setopt($ch, CURLOPT_HTTPHEADER, $z['header']);
  }

            $result = curl_exec( $ch );
            curl_close( $ch );
            return $result;
    }

$info = "http://free-proxy.cz/en/ipinfo";
//$opt["header"] = $headerList;
//$opt["useragent"] = $UA;
$opt = null;
echo fetch($info, $opt);
?>