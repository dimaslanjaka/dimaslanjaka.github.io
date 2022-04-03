<?php
// https://www.blackhatworld.com/seo/php-script-are-you-searching-for-script-like-pingler-com-try-it.199414/

if ($_POST['q']) {
  $site_name = $_POST['site_name'];
  if ($site_name == "") {
?>
    <div class="notification information png_bg">
      <div>No site Name</div>
    </div>
  <?
    return;
  }

  $site_url_rss = "";
  $site_url_rss = $_POST['site_url_rss'];

  /**
   * The URL of your site
   */
  $site_url = $_POST['site_url'];
  if ($site_url == "") {
  ?>
    <div class="notification information png_bg">
      <div>No URL</div>
    </div>
  <?php
    return;
  }


  $lista1 = $_POST['lista'];
  if ($lista1 == "") {
  ?>
    <div class="notification information png_bg">
      <div>No List Ping</div>
    </div>
  <?php
    return;
  }


  $request = <<<EOT
<?xml version="1.0" encoding="iso-8859-1"?>
<methodCall>
<methodName>weblogUpdates.ping</methodName>
<params>
 <param>
  <value>
   <string>$site_name</string>
  </value>
 </param>
 <param>
  <value>
   <string>$site_url</string>
  </value>
 </param>
   <param>
      <value>
        <string>$site_url_rss</string>
      </value>
    </param>
</params>
</methodCall>
EOT;


  $lista = explode(',', $lista1);

  ?>
  <h3>Pinging <a href="<?php echo $site_url ?>"><?php echo $site_name ?></a></h3>
  <?php
  foreach ($lista as $server) {

    if (!empty($server)) {

      $tmp = explode("/", $server, 2);

      $ch = curl_init();
      curl_setopt($ch, CURLOPT_URL, "http://" . trim($server));             // Target site
      curl_setopt($ch, CURLOPT_POSTFIELDS, trim($request));
      curl_setopt($ch, CURLOPT_POST, TRUE);
      curl_setopt($ch, CURLOPT_TIMEOUT, 5);    // Timeout
      curl_setopt($ch, CURLOPT_USERAGENT, "Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)");   // Webbot name
      curl_setopt($ch, CURLOPT_REFERER, trim($tmp[0]));            // Referer value
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);     // Return in string

      $return_array = curl_exec($ch);

      curl_close($ch);

      echo $tmp[0] . ": " . substr(strip_tags($return_array), 16) . "<br>";
    }
    echo "<br>";
  }
} else {
  ?>
  <h3>Ping Service:</h3>
  <form id="ping_form" action="" method="POST">
    Web Site Name:<br>
    <input type="text" name="site_name" id="site_name"><br>
    <br>
    Web Site Url:<br>
    <input type="text" name="site_url" id="site_url"><br>
    <br>
    Web Site Url RSS (opzionale):<br>
    <input type="text" name="site_url_rss" id="site_url_rss"><br>
    <br>
    Ping Service:<br>
    <textarea id="lista" name="lista" wrap="off" cols="70" rows="10">
rpc.technorati.com/rpc/ping,
api.moreover.com/RPC2,
api.my.yahoo.co.jp/RPC2,
api.my.yahoo.com/RPC2,
audiorpc.weblogs.com/RPC2,
blog.goo.ne.jp/XMLRPC,
blogpeople.net/ping,
blogsearch.google.ae/ping/RPC2,
blogsearch.google.at/ping/RPC2,
blogsearch.google.be/ping/RPC2,
blogsearch.google.bg/ping/RPC2,
blogsearch.google.ca/ping/RPC2,
blogsearch.google.ch/ping/RPC2,
blogsearch.google.cl/ping/RPC2,
blogsearch.google.co.cr/ping/RPC2,
blogsearch.google.co.hu/ping/RPC2,
blogsearch.google.co.id/ping/RPC2,
blogsearch.google.co.il/ping/RPC2,
blogsearch.google.co.in/ping/RPC2,
blogsearch.google.co.it/ping/RPC2,
blogsearch.google.co.jp/ping/RPC2,
blogsearch.google.co.ma/ping/RPC2,
blogsearch.google.co.nz/ping/RPC2,
blogsearch.google.co.th/ping/RPC2,
blogsearch.google.co.uk/ping/RPC2,
blogsearch.google.co.ve/ping/RPC2,
blogsearch.google.co.za/ping/RPC2,
blogsearch.google.com.ar/ping/RPC2,
blogsearch.google.com.au/ping/RPC2,
blogsearch.google.com.br/ping/RPC2,
blogsearch.google.com.co/ping/RPC2,
blogsearch.google.com.do/ping/RPC2,
blogsearch.google.com.mx/ping/RPC2,
blogsearch.google.com.my/ping/RPC2,
blogsearch.google.com.pe/ping/RPC2,
blogsearch.google.com.sa/ping/RPC2,
blogsearch.google.com.sg/ping/RPC2,
blogsearch.google.com.tr/ping/RPC2,
blogsearch.google.com.tw/ping/RPC2,
blogsearch.google.com.ua/ping/RPC2,
blogsearch.google.com.uy/ping/RPC2,
blogsearch.google.com.vn/ping/RPC2,
blogsearch.google.com/ping/RPC2,
blogsearch.google.de/ping/RPC2,
blogsearch.google.es/ping/RPC2,
blogsearch.google.fi/ping/RPC2,
blogsearch.google.fr/ping/RPC2,
blogsearch.google.gr/ping/RPC2,
blogsearch.google.hr/ping/RPC2,
blogsearch.google.ie/ping/RPC2,
blogsearch.google.in/ping/RPC2,
blogsearch.google.it/ping/RPC2,
blogsearch.google.jp/ping/RPC2,
blogsearch.google.lt/ping/RPC2,
blogsearch.google.nl/ping/RPC2,
blogsearch.google.pl/ping/RPC2,
blogsearch.google.pt/ping/RPC2,
blogsearch.google.ro/ping/RPC2,
blogsearch.google.ru/ping/RPC2,
blogsearch.google.se/ping/RPC2,
blogsearch.google.sk/ping/RPC2,
blogsearch.google.tw/ping/RPC2,
blogsearch.google.us/ping/RPC2,
feedsky.com/api/RPC2,
hamo-search.com/ping.php,
http://blogsearch.google.lv/ping/RPC2,
ping.blogoon.net/,
ping.blogs.yandex.ru/RPC2,
ping.fc2.com/,
ping.feedburner.com/,
ping.kutsulog.net/,
ping.myblog.jp/,
ping.namaan.net/rpc,
ping.snap.com/ping/RPC2,
ping.syndic8.com/xmlrpc.php,
ping.weblogalot.com/rpc.php,
ping.wordblog.de/,
r.hatena.ne.jp/rpc,
rpc.bloggerei.de/ping/,
rpc.blogrolling.com/pinger/,
rpc.icerocket.com:10080/,
rpc.pingomatic.com,
rpc.reader.livedoor.com/ping,
rpc.technorati.com/rpc/ping,
rpc.technorati.jp/rpc/ping,
rpc.twingly.com/,
rpc.weblogs.com/RPC2,
wasalive.com/ping/,
www.blogpeople.net/servlet/weblogUpdates,
xping.pubsub.com/ping/,
zhuaxia.com/rpc/server.php
</textarea>
    <br>
    <br>
    <input type="hidden" name="q" value="1">
    <input class="button" type="submit" id="submit2" value="Ping Site">
  </form>
<?php
}
?>