window.dataLayer = window.dataLayer || [];

function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());

gtag('config', 'UA-106238155-1');
function TRACK(what, cat, lab, val) {
  return gtag('event', what, {
    'elements': val,
    'event_category': cat,
    'event_label': lab,
    'value': val
  });
}

//var timerStart = Date.now();

///track all elements through page
var elementsArray = document.querySelectorAll('b,i,a,div,p,span,iframe');
elementsArray.forEach(function (elem) {
  elem.addEventListener("click", function (event) {
    var clickon = "X: " + event.clientX + " - Y: " + event.clientY;
    dump = document.getElementById('track');
    var elem = this.tagName;
    var className = this.className;
    var id = this.id;
    var src = this.src;
    var href = this.href;
    var data = elem + '(' + clickon + ')';
    if (dump) {
      dump.textContent = data;
    }
    if (elem == 'A' || elem == 'a') {
      TRACK("Link", href, href, clickon);
    } else {
      TRACK("Click", elem, data, clickon);
    }
  })
})
/*
///Track all outbound links clicked
var trackLinks = document.getElementsByTagName('a');
for(var i = 0, len = trackLinks.length; i < len; i++) {
    trackLinks[i].onclick = function () {
      TRACK("Click",this.href,this.href,this.href);
    };
}*/
//TRACK("event","categories","labels","value");
//initialize navigation timming
window.performance = window.performance || window.mozPerformance || window.msPerformance || window
  .webkitPerformance || {};
var timing = performance.timing || {};
var parseTime = timing.loadEventEnd - timing.responseEnd;
//calculate pageload time
var perfData = window.performance.timing;
var pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
TRACK("Timing", "Calculate", "PageLoadTime", pageLoadTime);
//calculate request response time
var connectTime = perfData.responseEnd - perfData.requestStart;
TRACK("Timing", "Calculate", "RequestResponseTime", connectTime);
//calculate page render time
var renderTime = perfData.domComplete - perfData.domLoading;
TRACK("Timing", "Calculate", "RenderTime", renderTime);
/*
(function() {
  var t0 = performance.now();
  window.performance = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {};
 var timing = performance.timing || {};
 var parseTime = timing.loadEventEnd - timing.responseEnd;
  //performance.timing.navigationStart + performance.now() = Date.now()
  $("#time").html("Date.Now(): "+ (performance.now() - performance.timing.navigationStart));
 $("#time").append('<br/>Parsetime: '+ parseTime);
var t1 = performance.now();
var func_timing = "function timing "+(t1 - t0) + " milliseconds.";  $("#time").append('<br/>'+func_timing);
})();
*/

// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]"
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
  return p.toString() === "[object SafariRemoteNotification]";
})(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/ false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1 - 71
var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;

$.ajax({
  url: 'https://ipapi.co/json/',
  method: 'get',
  complete: function (dataip) {
    if (dataip.hasOwnProperty('responseJSON')) {
      var IP = dataip.responseJSON,
        data_analystic = {
          'referer': location.referer,
          'location': location.href,
          'host': location.host,
          'user-agent': navigator.userAgent,
          'browser': {
            'opera': isOpera,
            'firefox': isFirefox,
            'chrome': isChrome,
            'safari': isSafari,
            'ie': isIE,
            'blink': isBlink
          },
          'info': IP
        };
      //console.log(data_analystic)

      /*$.ajax({
        url: 'https://agc.akarmas.com/track',
        method: 'post',
        data: data_analystic
      });*/
    }

  }
});