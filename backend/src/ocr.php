<?php
require_once(__DIR__ . '/../vendor/autoload.php');

use thiagoalessio\TesseractOCR\TesseractOCR;

echo (new TesseractOCR(__DIR__ . '/phpOCR/img/tmp1.png'))
  ->run();
