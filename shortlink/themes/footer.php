<div class="az-footer">
  <div class="container">
    <span>&copy; 2018 ShortLINKed || Developed By <a href="//web-manajemen.blogspot.com"
        target="_blank">L3n4r0x</a></span>
    <span><small>This site is
        protected by reCAPTCHA and the Google
        <a href="https://policies.google.com/privacy">Privacy Policy</a> and
        <a href="https://policies.google.com/terms">Terms of Service</a> apply.
      </small></span>
  </div><!-- container -->
</div><!-- az-footer -->

<script src="/node_modules/jquery/dist/jquery.min.js"></script>
<script src="/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ionicons/4.5.6/ionicons.js"></script>
<script src="/node_modules/jquery.flot/jquery.flot.js"></script>
<script src="/node_modules/jquery.flot/jquery.flot.categories.js"></script>
<script src="/node_modules/jquery.flot/jquery.flot.resize.js"></script>
<script src="/node_modules/chart.js/dist/Chart.bundle.min.js"></script>
<script src="/template/js/chart.flot.sampledata.js"></script>
<?php
do_shortcode('[recaptcha]');
if (user_utility::i()->isadmin()) {
  ?>

<?php
}
?>
<script>
  var dirbuster =
  <?=$core->cj([
    'troot' => $troot,
    'root' => $root_view,
    'request' => $request,
    'subrequest' => $subrequest,
    'squence' => $squence,
    'form' => [$form_, (is_string($form_) && file_exists($form_))],
    'theme_header' => $theme_header,
    'theme_footer' => $theme_footer,
    'theme_content' => $theme_content,
    'content' => $content,
    'style' => $style,
    'script' => $script,
  ]); ?>
</script>
<script>
  var environtment = '<?= $core->environtment; ?>';
  $(function() {
    'use strict'

    <?php
  if (isset($script) && !empty($script)) {
    if (!is_array($script)) {
      if (file_exists($script)) {
        echo "\n";
        include $script;
        echo "\n";
      }
    } else {
      foreach (array_filter($script) as $js) {
        if (file_exists($js)) {
          echo "\n";
          include $js;
          echo "\n";
        }
      }
    }
  }
  ?>

  });
</script>
<?=do_shortcode('[analystic]'); ?>
<script src="/views/js/websocket.js"></script>
</body>

</html>