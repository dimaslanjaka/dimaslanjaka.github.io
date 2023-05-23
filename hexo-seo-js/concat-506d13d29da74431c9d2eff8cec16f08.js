/*--- inner-0 --*/


(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q || []).push(arguments)},i[r].l=1 * new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-106238155-1', 'auto');
ga('send', 'pageview');



/*--- inner-3 --*/



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



