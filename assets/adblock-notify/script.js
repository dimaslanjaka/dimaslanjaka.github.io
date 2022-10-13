/* eslint-disable @typescript-eslint/triple-slash-reference */
// / <reference path="./adblock.js" />

class adblock {
  scriptMethod() {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.id = 'adblock-script-test';
      script.async = !0;
      script.src = '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.onerror = function () {
        window.adblock = !0;
        console.log('adblock enabled');
        document.querySelector('#adblock-script-test').remove();
        reject(new Error('adblock enabled'));
      };
      script.onload = function () {
        console.log('adblock disabled');
        document.querySelector('#adblock-script-test').remove();
        resolve(null);
      };
      var firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(script, firstScript);
    });
  }
  ajaxMethod() {
    return new Promise((resolve, reject) => {
      fetch('//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js')
        .then((response) => response.text())
        .then((_response) => {
          console.log('adblock disabled');
          resolve(null);
        })
        .catch(() => {
          console.log('adblock enabled');
          reject(new Error('adblock enabled'));
        });
    });
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var ykrd1 =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  var ykrd2 = Math.random().toString(36).substring(2, 7);
  var adblockWrapper = document.getElementById('ykth');
  if (adblockWrapper) {
    adblockWrapper.setAttribute('id', ykrd1);
    adblockWrapper.classList.add('ykwrp_' + ykrd2);
  }

  new adblock().ajaxMethod().then(hideNotifAdblock).catch(showNotifAdblock);
  // make popup closable
  const closeId = document.getElementById('close-notif');
  if (closeId) {
    closeId.addEventListener('click', hideNotifAdblock);
  }

  function hideNotifAdblock() {
    document.getElementById(ykrd1).classList.add('ykth-hide');
  }
  function showNotifAdblock() {
    document.getElementById(ykrd1).classList.remove('ykth-hide');
  }
});
