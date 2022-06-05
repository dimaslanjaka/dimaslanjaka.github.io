<!doctype html>
<html ⚡>
<?php
/** Script By Dimas Lanjaka (L3n4r0x) **/
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Content-Type: text/html; charset=utf-8");
header('Referer: https://www.google.com');
?>
<head>
  <meta charset="utf-8">
  <?php include('date.php'); include('func.php'); ?>
  <link href='amp.php' rel='canonical'/>
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></script>
  <script async='async' custom-element='amp-analytics' src='https://cdn.ampproject.org/v0/amp-analytics-0.1.js'></script>
<script async='async' custom-element='amp-form' src='https://cdn.ampproject.org/v0/amp-form-0.1.js'></script>
<script async='async' custom-element='amp-sidebar' src='https://cdn.ampproject.org/v0/amp-sidebar-0.1.js'></script>
<script async='async' custom-element='amp-auto-ads' src='https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js'></script>
  <script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"></script>
  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
  <style amp-custom><?php echo get_contents('https://rawgit.com/dimaslanjaka/amp-bootstrap-example/master/amphtml/css/bootstrap.min.css'); ?>
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
</head>
<body>
<?php include('header.php'); ?>
<amp-analytics id='analytics1' type='googleanalytics'>
<script type='application/json'>
{
  "vars": {
    "account": "UA-106238155-1"
  },
  "triggers": {
    "trackPageview": {
      "on": "visible",
      "request": "pageview"
    }
  }
}
</script>
</amp-analytics>
    <?php //include('donate_car.html'); ?>
<amp-auto-ads data-ad-client='ca-pub-7975270895217217' type='adsense'></amp-auto-ads>
<script type='application/json'>
{
  "placements": [
    {
      "anchor": {
        "selector": "DIV#autoads",
        "index": 2,
        "sub": {
          "selector": "P.autoads",
          "all": true,
        },
      },
      "pos": 4,
      "type": 1,
      "style": {
        "top_m": 5,
        "bot_m": 10,
      },
    },
  ]
}
</script>
<div id="autoads"><p class="autoads"></p></div>
  <amp-youtube
    data-videoid="ZUejDe7JxpE"
    layout="responsive"
    data-param-controls="1"
    width="480" height="270"
    ></amp-youtube>
<amp-ad data-ad-client='ca-pub-7975270895217217' data-ad-slot='2600604346' height='200' layout='fixed-height' type='adsense'>
</amp-ad>
<center><a href="<?php echo urldecode($_GET['u']); ?>" title="<?php echo get_title(urldecode($_GET['u'])); ?>" rel="nofollow noopener">Continue To Your Links</a></center>
<amp-ad width="100vw" height="320" type="adsense" data-ad-client="ca-pub-7975270895217217" data-ad-slot="1193666670" data-full-width><div overflow></div></amp-ad>
  <amp-youtube
      id="DimasCyber"
      data-live-channelid="UCGNaoefvJRfd15fo-LQ0zvg"
      width="358"
      height="204"
      layout="responsive">
    <amp-img
      src="https://i.ytimg.com/vi/Wm1fWz-7nLQ/hqdefault_live.jpg"
      placeholder
      layout="fill"
      />
  </amp-youtube>
  <center><a class="btn btn-default" href="https://search.google.com/test/amp?utm_source=gws&utm_medium=onebox&utm_campaign=suit&url=<?php echo urlencode($actual_link); ?>" title="Test Amp" target="_blank">Test AMP</a></center>
  <?php
$user_ip = getUserIP();
function file_get_contents_curl($url) {
$ch = curl_init();
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); //Set curl to return the data instead of printing it to the browser.
curl_setopt($ch, CURLOPT_URL, $url);
$data = curl_exec($ch);
curl_close($ch);
return $data;
}
//http://ipinfo.io/{$user_ip}/json
$jsonc = file_get_contents_curl("http://ip-api.com/json/{$user_ip}");
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
      <td>'.date('Y-m-d H:i:s').'</td>
      <td>'.$user_ip.'</td>
      <td>'.$orgIP.' | '.$cityIP.' | '.$regionIP.' | '.$countryIP.'</td>
      <td>'.$p_title.'</td>
      <td>'.$actual_link.' From: '.$_SESSION['origURL'].'</td>
    </tr>
  </tbody>
</table>
</div>
';
?></div></div>
<footer class="main-footer bg-faded">
    <div class="container">
      <div class="pull-right hidden-xs">
        <a href="//web-manajemen.blogspot.com/p/privacy.html"><b>Privacy Policy</b></a>
      </div>
      <strong>Copyright 2018 <a href="//webmanajemen.xyz">Verifying Links Page</a>.</strong> All rights
      reserved.
    </div>
</footer>
</body>
</html>