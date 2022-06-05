<?php
session_start();
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");


function uA()
{

  $userAgents = array(
    "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-GB; rv:1.8.1.6) Gecko/20070725 Firefox/2.0.0.6",
    "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)",
    "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.04506.30)",
    "Opera/9.20 (Windows NT 6.0; U; en)",
    "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; en) Opera 8.50",
    "Mozilla/4.0 (compatible; MSIE 6.0; MSIE 5.5; Windows NT 5.1) Opera 7.02 [en]",
    "Mozilla/5.0 (Macintosh; U; PPC Mac OS X Mach-O; fr; rv:1.7) Gecko/20040624 Firefox/0.9",
    "Mozilla/5.0 (Macintosh; U; PPC Mac OS X; en) AppleWebKit/48 (like Gecko) Safari/48",
    "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36",
    "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 7.0; InfoPath.3; .NET CLR 3.1.40767; Trident/6.0; en-IN)",
    "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)",
    "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)",
    "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/5.0)",
    "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/4.0; InfoPath.2; SV1; .NET CLR 2.0.50727; WOW64)",
    "Mozilla/5.0 (compatible; MSIE 10.0; Macintosh; Intel Mac OS X 10_7_3; Trident/6.0)",
    "Mozilla/4.0 (Compatible; MSIE 8.0; Windows NT 5.2; Trident/6.0)",
    "Mozilla/4.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/5.0)",
    "Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko",
    "Mozilla/1.22 (compatible; MSIE 10.0; Windows 3.1)"
  );

  /* Select random agent */
  $random = rand(0, count($userAgents) - 1);

  return $userAgents[$random];
}

function spoof($url)
{
  $ch = curl_init();
  $ref = [
    "https://www.google.co.id/search?q=durango+wild+lands+armor+buffs",
    "https://www.google.me/search?q=install+php+cli+android",
    "https://l.facebook.com",
    "https://www.google.co.id/search?q=web-manajemen.blogspot.com",
    "https://www.google.at/search?q=durango+buff+attributes&gws_rd=ssl", "https://yandex.com/search/touch/?text=install+php+cli+android",
    "https://www.bing.com/search?q=install+php+cli+android+webmanajemen",
    "https://www.google.co.id/search?q=durango+buff+sarung+tangan"
  ];
  $ref = $ref[mt_rand(0, count($ref) - 1)];

  $fn = "proxy.txt";
  $fileproxy = realpath("./" . $fn);
  if (file_exists($fileproxy)) {
    $f_contents = file($fileproxy);
    if (filesize($fileproxy)) {
      $dataline = $f_contents[array_rand($f_contents)];
      $proxy = $dataline;
      $GLOBALS["proxy"] = $proxy;
      //echo $proxy;
    }
  }

  $_SESSION['proxy'] = $proxy;

  $header[0] = "Accept: text/xml,application/xml,application/xhtml+xml,";
  $header[0] .= "text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5";
  $header[] = "Cache-Control: max-age=0";
  $header[] = "Connection: keep-alive";
  $header[] = "Keep-Alive: 300";
  $header[] = "Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7";
  $header[] = "Accept-Language: en-us,en;q=0.5";
  $header[] = "Pragma: ";
  $cookie = "instagram/cache/cookies.txt";
  curl_setopt_array($ch, array(
    CURLOPT_URL => $url,
    CURLOPT_HTTPHEADER => $header,
    CURLOPT_SSL_VERIFYPEER => true,
    CURLOPT_SSL_VERIFYHOST => false,
    CURLOPT_RETURNTRANSFER => 1,
    CURLOPT_USERAGENT => uA(),
    CURLOPT_REFERER => $ref,
    //CURLOPT_POST => $set_post,
    //CURLOPT_POSTFIELDS => $post,
    CURLOPT_ENCODING => '',
    CURLOPT_COOKIEJAR => realpath($cookie),
    CURLOPT_COOKIEFILE => realpath($cookie),
    CURLOPT_AUTOREFERER => true,
    //CURLOPT_SSL_FALSESTART => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_FRESH_CONNECT => true,
    //CURLOPT_NETRC => true,
    //CURLOPT_TCP_FASTOPEN => true,
    //CURLOPT_SSL_VERIFYSTATUS => false,
    //CURLOPT_VERBOSE => true,
    CURLOPT_HEADER => true,
  ));

  if (isset($proxy)) {
    curl_setopt($ch, CURLOPT_PROXY, $_SESSION['proxy']);
  }

  $html = curl_exec($ch);
  if (curl_error($ch)) {
    $error = 'Curl error: ' . curl_error($ch) . ' | Proxy : ' . $_SESSION['proxy'];
    $myfile = file_put_contents('errors.txt', $error . PHP_EOL, FILE_APPEND | LOCK_EX);
    echo $error;
  }
  curl_close($ch);

  return $html;
}

$css = "
<style>
* {max-width:100%}
</style>
";
$js = "
<script>
setTimeout(function(){
   window.location.reload(1);
}, 30000);
</script>
";
echo $css;
$url = ["https://web-manajemen.blogspot.com"];
//$url = ["https://web-manajemen.blogspot.com/2017/08/update-code-auto-syntax-highlighter.html","https://web-manajemen.blogspot.com/2017/04/how-to-make-blogger-safelink-converter.html","https://web-manajemen.blogspot.com/2017/04/instal-php-cli-pada-android-instalasi.html","https://web-manajemen.blogspot.com/2018/06/buff-langka-durango-wild-lands.html","https://web-manajemen.blogspot.com/2018/08/blacklist-player-durango.html","https://web-manajemen.blogspot.com/","https://web-manajemen.blogspot.com/2018/08/durango-wild-lands-how-to-make-black.html","https://web-manajemen.blogspot.com/2018/08/secret-of-mix-spring-fruit-wine-durango.html","https://web-manajemen.blogspot.com/2018/08/how-to-create-wide-screen-or-drone-view.html"];
$url = $url[mt_rand(0, count($url) - 1)];


if (isset($_GET['ref'])) {
  echo spoof("https://www.whatismyreferer.com");
} else if (isset($_GET['info'])) {
  echo spoof("http://free-proxy.cz/en/ipinfo");
} else if (isset($_GET["url"])) {
  echo spoof($_GET["url"]);
} else {
  echo spoof($url) . $js;
}
