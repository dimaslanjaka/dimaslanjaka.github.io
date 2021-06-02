<?php
/** Script By Dimas Lanjaka (L3n4r0x) **/ if(function_exists('dimaslanjaka_safelink')){
} else {
include("func.php");
}
if (strpos($actual_link,'webmanajemen') !== false) {
?>
<div id="SC_TBlock_450933" class="SC_TBlock">loading...</div>
<script type="text/javascript">
    (sc_adv_out = window.sc_adv_out || []).push({
        id : "450933",
        domain : "n.ads1-adnow.com"
    });
</script>
<script type="text/javascript" src="//st-n.ads1-adnow.com/js/adv_out.js"></script>
<?php
} else if (strpos($actual_link,'kordonobezitecerrahisi') !== false) {
?>
<div id="SC_TBlock_479287" class="SC_TBlock">loading...</div> 
<script type="text/javascript">
  (sc_adv_out = window.sc_adv_out || []).push({
    id : "479287",
    domain : "n.ads1-adnow.com"
  });
</script>
<script type="text/javascript" src="//st-n.ads1-adnow.com/js/adv_out.js"></script>
<?php
} else {
?>
<!-- Tidak ada iklan bila url tidak ada yang sama (matched) -->
<!-- Isi aja iklan lain :v -->
<?php
}
?>