<?php
/** Script By Dimas Lanjaka (L3n4r0x) **/
if(function_exists('dimaslanjaka_safelink')){
} else {
include("func.php");
}
function ShowHomepage(){
	include('page.php');
}
function ShowV2(){
	include('v2.php');
}
function ShowV3(){
	include('v3.php');
}
function ShowLanding(){
	include('page.php');
}

$path = ltrim($_SERVER['REQUEST_URI'], '/');    // Trim leading slash(es)
$elements = explode('/', $path);                // Split path on slashes
if(empty($elements[0])) {                       // No path elements means home
    ShowHomepage();
} else switch(array_shift($elements))             // Pop off first item and switch
{
    case 'landing':
        ShowLanding();
        break;
    case 'tuyul':
        ShowV3();
        break;
    case 'amp':
        ShowV2();
        break;
    default:
        ShowHomepage();
}