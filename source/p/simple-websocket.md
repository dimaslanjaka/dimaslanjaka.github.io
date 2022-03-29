---
title: Simple Websocket
date: 2020-01-20T14:15:01
tags:
  - websocket
  - js
subtitle: "Javascript super simple websocket"
adsense: true
author:
  nick: Dimas Lanjaka
  link: https://webmanajemen.com/
cover: "https://miro.medium.com/max/700/1*aOv6h3h_v9PQWa03zGACnw.png"
---

  <noscript>
  <link rel="stylesheet"
    href="https://rawcdn.githack.com/dimaslanjaka/Web-Manajemen/master/WMI/style.css">
</noscript>
<link rel="stylesheet"
  href="https://rawcdn.githack.com/dimaslanjaka/Web-Manajemen/master/WMI/toastr.css">

<div id="separator-o">
  <!--Delete this if the header is too far down (margin-top)-->
  <div style="height: 100px;"></div>
</div>
<!--Navbar-->
<nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
  <a class="navbar-brand" href="#">WMI</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
    aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarCollapse">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/p/privacy.html">Privacy</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/p/tos.html">Terms</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/p/disclaimer.html">Disclaimer</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/p/about.html">About</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/p/dmca.html">DMCA</a>
      </li>
    </ul>
    <form class="form-inline mt-2 mt-md-0" action="https://web-manajemen.blogspot.com/search" target="_blank">
      <input class="form-control mr-sm-2" type="text" name="q" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
<!--/Navbar-->
<style>
  [id=usage] .card {
    min-height: 300px;
  }

  a.btn {
    color: white;
  }
</style>

<!--Content Here-->
<div>
  <h1 itemprop="name">Simple Websocket Writen in PHP and Javascript</h1>
  <img itemprop="image" src="https://res.cloudinary.com/dimaslanjaka/image/fetch/https://bertzzie.com/knowledge/javascript-lanjut/_images/AJAXvsWebSocket.png"
    alt="Websocket How to" class="d-none" />
  <h5 class="ml-3"><i class="fab fa-js mr-1"></i><span class="badge badge-info">Javascript</span><a
      href="https://github.com/dimaslanjaka/Web-Manajemen/blob/master/js/websocket.js" target="_blank"
      rel="noopener noreferrer" class="btn btn-success btn-sm ml-1" title="JS">Download<i
        class="fas fa-download ml-1"></i></a></h5>
        <script src="https://gist-it.appspot.com/https://github.com/dimaslanjaka/Web-Manajemen/blob/master/js/websocket.js"></script>
  <h6 class="text-center">JS Usage Example</h6>
  <div class="row" id="usage">
    <div class="col-md-4 mb-3">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">By Variable OR Const</h5>
          <pre class="card-text">
const start_socket = false;
if (start_socket){
  socket_start();
}
      </pre>
        </div>
      </div>
    </div>
    <div class="col-md-4 mb-3">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">By Element Exists</h5>
          <pre class="card-text">
var websocketElement = document.getElementById('websocket'); //find any elements with id websocket
if (websocketElement){
  socket_start();
}
      </pre>
        </div>
      </div>
    </div>
    <div class="col-md-4 mb-3">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Others</h5>
          <p class="card-text">
            You can use it as your wish. OR using basic example bellow :
            <pre>
if (conditional) {
  socket_start();
}
            </pre>
          </p>
        </div>
      </div>
    </div>
  </div>

  <h5 class="ml-3"><i class="fab fa-php mr-1"></i><span class="badge badge-info">PHP</span><a
      href="https://github.com/dimaslanjaka/Web-Manajemen/blob/master/PHP/websocket.php" target="_blank"
      rel="noopener noreferrer" class="btn btn-success btn-sm ml-1" title="PHP">Download<i
        class="fas fa-download ml-1"></i></a></h5>
        <script src="https://gist-it.appspot.com/https://github.com/dimaslanjaka/Web-Manajemen/blob/master/PHP/websocket.php"></script>
  <h6 class="text-center">PHP Usage Example</h6>
  <div class="row" id="usage">
    <div class="col-md-4 mb-3">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">PHP Normal Usage</h5>
          <pre class="card-text">
$websocket = new WMI_websocket(false, false);
/* Data Example */
$websocket-&gt;createData([
  &apos;pendapatan_max_invoice&apos; =&gt; 45,
  &apos;piutang_max_invoice&apos; =&gt; 55,
  &apos;hutang_max_invoice&apos; =&gt; 65,
  &apos;pengeluaran_max_invoice&apos; =&gt; 67,
]);
$websocket-&gt;SEND();
        </pre>
        </div>
      </div>
    </div>
    <div class="col-md-4 mb-3">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">PHP Object Oriented Usage</h5>
          <pre class="card-text">
$websocket = new WMI_websocket(false, false);
$websocket-&gt;createData([
  &apos;pendapatan_max_invoice&apos; =&gt; 45,
  &apos;piutang_max_invoice&apos; =&gt; 55,
  &apos;hutang_max_invoice&apos; =&gt; 65,
  &apos;pengeluaran_max_invoice&apos; =&gt; 67,
])-&gt;SEND();
        </pre>
        </div>
      </div>
    </div>
    <div class="col-md-4 mb-3">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">PHP <b>Static</b> Object Oriented Usage</h5>
          <pre class="card-text">
WMI_websocket::i(false, false)-&gt;createData([
  &apos;pendapatan_max_invoice&apos; =&gt; 45,
  &apos;piutang_max_invoice&apos; =&gt; 55,
  &apos;hutang_max_invoice&apos; =&gt; 65,
  &apos;pengeluaran_max_invoice&apos; =&gt; 67,
])-&gt;SEND();
        </pre>
        </div>
      </div>
    </div>
  </div>

</div>

<!--Footer-->
<footer class="page-footer font-small unique-color-dark">

  <!-- Social buttons -->
  <div class="primary-color">
    <div class="container">
      <!--Grid row-->
      <div class="row py-4 d-flex align-items-center">

        <!--Grid column-->
        <div class="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
          <h6 class="mb-0 white-text">Get connected with us on social networks!</h6>
        </div>
        <!--Grid column-->

        <!--Grid column-->
        <div class="col-md-6 col-lg-7 text-center text-md-right">
          <!--Facebook-->
          <a class="fb-ic ml-0" href="//fb.me/secretnetworkforces">
            <i class="fab fa-facebook white-text mr-4"> </i>
          </a>
          <!--Twitter-->
          <a class="tw-ic">
            <i class="fab fa-twitter white-text mr-4"> </i>
          </a>
        </div>
        <!--Grid column-->

      </div>
      <!--Grid row-->
    </div>
  </div>
  <!-- Social buttons -->

  <!--Footer Links-->
  <div class="container mt-5 mb-4 text-center text-md-left">
    <div class="row mt-3">

      <!--First column-->
      <div class="col-md-3 col-lg-4 col-xl-3 mb-4">
        <h6 class="text-uppercase font-weight-bold">
          <strong>WMI</strong>
        </h6>
        <hr class="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style="width: 60px;">
        <p>Website Manajemen Indonesia, is a site that I developed myself to provide the best experience for clients.
        </p>
      </div>
      <!--/.First column-->

      <!--Second column-->
      <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
        <h6 class="text-uppercase font-weight-bold">
          <strong>Products</strong>
        </h6>
        <hr class="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style="width: 60px;">
        <p>
          We currently have no products to sell
        </p>
      </div>
      <!--/.Second column-->

      <!--Third column-->
      <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
        <h6 class="text-uppercase font-weight-bold">
          <strong>Useful links</strong>
        </h6>
        <hr class="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style="width: 60px;">
        <p>
          <a href="https://www.blogger.com/profile/17555754514989936273" rel="nofollow noopener" title="Blogger Account"
            target="_blank">Blogger Profile</a><br>
          <a href="https://web-manajemen.blogspot.com/2018/11/install-php-web-server-on-termux.html" target="_blank">PHP
            Termux</a><br>
          <a href="https://web-manajemen.blogspot.com/2017/04/instal-php-cli-pada-android-instalasi.html"
            target="_blank" rel="bookmark" title="PHP Android Installation">PHP CLI/Webserver Android</a><br>
          <a href="https://web-manajemen.blogspot.com/2017/09/tutorial-membuat-blogspot-safelink.html" target="_blank"
            rel="bookmark" title="Safelink Blogger V1">Safelink V1</a><br>
          <a href="https://web-manajemen.blogspot.com/2017/09/cara-simple-membuat-blogger-safelink.html" target="_blank"
            rel="bookmark" title="Safelink Blogger V3">Safelink V3</a>
        </p>
      </div>
      <!--/.Third column-->

      <!--Fourth column-->
      <div class="col-md-4 col-lg-3 col-xl-3">
        <h6 class="text-uppercase font-weight-bold">
          <strong>Contact</strong>
        </h6>
        <hr class="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style="width: 60px;">
        <p>
          <i class="fa fa-home mr-3"></i> Jl. Peneleh Gg. III No.22RT.003/RW.03, Peneleh, Kec. Genteng, Kota SBY, Jawa
          Timur 60274
        </p>
        <p>
          <i class="fa fa-envelope mr-3"></i> <a href="mailto:webmanajemen@gmail.com">webmanajemen@gmail.com</a></p>
        <p><i class="fa fa-phone mr-3"></i> <i class="fab fa-whatsapp"></i> + 62 856 5566 7573</p>
      </div>
      <!--/.Fourth column-->

    </div>
  </div>
  <!--/.Footer Links-->

  <!-- Copyright -->
  <div class="footer-copyright text-left py-3">
    <div class="d-flex justify-content-between">
      <div class="p-2">&copy; 2019 Copyright: <a href="https://web-manajemen.blogspot.com"> Website Manajemen
          Indonesia</a></div>
      <div class="p-2"><small>This site is protected by reCAPTCHA and the Google
          <a href="https://policies.google.com/privacy">Privacy Policy</a> and
          <a href="https://policies.google.com/terms">Terms of Service</a> apply.</small></div>
    </div>
  </div>
  <!-- Copyright -->

</footer>
<!--/Footer-->

<!-- JQuery -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<!-- Bootstrap tooltips -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.4/umd/popper.min.js"></script>
<!-- Bootstrap core JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>
<!-- MDB core JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.10.1/js/mdb.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>
<script src="https://rawcdn.githack.com/dimaslanjaka/Web-Manajemen/master/WMI/bootstrap.utility.js"></script>

<script>
  function loadCSS(e,t,a){var n=window.document.createElement("link"),o=t||window.document.getElementsByTagName("script")[0];n.rel="stylesheet",n.href=e,n.media="only x",o.parentNode.insertBefore(n,o),setTimeout(function(){n.media=a||"all"})}
  loadCSS("https://rawcdn.githack.com/dimaslanjaka/Web-Manajemen/master/WMI/style.css");
</script>
