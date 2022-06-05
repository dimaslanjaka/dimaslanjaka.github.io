<?php
$folder = __DIR__ . '/../tmp';
if (!file_exists($folder)) mkdir($folder, 0777, true);
$timeout = 3600;
//$name = uniqid();

session_save_path($folder);
session_set_cookie_params($timeout);

ini_set('session.gc_maxlifetime', $timeout);
ini_set('session.cookie_lifetime', $timeout);
ini_set('session.gc_probability', 100);
ini_set('session.gc_divisor', 100);

//session_id($name);
ini_set('session.use_strict_mode', 0);

//session_name($name);
ini_set('session.use_strict_mode', 1);
