<?php
/** Script By Dimas Lanjaka (L3n4r0x) **/ 
if(function_exists('dimaslanjaka_safelink')){
} else {
include("func.php");
}

$hostURL = $_SERVER['HTTP_HOST']; 
if($hostURL == "www.kordonobezitecerrahisi.com" or $hostURL == "kordonobezitecerrahisi.com") {
?>
<script async src="//www.googletagmanager.com/gtag/js?id=UA-104256209-4"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  //kordon obezite cerrahisi
  gtag('config', 'UA-104256209-4');
</script>
<?php
} else if($hostURL == "www.webmanajemen.xyz" or $hostURL == "webmanajemen.xyz") {
?>
<script async src="//www.googletagmanager.com/gtag/js?id=UA-104256209-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  //information.webmanajemen.xyz
  gtag('config', 'UA-104256209-3');
  //webmanajemen.xyz
  gtag('config', 'UA-104256209-1');
  //www.webmanajemen.xyz
  gtag('config', 'UA-106238155-1');
</script>
<?php
} else {
?>
<script async src="//www.googletagmanager.com/gtag/js?id=UA-106238155-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  //www.webmanajemen.xyz
  gtag('config', 'UA-106238155-1');
</script>
<?php
	}
$visitorlog = 'visitors.log';

if (file_exists($visitorlog) && filesize($visitorlog) > 100) {
    file_put_contents($visitorlog, "");
}

$logtext = date('Y-m-d H:i:s') .'|'. $user_ip .'|'. $actual_link;
file_put_contents($visitorlog, $logtext . PHP_EOL, FILE_APPEND);

?>