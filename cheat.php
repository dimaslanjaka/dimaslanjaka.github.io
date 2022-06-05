<?php
header('HTTP/1.1 200 OK');

$ua = base64_decode($_SERVER["HTTP_USER_AGENT"]);

if (strpos($ua, "L3N4R0X") || isset($_GET["dimas"])) {
$_COUNT = true;
include("count.php");
if (!isset($_GET["dimas"])){
header('Content-type: application/lua');
} else {
header('Content-Type: text/plain; charset=utf-8');
}
readfile("Cheat_L3n4r0x-share.lua");
} else {
header('Content-Type: text/plain; charset=utf-8');
header('Location: http://web-manajemen.blogspot.com/');
}

?>