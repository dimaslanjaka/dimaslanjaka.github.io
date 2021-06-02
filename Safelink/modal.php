<?php
/** Script By Dimas Lanjaka (L3n4r0x) **/
if(function_exists('dimaslanjaka_safelink')){
} else {
include("func.php");
}
?>
<script>
 $(window).on('load',function(){
 $('#exampleModalLong').modal('show');
 });
</script>
<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title pull-left" id="exampleModalLongTitle">TERMS OF SERVICE</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
Please read these terms carefully before using this Site. By accessing or using this Site and/or Service, you agree to become bound by the terms and conditions of these Terms Of Service. If you do not agree to all of the terms of this agreement, you may not access the Site or use any of its services.
<hr />
This agreement between <b><?php echo $p_title; ?></b> and the visitors is concluded upon Visiting This Page with the Site. The publisher must also familiarize him/herself with the <a href="<?php echo RealSubdir() . 'privacy/'; ?>" title="Privacy Policy For <?php echo $p_title; ?>" alt="Privacy Policy For <?php echo $p_title; ?>"><b>Privacy Policy</a></b>. We reserve the right to modify any of these terms at any time without notice. Members are expected to visit this page periodically.
      </div>
      <div class="modal-footer">
        <a class="text-primary" href="//www.webmanajemen.xyz" title="<?php echo $p_title; ?>" alt="<?php echo $p_title; ?>"><?php echo $p_title; ?></a>
      </div>
    </div>
  </div>
</div>