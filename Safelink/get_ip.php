<?php
/** Script By Dimas Lanjaka (L3n4r0x) **/
if(function_exists('dimaslanjaka_safelink')){
} else {
include("func.php");
}
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
      <td scope="row">'.date('Y-m-d H:i:s').'</td>
      <td>'.$user_ip.'</td>
      <td>'.$orgIP.' | '.$cityIP.' | '.$regionIP.' | '.$countryIP.'</td>
      <td>'.$p_title.'</td>
      <td>'.$actual_link.' From: '.$_SESSION["origURL"].'</td>
    </tr>
  </tbody>
</table>
</div>
';
?>
</div></div>