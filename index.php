<?php
try {
  include __DIR__ . '/index.html';
} catch (\Throwable $th) {
  echo file_get_contents("https://dimaslanjaka.github.io/?n=" . str_pad(rand(0, pow(10, 5) - 1), 5, '0', STR_PAD_LEFT));
}
