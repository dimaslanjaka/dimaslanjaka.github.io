<?php

$myBlogName = 'My Blog Title';
$myBlogUrl = 'http://webmanajemen.com';
$myBlogUpdateUrl = 'http://webmanajemen.com';
$myBlogRSSFeedUrl = 'http://webmanajemen.com/feed';

// Just and example so you need to put your own list here
// I haven't used many of these for years
// List of Servers to Ping
$xmlRpcPingUrls = array("http://blogsearch.google.ae/ping/RPC2", "http://blogsearch.google.at/ping/RPC2", "http://blogsearch.google.be/ping/RPC2", "http://blogsearch.google.bg/ping/RPC2", "http://blogsearch.google.ca/ping/RPC2", "http://blogsearch.google.ch/ping/RPC2", "http://blogsearch.google.cl/ping/RPC2", "http://blogsearch.google.co.cr/ping/RPC2", "http://blogsearch.google.co.hu/ping/RPC2", "http://blogsearch.google.co.id/ping/RPC2", "http://blogsearch.google.co.il/ping/RPC2", "http://blogsearch.google.co.in/ping/RPC2", "http://blogsearch.google.co.it/ping/RPC2", "http://blogsearch.google.co.jp/ping/RPC2", "http://blogsearch.google.co.ma/ping/RPC2", "http://blogsearch.google.co.nz/ping/RPC2", "http://blogsearch.google.co.th/ping/RPC2", "http://blogsearch.google.co.uk/ping/RPC2", "http://blogsearch.google.co.ve/ping/RPC2", "http://blogsearch.google.co.za/ping/RPC2", "http://blogsearch.google.com.ar/ping/RPC2", "http://blogsearch.google.com.au/ping/RPC2", "http://blogsearch.google.com.br/ping/RPC2",  "http://blogsearch.google.com.co/ping/RPC2", "http://blogsearch.google.com.do/ping/RPC2", "http://blogsearch.google.com.mx/ping/RPC2", "http://blogsearch.google.com.my/ping/RPC2", "http://blogsearch.google.com.pe/ping/RPC2", "http://blogsearch.google.com.sa/ping/RPC2", "http://blogsearch.google.com.sg/ping/RPC2", "http://blogsearch.google.com.tr/ping/RPC2", "http://blogsearch.google.com.tw/ping/RPC2", "http://blogsearch.google.com.ua/ping/RPC2", "http://blogsearch.google.com.uy/ping/RPC2", "http://blogsearch.google.com.vn/ping/RPC2", "http://blogsearch.google.com/ping/RPC2", "http://blogsearch.google.de/ping/RPC2", "http://blogsearch.google.es/ping/RPC2", "http://blogsearch.google.fi/ping/RPC2", "http://blogsearch.google.fr/ping/RPC2", "http://blogsearch.google.gr/ping/RPC2", "http://blogsearch.google.hr/ping/RPC2", "http://blogsearch.google.ie/ping/RPC2", "http://blogsearch.google.in/ping/RPC2", "http://blogsearch.google.it/ping/RPC2", "http://blogsearch.google.jp/ping/RPC2", "http://blogsearch.google.ki/ping/RPC2", "http://blogsearch.google.kz/ping/RPC2", "http://blogsearch.google.la/ping/RPC2", "http://blogsearch.google.li/ping/RPC2", "http://blogsearch.google.lk/ping/RPC2", "http://blogsearch.google.lt/ping/RPC2", "http://blogsearch.google.lu/ping/RPC2", "http://blogsearch.google.md/ping/RPC2", "http://blogsearch.google.mn/ping/RPC2", "http://blogsearch.google.ms/ping/RPC2", "http://blogsearch.google.mu/ping/RPC2", "http://blogsearch.google.mv/ping/RPC2", "http://blogsearch.google.mw/ping/RPC2", "http://blogsearch.google.nl/ping/RPC2", "http://blogsearch.google.no/ping/RPC2", "http://blogsearch.google.nr/ping/RPC2", "http://blogsearch.google.nu/ping/RPC2", "http://blogsearch.google.pl/ping/RPC2", "http://blogsearch.google.pn/ping/RPC2", "http://blogsearch.google.pt/ping/RPC2", "http://blogsearch.google.ro/ping/RPC2", "http://blogsearch.google.ru/ping/RPC2", "http://blogsearch.google.rw/ping/RPC2", "http://blogsearch.google.sc/ping/RPC2", "http://blogsearch.google.se/ping/RPC2", "http://blogsearch.google.sh/ping/RPC2", "http://blogsearch.google.si/ping/RPC2", "http://blogsearch.google.sk/ping/RPC2", "http://blogsearch.google.sm/ping/RPC2", "http://blogsearch.google.sn/ping/RPC2", "http://blogsearch.google.st/ping/RPC2", "http://blogsearch.google.tk/ping/RPC2", "http://blogsearch.google.tl/ping/RPC2", "http://blogsearch.google.tm/ping/RPC2", "http://blogsearch.google.to/ping/RPC2", "http://blogsearch.google.tp/ping/RPC2", "http://blogsearch.google.tt/ping/RPC2", "http://blogsearch.google.tw/ping/RPC2", "http://blogsearch.google.us/ping/RPC2", "http://blogsearch.google.vg/ping/RPC2", "http://blogsearch.google.vu/ping/RPC2", "http://blogsearch.google.ws/ping/RPC2");


require_once('IXR_Library.php');

function xmlRpcPing($url)
{
    global $myBlogName, $myBlogUrl, $myBlogUpdateUrl, $myBlogRSSFeedUrl;
    $client = new IXR_Client($url);
    $client->timeout = 3;
    $client->useragent .= ' -- PingTool/1.0.0';
    $client->debug = false;

    if ($client->query('weblogUpdates.extendedPing', $myBlogName, $myBlogUrl, $myBlogUpdateUrl, $myBlogRSSFeedUrl)) {
        return $client->getResponse();
    }

    echo 'Failed extended XML-RPC ping for "' . $url . '": ' . $client->getErrorCode() . '->' . $client->getErrorMessage() . '<br />';

    if ($client->query('weblogUpdates.ping', $myBlogName, $myBlogUrl)) {
        return $client->getResponse();
    }

    echo 'Failed basic XML-RPC ping for "' . $url . '": ' . $client->getErrorCode() . '->' . $client->getErrorMessage() . '<br />';

    return false;
}

foreach ($xmlRpcPingUrls as $url) {
    echo '<h1>XML-RPC pinging ' . $url . '</h1>';
    echo '<pre>';
    print_r(xmlRpcPing($url));
    echo '</pre>';
    ob_flush();
    flush();
}
