<?php

user_utility::i()->islogin(true);
include __DIR__ . '/dashboard.php';
$script[] = ROOT . '/views/js/shortlink/user/dashboard.js';
