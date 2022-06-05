<?php

$filename = "counts.txt";

if (isset($_COUNT) && $_COUNT == true){

$datei = fopen($filename,"r");
$count = fgets($datei,1000);
fclose($datei);
$count=$count + 1;
//echo "$count hits" ;

$datei = fopen($filename, "w+"); //w

if (flock($datei, LOCK_EX)) {
ftruncate($datei, 0);
fwrite($datei, $count);
fflush($datei);
flock($datei, LOCK_UN);
}

fclose($datei);

} else {

$datei = fopen($filename,"r");
$count = fgets($datei,1000);
fclose($datei);
$count=$count + 1;
echo "$count hits" ;

}
?>