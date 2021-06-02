var active = false;
var w = window;
chrome.browserAction.onClicked.addListener(function(tab) {
  if (!active || w.closed) {
    //w = window.open (chrome.extension.getURL("popup.html"),
    /*window.open(chrome.extension.getURL("popup.html"),
      "Robo",
      'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=400,height=520');
    active = true;*/

  }
  window.open(chrome.extension.getURL("popup.html"), 'proxy_switcher').focus();
});

// old height height=646