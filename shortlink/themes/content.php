<body class="az-body az-dashboard-eight">
  <?php
  include __DIR__ . '/header-nav.php';
  if (is_user_logged_in()) {
    include __DIR__ . '/navbar.php';
  }
  ?>

  <div class="az-content az-content-dashboard-eight">
    <div class="container d-block">
      <?php if (isset($content) && $content) {
    include $content;
  } ?>
    </div><!-- container -->
  </div><!-- az-content -->