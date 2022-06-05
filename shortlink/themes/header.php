<!DOCTYPE html>
<html lang="en">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Twitter -->
  <meta name="twitter:site" content="@DimasSkynetCybe">
  <meta name="twitter:creator" content="@DimasSkynetCybe">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title"
    content="<?=(isset($site_title) ? $site_title : 'SHORTLINKED'); ?>">
  <meta name="twitter:description"
    content="<?=(isset($site_desc) ? $site_desc : 'SHORTLINKED'); ?>">
  <meta name="twitter:image"
    content="<?=(isset($site_img) ? $site_img : 'http://themepixels.me/azia/img/azia-social.png'); ?>">

  <!-- Facebook -->
  <meta property="og:url"
    content="<?=(isset($_SERVER['HTTPS']) && 'on' === $_SERVER['HTTPS'] ? 'https' : 'http') . "://{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}"; ?>">
  <meta property="og:title"
    content="<?=(isset($site_title) ? $site_title : 'SHORTLINKED'); ?>">
  <meta property="og:description"
    content="<?=(isset($site_desc) ? $site_desc : 'SHORTLINKED'); ?>">

  <meta property="og:image"
    content="<?=(isset($site_img) ? $site_img : 'http://themepixels.me/azia/img/azia-social.png'); ?>">
  <meta property="og:image:secure_url"
    content="<?=(isset($site_img) ? $site_img : 'http://themepixels.me/azia/img/azia-social.png'); ?>">
  <meta property="og:image:type" content="image/png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="600">

  <!-- Meta -->
  <meta name="description"
    content="<?=(isset($site_desc) ? $site_desc : 'SHORTLINKED'); ?>">
  <meta name="author" content="Dimas Lanjaka">
  <!-- Favicon -->
  <link rel="icon" type="image/png" sizes="64x64"
    href="<?=(isset($site_img) ? $site_img : 'http://themepixels.me/azia/img/azia-social.png'); ?>">
  <!-- Apple/Safari icon -->
  <link rel="apple-touch-icon" sizes="180x180"
    href="<?=(isset($site_img) ? $site_img : 'http://themepixels.me/azia/img/azia-social.png'); ?>">
  <!-- Square Windows tiles -->
  <meta name="msapplication-square70x70logo"
    content="<?=(isset($site_img) ? $site_img : 'http://themepixels.me/azia/img/azia-social.png'); ?>">
  <meta name="msapplication-square150x150logo"
    content="<?=(isset($site_img) ? $site_img : 'http://themepixels.me/azia/img/azia-social.png'); ?>">
  <meta name="msapplication-square310x310logo"
    content="<?=(isset($site_img) ? $site_img : 'http://themepixels.me/azia/img/azia-social.png'); ?>">
  <!-- Rectangular Windows tile -->
  <meta name="msapplication-wide310x150logo"
    content="<?=(isset($site_img) ? $site_img : 'http://themepixels.me/azia/img/azia-social.png'); ?>">
  <!-- Windows tile theme color -->
  <meta name="msapplication-TileColor" content="#2e2e2e">

  <title><?=trim((isset($site_title) ? $site_title : 'SHORTLINKED') . (isset($site_desc) ? ' | ' . $site_desc : ' | SHORTLINKED')); ?>
  </title>

  <!-- vendor css -->
  <link href="/node_modules/@fortawesome/fontawesome-free/css/all.min.css" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/4.5.6/css/ionicons.min.css" rel="stylesheet">
  <link href="/node_modules/typicons.font/src/font/typicons.css" rel="stylesheet">

  <!-- azia CSS -->
  <link rel="stylesheet" href="/template/css/azia.css">

  <!-- Loading button -->
  <link rel="stylesheet" href="/views/css/loading.css">
  <link rel="stylesheet" href="/views/css/loading-btn.css">

  <!-- style -->
  <?php
  if (isset($style) && !empty($style)) {
    if (!is_array($style)) {
      if (file_exists($style)) {
        echo '<link rel="stylesheet" href="' . $core->path_to_url($style) . '">';
      }
    } else {
      foreach (array_filter($style) as $css) {
        if (file_exists($css)) {
          echo '<link rel="stylesheet" href="' . $core->path_to_url($css) . '">';
        }
      }
    }
  }
  ?>
</head>