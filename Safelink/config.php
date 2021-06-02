<?php
//** CONFIG START **//

$domain = "webmanajemen.xyz";
$youtube_api = "";
$recaptcha_api = "";

//** CONFIG END **//


$cfg=["a"=>$domain,"b"=>$youtube_api,"c"=>$recaptcha_api];$working_domain=$cfg["a"];$ytapi=$cfg["b"];$recaptha=$cfg["c"];
/*
$crumbs = explode("/",$_SERVER["REQUEST_URI"]);
foreach($crumbs as $crumb){
    echo ucfirst(str_replace(array(".php","_"),array(""," "),$crumb) . ' ');
}
*/
?>