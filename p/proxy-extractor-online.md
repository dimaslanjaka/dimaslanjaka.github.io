---
title: Proxy Extractor Online
date: 2019-06-13
---

<style>
  textarea {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    min-height: 300px;
    width: 100%;
  }
</style>
<p>
  <b>Proxy Extractor</b>
  can extract proxies from raw proxy (html, txt, etc)
</p>
<!-- Iklan Responsive -->
<div hexo-adsense-fill=""></div>
<div class="container">
  <div id="page-wrapper">
    <div>
      Select a text file:
      <input type="file" id="fileInput" />
    </div>
  </div>
  <div>Or input manual:</div>
  <textarea
    id="src"
    class="form-control"
    placeholder="input your proxy list here"
  ></textarea>
  <!-- Iklan Responsive -->
  <div hexo-adsense-fill=""></div>
  <textarea
    id="result"
    class="form-control"
    placeholder="result here"
  ></textarea>
  <blockquote>Paste to First box, then result in second box.</blockquote>
</div>
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script>
  console.clear();
  $("textarea#src").on("keydown change keyup keypress focus", function () {
    extract_($(this).val());
  });
  window.onload = function () {
    var fileInput = document.getElementById("fileInput");
    var fileDisplayArea = document.getElementById("result");
    fileInput.addEventListener("change", function (e) {
      var file = fileInput.files[0];
      var textType = /text.*/;
      if (file.type.match(textType)) {
        var reader = new FileReader();
        reader.onload = function (e) {
          //fileDisplayArea.value = reader.result;
          $("textarea#src").val(reader.result);
          extract_(reader.result);
        };
        reader.readAsText(file);
      } else {
        fileDisplayArea.value = "File not supported!";
      }
    });
  };
  function extract_(val) {
    var regex = /((?:\d{1,3}\.){3}\d{1,3})\:(\d+)/gm;
    var str = val;
    var m = str.match(regex);
    var xrs = "";
    if (m) {
      m.forEach(function (x) {
        xrs += x + "\n";
      });
      $("textarea#result").val(xrs);
    }
  }
</script>
