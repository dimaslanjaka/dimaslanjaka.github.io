<?php /** Script By Dimas Lanjaka (L3n4r0x) **/
/* counter */

//opens countlog.txt to read the number of hits
$datei = fopen("countlog.txt","r");
$count = fgets($datei,1000);
fclose($datei);
$count=$count + 1 ;
echo '<div class="text-center bg-info">Visited '.$count.' Times</div>';

// opens countlog.txt to change new hit number
$datei = fopen("countlog.txt","w");
fwrite($datei, $count);
fclose($datei);

?>
<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top" class="text-center container">
<input type="hidden" name="cmd" value="_s-xclick" />
<input type="hidden" name="hosted_button_id" value="MVM7E676SD6XJ" />
<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" />
<img alt="paypal" border="0" src="//www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1" />
</form>
<script>
loads('https://cdn.rawgit.com/dimaslanjaka/Web-Manajemen/master/js/w3.js');
<?php include('traffic.min.js'); ?>
</script>
<!--script src="https://codepen.io/dimaslanjaka/pen/QQVJxM.js"></script-->
<noscript><link href="//www.w3schools.com/w3css/4/w3.css" rel="stylesheet" /></noscript>
<center><div id="histats_counter"></div><noscript><a href="/" target="_blank"><img src="//sstatic1.histats.com/0.gif?3860842&amp;101" alt="histats" title="histats" /></a></noscript></center>