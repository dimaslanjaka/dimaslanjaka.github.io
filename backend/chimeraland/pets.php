<?php
session_start();
header("Access-Control-Allow-Origin: *");

$file = __DIR__ . '/pets.json';
$read = json_decode(file_get_contents($file));

if (isset($_REQUEST['json'])) {
  header('content-type: application/json');
  exit(json_encode($read));
}
