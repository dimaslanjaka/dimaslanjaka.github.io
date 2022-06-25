<?php

$source = __DIR__ . '/pets.markdown';
$read = file_get_contents($source);

foreach (preg_split("/((\r?\n)|(\r\n?))/", $read) as $line) {
  // do stuff with $line
  $line = ucwords($line);

  echo $line . PHP_EOL;
}
